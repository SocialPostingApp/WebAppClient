import { useState } from 'react';
import { CiSquarePlus, CiUser, CiHome } from 'react-icons/ci';
import CreatePost from '../../components/createPost/CreatePost';
import './BottomNavbar.css';
import { useNavigate } from 'react-router-dom';

const BottomNavbar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  const handleNavigation = (view: string) => {
    navigate(view);
  };

  return (
    <div className="bottom-navbar-container">
      <div className="edit-user-container"></div>
      <div className="user-actions">
        <CreatePost isModalOpen={isModalOpen} onClose={closeModal} />
        <CiUser
          className="navbar-icon"
          size={50}
          onClick={() => handleNavigation('/profile')}
        />
        <CiSquarePlus className="navbar-icon" size={50} onClick={openModal} />
        <CiHome
          className="navbar-icon"
          size={50}
          onClick={() => handleNavigation('/home')}
        />
      </div>
      <div className="logout-container">
        <div>logout</div>
      </div>
    </div>
  );
};

export default BottomNavbar;
