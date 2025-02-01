import { getUserNameFromLocalStorage } from '../../utils/getUserName';
import './userDetails.css';

const UserDetails: React.FC = () => {
  const userName = getUserNameFromLocalStorage();

  return (
    <div className="user-details-row">
      <div className="pic-name-container">
        <div className="picture">profile pic</div>
        <div className="name-container">{userName}</div>
      </div>
    </div>
  );
};

export default UserDetails;
