import { useAppContext } from "../context/AppContext";

 const UserInfo = () => {
    const {user} = useAppContext();
  return (
    <div>
      User Info
      Welcome {user?.firstName}!
    </div>
  );
};

export default UserInfo