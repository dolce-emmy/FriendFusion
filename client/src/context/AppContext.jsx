import { useState, useEffect, createContext, useContext } from "react";
import PropTypes from "prop-types";
import api from "../api";
import { useNavigate, useLocation } from "react-router-dom";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [post, setPost] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    
    const token = localStorage.getItem("token");
    const isAuthPage =
      location.pathname.includes("/login") ||
      location.pathname.includes("/register");

    if (!token) {
      if (!isAuthPage) {
        navigate("/login");
      }
    } else {
      const userObj = JSON.parse(localStorage.getItem("user"));
      if (userObj && !user) {
        api.get(`/users/${userObj._id}`).then((res) => {
          //console.log("userObj:", userObj._id)
          //console.log(res.data.data);
          setUser(res.data.data);
        });
      }
    }
  }, [user]);
  ;
  return (
    <AppContext.Provider value={{ user, setUser, post, setPost }}>
      {children}
    </AppContext.Provider>
  );
}

// AppContextProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export const useAppContext = () => {
// const {users} = useContext(AppContext);

// return users;
// }

export const useAppContext = () => useContext(AppContext);

// import PropTypes from "prop-types";

// export const Login = ({ firstName, lastName, email, password }) => {
//   console.log({ firstName, lastName, email, password });
//   return <div>Login</div>;
// };

// Login.propTypes = {
//   firstName: PropTypes.number.isRequired,
//   lastName: PropTypes.string.isRequired,
//   email: PropTypes.bool.isRequired,
//   password: PropTypes.string.isRequired,
// };
