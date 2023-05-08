import { useAppContext } from "../context/AppContext";


 const FriendList = () => {
    const {users} = useAppContext();
  return (
    <div>
      Friend List
      <ul>
        {users?.map((user) => (
          <li key={user._id}>{user.firstName}</li>
        ))}
      </ul>
    </div>
  );
};


export default FriendList