import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import FileUpload from '../fileUpload/FileUpload';
import './EditPost.css';
import { useMutation, useQueryClient } from 'react-query';
import { editPost } from '../../services/postService';
import { IPost } from '../../models';
import { useAppContext } from '../../context/appContext';
import toast from 'react-hot-toast';
import StarRating from '../starRating/starRating';
import { postSchema } from '../../schemaValidations';

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
    transform: 'translate(-50%, -50%)',
    background: '#f2f2f2',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
  },
  overlay: {
    background: 'rgb(255 255 255 / 65%)',
  },
};

const EditPost: React.FC<IProps> = ({ post, isModalOpen, onClose }) => {
  const { userId } = useAppContext();
  const queryClient = useQueryClient();

  const editPostMutation = useMutation(
    async (updatedPost: Omit<IPost, 'owner' | '_id'>) => {
      return editPost(post._id, updatedPost, userId);
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

  const [inputName, setInputName] = useState<string>(post.title);
  const [inputReview, setInputReview] = useState<string>(post.review);
  const [rate, setRate] = useState<number>(post.rate);
  const [image, setImage] = useState<string>(post.image || '');

  const validationResult = postSchema.validate(
    { title: inputName, review: inputReview, rate },
    { abortEarly: false }
  );

  const isSaveAllowed: boolean =
    (Boolean(inputName.trim()) && inputName.trim() !== post.title.trim()) ||
    (Boolean(inputReview.trim()) &&
      inputReview.trim() !== post.review.trim()) ||
    (Boolean(image.trim()) && image.trim() !== post.image?.trim()) ||
    rate !== post.rate;

  useEffect(() => {
    if (isModalOpen) {
      clearInputs();
    }
  }, [isModalOpen]);

  const clearInputs = (): void => {
    setInputName(post.title);
    setInputReview(post.review);
    setRate(post.rate);
    setImage(post.image || '');
  };

  const saveImage = (image: string) => {
    setImage(image);
  };

  const saveModal = (): void => {
    if (validationResult.error) {
      toast.error(
        `Please correct the information in all fields :) ${validationResult.error.message}`
      );
    } else {
      const updatedPost: Omit<IPost, 'owner' | '_id'> = {
        title: inputName,
        review: inputReview,
        image: image,
        rate: rate,
      };

      editPostMutation.mutate(updatedPost);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="modal-container">
        <form className="post-form">
          <div>
            <label htmlFor="book name" className="custom-label">
              Book name
            </label>
            <input
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="book review" className="custom-label">
              Review
            </label>
            <textarea
              id="review"
              value={inputReview}
              onChange={(e) => setInputReview(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="book image" className="custom-label">
              New book pic
            </label>
            <FileUpload saveImageName={saveImage} />
          </div>
          <div>
            <label htmlFor="book image" className="custom-label">
              Rate
            </label>
            <StarRating
              currentRate={rate}
              onRate={(rating) => setRate(rating)}
            />
          </div>
        </form>
        <div className="bottom-modal">
          <button className="clickable" onClick={onClose}>
            cancel
          </button>
          <button
            className={!isSaveAllowed ? 'disabled' : 'clickable'}
            onClick={saveModal}
          >
            save changes
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditPost;
