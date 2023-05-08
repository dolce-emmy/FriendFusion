import './App.css'
import FriendList from './components/FriendList'
import UserList from "./components/UserList"
import AppContextProvider from './context/AppContext'


const Title = () => {
  return  <h1>FriendFusion</h1>
}


function App() {
  return (
    <AppContextProvider>
    <Title/>
    <UserList />
    <FriendList/>
    </AppContextProvider>
  )
}

export default App
