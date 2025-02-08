import { useEffect, useRef } from 'react';
import Modal from 'react-modal';
import './CreatePost.css';
import { useMutation, useQueryClient } from 'react-query';
import { addPost } from '../../services/postService';
import { IPost } from '../../models';
import { useAppContext } from '../../context/appContext';
import toast from 'react-hot-toast';
import StarRating from '../starRating/starRating';
import { postSchema } from '../../schemaValidations';
import { useForm } from 'react-hook-form';
import { handleFileChange } from '../../utils/handleFileChange';

interface IProps {
  isModalOpen: boolean;
  onClose: () => void;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    padding: '15px',
    width: '50vw',
    transform: 'translate(-50%, -50%)',
    background: '#f2f2f2',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
  },
  overlay: {
    background: 'rgb(255 255 255 / 65%)',
  },
};

const CreatePost: React.FC<IProps> = ({ isModalOpen, onClose }) => {
  const { user } = useAppContext();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      review: '',
      rate: 0,
      image: '',
      file: null as File | null,
    },
  });

  const addPostMutation = useMutation(
    async (newPost: Omit<IPost, 'owner' | '_id'>) => {
      return addPost(newPost, user._id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['posts']);
        toast.success('Your Reccomendation is published! :)');
        resetForm();
        onClose();
      },
      onError: (error) => {
        console.error('Error adding post:', error);
      },
    }
  );

  const watchFile = watch('file');
  const watchTitle = watch('title');
  const watchReview = watch('review');
  const watchRate = watch('rate');

  const isSaveAllowed: boolean =
    !!watchTitle.trim() && !!watchReview.trim() && watchFile !== null;

  useEffect(() => {
    if (isModalOpen) {
      resetForm();
    }
  }, [isModalOpen]);

  const resetForm = () => {
    setValue('title', '');
    setValue('review', '');
    setValue('rate', 0);
    setValue('image', '');
    setValue('file', null as File | null);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onSubmit = async (data) => {
    const validationResult = postSchema.validate(
      { title: data.title, review: data.review, rate: data.rate },
      { abortEarly: false }
    );

    if (validationResult.error) {
      toast.error(
        `Please correct the information in all fields :) ${validationResult.error.message}`
      );
      return;
    }

    const newPost: Omit<IPost, 'owner' | '_id'> = {
      title: data.title,
      review: data.review,
      image: data.image,
      rate: data.rate,
    };

    addPostMutation.mutate(newPost);
    onClose();
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Add post"
    >
      <div className="create-post-modal-container">
        <form className="post-form" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="book name" className="custom-label">
              Book name
            </label>
            <input {...register('title')} />
            {errors.title && (
              <p className="error-text">{errors.title.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="book review" className="custom-label">
              Tell us about the book
            </label>
            <textarea id="review" {...register('review')} />
            {errors.review && (
              <p className="error-text">{errors.review.message}</p>
            )}
          </div>
          <div>
            <button
              type="button"
              className="clickable upload-image-button"
              onClick={triggerFileInput}
            >
              Upload Image
            </button>
            <input
              type="file"
              id="file-upload"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={(event) => handleFileChange(event, setValue)}
            />
            {watchFile && <p>Selected: {watchFile.name}</p>}
          </div>
          <div>
            <label htmlFor="book image" className="custom-label">
              What would you rate it?
            </label>

            <div>
              <label htmlFor="rate" className="custom-label">
                Rate
              </label>
              <StarRating
                currentRate={watchRate}
                onRate={(rating) => setValue('rate', rating)}
              />
            </div>
          </div>
          <div className="bottom-modal">
            <button className="clickable" onClick={onClose}>
              close
            </button>
            <button
              type="submit"
              className={!isSaveAllowed ? 'disabled' : 'clickable'}
            >
              publish
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreatePost;
