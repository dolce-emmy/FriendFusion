import { useAppContext } from "../context/AppContext";

 const UserList = () => {
    const {users} = useAppContext();
  return (
    <div>
      User List
      <ul>
        {users?.map((user) => (
          <li key={user._id}>{user.firstName}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList