import './App.css'
import AppContextProvider from './context/AppContext'
import {Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
//import FormLogin from './components/FormLogin'


function App() {
  return (
    <AppContextProvider>

      {/* <FormLogin/> */}

      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/profile" exact element={<Profile />} />
      </Routes>
    </AppContextProvider>
  );
}

export default App
