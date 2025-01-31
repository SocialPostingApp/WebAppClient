import { useState } from 'react';
import Modal from 'react-modal';
import FileUpload from '../fileUpload/FileUpload';
import './CreatePost.css';
import { useMutation, useQueryClient } from 'react-query';
import { addPost } from '../../services/postService';
import { IPost } from '../../models';
import { useAppContext } from '../../context/appContext';
import toast from 'react-hot-toast';
import StarRating from '../starRating/starRating';

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
    transform: 'translate(-50%, -50%)',
  },
};

const CreatePost: React.FC<IProps> = ({ isModalOpen, onClose }) => {
  const { userId } = useAppContext();
  const queryClient = useQueryClient();

  const addPostMutation = useMutation(
    async (newPost: Omit<IPost, 'owner' | '_id'>) => {
      return addPost(newPost, userId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['posts']);
        toast.success('Your Reccomendation is published! :)');
        clearInputs();
        onClose();
      },
      onError: (error) => {
        console.error('Error adding post:', error);
      },
    }
  );

  const [inputName, setInputName] = useState<string>('');
  const [inputReview, setInputReview] = useState<string>('');
  const [rate, setRate] = useState<number>(5);
  const [image, setImage] = useState<string>('');

  const isSaveAllowed: boolean =
    Boolean(inputName.trim()) &&
    Boolean(inputReview.trim()) &&
    Boolean(image.trim());

  const clearInputs = (): void => {
    setInputName('');
    setInputReview('');
    setRate(0);
    setImage('');
  };

  const saveImage = (image: string) => {
    setImage(image);
  };

  const saveModal = (): void => {
    if (!isSaveAllowed) {
      toast.error('You have unfilled details, please add them :)');
    } else {
      const newPost: Omit<IPost, 'owner' | '_id'> = {
        title: inputName,
        review: inputReview,
        image: image,
        rate: rate,
        likesCount: 0,
      };

      addPostMutation.mutate(newPost);
    }

    onClose();
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
              Tell us about the book
            </label>
            <textarea
              id="review"
              value={inputReview}
              onChange={(e) => setInputReview(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="book image" className="custom-label">
              Show us the book!
            </label>
            <FileUpload saveImageName={saveImage} />
          </div>
          <div>
            <label htmlFor="book image" className="custom-label">
              What would you rate it?
            </label>
            <StarRating
              totalStars={rate}
              onRate={(rating) => setRate(rating)}
            />
          </div>
        </form>
        <div className="bottom-modal">
          <button className="clickable" onClick={onClose}>
            close
          </button>
          <button
            className={!isSaveAllowed ? 'disabled' : 'clickable'}
            onClick={saveModal}
          >
            publish
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreatePost;
