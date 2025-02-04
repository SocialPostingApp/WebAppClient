import { useState } from 'react';
import { CiSquarePlus, CiUser, CiHome } from 'react-icons/ci';
import CreatePost from '../../components/createPost/CreatePost';
import './BottomNavbar.css';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/authService';
import { Routes } from '../../models/enums/routes';

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

  const handleLogout = () => {
    logout();
    localStorage.clear();
    handleNavigation(Routes.LOGIN);
  };

  return (
    <div className="bottom-navbar-container">
      <div className="right-side-container"></div>
      <div className="user-actions">
        <CreatePost isModalOpen={isModalOpen} onClose={closeModal} />
        <CiUser
          className="navbar-icon"
          size={50}
          onClick={() => handleNavigation(Routes.PROFILE)}
        />
        <CiSquarePlus className="navbar-icon" size={50} onClick={openModal} />
        <CiHome
          className="navbar-icon"
          size={50}
          onClick={() => handleNavigation(Routes.HOME)}
        />
      </div>
      <div className="logout-container">
        <div className="border-button" onClick={handleLogout}>
          Logout
        </div>
      </div>
    </div>
  );
};

export default BottomNavbar;
