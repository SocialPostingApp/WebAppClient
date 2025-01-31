import { useState } from 'react';
import { CiSquarePlus } from 'react-icons/ci';
import CreatePost from '../../components/createPost/CreatePost';
import './BottomNavbar.css';

const BottomNavbar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  return (
    <div className="bottom-navbar-container">
      <CreatePost isModalOpen={isModalOpen} onClose={closeModal} />
      <CiSquarePlus className="navbar-icon" size={50} onClick={openModal} />
    </div>
  );
};

export default BottomNavbar;
