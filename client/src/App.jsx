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
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>   
        
            
    </Routes>
    </AppContextProvider>
  )
}

export default App
