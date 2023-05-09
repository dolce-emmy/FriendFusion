import './App.css'
import AppContextProvider from './context/AppContext'
import {Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'

function App() {
  return (
    <AppContextProvider>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>    
    </Routes>
    </AppContextProvider>
  )
}

export default App
