import { getUserNameFromLocalStorage } from '../../utils/getUserName';
import './userDetails.css';
import DefaultProfilePic from './Default_pfp.jpg';

const UserDetails: React.FC = () => {
  const userName = getUserNameFromLocalStorage();

  return (
    <div className="user-details-row">
      <div className="pic-name-container">
        <div className="pic-container">
          <img
            className="picture"
            src={
              // post.image
              //   ? `${import.meta.env.VITE_REACT_APP_API_URL}/uploads/${
              //       post.image
              //     }`
              //   :
              DefaultProfilePic
            }
            alt="Uploaded File"
          />
        </div>

        <div className="name-container">{userName}</div>
        <div className="edit-container"></div>
      </div>
    </div>
  );
};

export default UserDetails;
