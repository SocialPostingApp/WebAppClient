import './userDetails.css';
import DefaultProfilePic from './Default_pfp.jpg';
import { LiaEdit } from 'react-icons/lia';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../models/enums/routes';
import { getUserFromLocalStorage } from '../../utils/storageUtils';

const UserDetails: React.FC = () => {
  const user = getUserFromLocalStorage();
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate(Routes.EDIT_PROFILE);
  };

  return (
    <div className="user-details-row">
      <div className="pic-name-container">
        <div className="pic-container">
          <img
            className="picture"
            src={
              user?.imgUrl
                ? `${import.meta.env.VITE_REACT_APP_API_URL}/uploads/${
                    user.imgUrl
                  }`
                : DefaultProfilePic
            }
            alt="Uploaded File"
          />
        </div>

        <div className="name-container">{user?.name}</div>
        <div className="edit-container">
          <LiaEdit className="edit-profile-icon" onClick={handleEditProfile} />
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
