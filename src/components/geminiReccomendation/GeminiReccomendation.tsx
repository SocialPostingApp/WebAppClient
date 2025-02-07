import Modal from 'react-modal';
import './geminiReccomendation.css';
import { useQuery } from 'react-query';
import { HiOutlineSparkles } from 'react-icons/hi';
import { getGeminiReccomendation } from '../../services/gemini.service';
import Spinner from '../spinner/Spinner';

interface IProps {
  isModalOpen: boolean;
  bookName: string;
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
    minWidth: '500px',
    minHeight: '200px',
    backgroundColor: '#d9dad1',
  },
};

const GeminiReccomendation: React.FC<IProps> = ({
  isModalOpen,
  bookName,
  onClose,
}) => {
  const { data, isLoading } = useQuery<string>(
    ['gemini', bookName],
    () => getGeminiReccomendation(bookName),
    {
      enabled: isModalOpen,
    }
  );

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {isLoading ? (
        <div className="gemini-spinner">
          <Spinner />
        </div>
      ) : (
        <div className="gemini-modal-container">
          <div className="modal-introduction section-wrapper">
            <div className="row">
              Hey! We saw you liked
              <div className="book-name book-title">{bookName}</div>.
            </div>
            <div>Therfore we would like to make a reccomendation for you:</div>
          </div>

          <div className="section-wrapper book-details">{data}</div>

          <div className="gemini-bottom-modal">
            <div className="ai-tag">
              AI Generated <HiOutlineSparkles className="ai-spark" />
            </div>
            <button className="clickable" onClick={onClose}>
              Got It!
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default GeminiReccomendation;
