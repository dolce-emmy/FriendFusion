//import { useContext } from "react";
import {AppContext} from "../context/AppContext"
import { useAppContext } from "../context/AppContext";

 const UserList = () => {
    //const {users} = useContext(AppContext);
    const {users} = useAppContext(AppContext);
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