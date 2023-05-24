import './App.css';
import AppContextProvider from './context/AppContext';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';

const Title = () => {
    return <h1>FriendFusion</h1>;
};

import Profile from './components/Profile';
import Help from './components/Help';
import Comment from './components/Comment';
import Alert from './components/Alert';
import PublicProfile from './components/PublicProfile';
import NotFound from './components/NotFound';
//import FormLogin from './components/FormLogin'

function App() {
    return (
        <AppContextProvider>
            {/* <FormLogin/> */}

            <Routes>
                <Route path='/' exact element={<Home />} />
                <Route path='/register' exact element={<Register />} />
                <Route path='/login' exact element={<Login />} />
                <Route path='/profile' exact element={<Profile />} />
                <Route
                    path='/profile/public/:id'
                    exact
                    element={<PublicProfile />}
                />
                <Route path='/help' element={<Help />} />
                <Route path='/comments' element={<Comment />} />
                <Route path='/alerts' element={<Alert />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </AppContextProvider>
    );
}

export default App;
