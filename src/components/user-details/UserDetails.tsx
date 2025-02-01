import { getUserNameFromLocalStorage } from '../../utils/getUserName';

const UserDetails: React.FC = () => {
  const userName = getUserNameFromLocalStorage();

  return (
    <div>
      <h1>User Details</h1>
      <p>Name: {userName}</p>
    </div>
  );
};

export default UserDetails;
