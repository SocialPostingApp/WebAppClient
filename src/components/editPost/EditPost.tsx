import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { editPost } from '../../services/postService';
import { IPost } from '../../models';
import { useAppContext } from '../../context/appContext';
import StarRating from '../starRating/starRating';
import { postSchema } from '../../schemaValidations';
import apiClient from '../../services/httpCommon';
import { LocalStorageKeys } from '../../models/enums/localStorageKeys';
import { Routes } from '../../models/enums/routes';
import './EditPost.css';
import { handleFileChange } from '../../utils/handleFileChange';

interface IProps {
  post: IPost;
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

const EditPost: React.FC<IProps> = ({ post, isModalOpen, onClose }) => {
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
      title: post.title,
      review: post.review,
      rate: post.rate,
      image: post.image || '',
      file: null as File | null,
    },
  });

  const editPostMutation = useMutation(
    async (updatedPost: Omit<IPost, 'owner' | '_id'>) => {
      return editPost(post._id, updatedPost, user._id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['posts']);
        toast.success('Your changes were saved! :)');
        onClose();
      },
      onError: (error) => {
        console.error('Error editing post:', error);
      },
    }
  );

  const watchFile = watch('file');
  const watchTitle = watch('title');
  const watchReview = watch('review');
  const watchRate = watch('rate');

  useEffect(() => {
    if (isModalOpen) {
      resetForm();
    }
  }, [isModalOpen]);

  const resetForm = () => {
    setValue('title', post.title);
    setValue('review', post.review);
    setValue('rate', post.rate);
    setValue('image', post.image || '');
    setValue('file', null);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const isSaveAllowed =
    watchTitle.trim() !== post.title.trim() ||
    watchReview.trim() !== post.review.trim() ||
    watchFile !== null ||
    watchRate !== post.rate;

  const onSubmit = async (data: any) => {
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

    const updatedPost: Omit<IPost, 'owner' | '_id'> = {
      title: data.title,
      review: data.review,
      image: data.image,
      rate: data.rate,
    };

    editPostMutation.mutate(updatedPost);
    onClose();
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Edit Post"
    >
      <div className="modal-container">
        <form className="edit-post-form" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="title" className="custom-label">
              Book name
            </label>
            <input {...register('title')} />
            {errors.title && (
              <p className="error-text">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="review" className="custom-label">
              Review
            </label>
            <textarea id="review" {...register('review')} />
            {errors.review && (
              <p className="error-text">{errors.review.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="file-upload" className="custom-label">
              New book pic
            </label>
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
            <label htmlFor="rate" className="custom-label">
              Rate
            </label>
            <StarRating
              currentRate={watchRate}
              onRate={(rating) => setValue('rate', rating)}
            />
          </div>

          <div className="bottom-modal">
            <button
              type="button"
              className="clickable submit-button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`submit-button ${
                !isSaveAllowed ? 'disabled' : 'clickable'
              }`}
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditPost;
