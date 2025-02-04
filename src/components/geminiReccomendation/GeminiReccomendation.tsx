import Modal from 'react-modal';
import './geminiReccomendation.css';
import { useQuery } from 'react-query';
import { GeminiResponse } from '../../models/interfaces/GeminiResponse';
import { getGeminiReccomendation } from '../../services/gemini.service';

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
  },
};

const GeminiReccomendation: React.FC<IProps> = ({
  isModalOpen,
  bookName,
  onClose,
}) => {
  const { data, isLoading, error } = useQuery<GeminiResponse>(
    ['gemini', bookName],
    () => getGeminiReccomendation(bookName)
  );

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="modal-container">
        <div>{data?.description}</div>
        <div className="bottom-modal">
          <button className="clickable" onClick={onClose}>
            close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default GeminiReccomendation;
