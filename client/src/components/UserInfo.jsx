import { useAppContext } from "../context/AppContext";

 const UserInfo = () => {
    const {user} = useAppContext();
  return (
    <div>
      
      Welcome {user?.firstName}!
      <img src={user?.profileImage} alt="user" />
    </div>
  );
};

export default UserInfo