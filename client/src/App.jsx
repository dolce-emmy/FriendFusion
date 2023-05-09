import './App.css'
// import FriendList from './components/FriendList'
import UserList from "./components/UserList"
import AppContextProvider from './context/AppContext'
import {Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'


const Title = () => {
  return  <h1>FriendFusion</h1>
}


function App() {
  return (
    <AppContextProvider>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>

    
    </Routes>
    <UserList />
   
    </AppContextProvider>
  )
}

export default App
