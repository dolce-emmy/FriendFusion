import React from 'react';
import { useState } from 'react';
import UserInfo from './UserInfo';
import Header from './Header';
import PostForm from './PostForm';
import PostList from './PostList';
import api from '../api';

const Home = () => {
    const [showSearchedUsers, setShowSearchedUsers] = useState(false);
    const [searchedUsers, setSearchedUsers] = useState([]);

    const handleSearch = (event) => {
        event.preventDefault();
        // Handle search functionality here
        const query = event.target.search.value;

        const formData = new FormData();
        formData.append('query', query);

        // Filter the user list based on the search query
        api.post('/users/search', formData).then((res) => {
            console.log(res.data.data);
            setSearchedUsers(res.data.data);
            setShowSearchedUsers(true);
        });
    };

    const [isNightMode, setIsNightMode] = useState(false);

    const handleToggleNightMode = () => {
        // Handle night mode toggle functionality here
        setIsNightMode(!isNightMode);
        const body = document.querySelector('body');
        body.classList.toggle('night-mode');
    };

    //const isNightMode = false;

    return (
        <div>
            {/* Header */}
            <Header
                showSearchedUsers={showSearchedUsers}
                searchedUsers={searchedUsers}
                onSearch={handleSearch}
                isNightMode={isNightMode}
                onToggleNightMode={handleToggleNightMode}
            />
            <div className='w-5/6 mx-auto flex flex-col md:flex-row items-start gap-6 mt-10'>
                <div className='w-full md:w-4/12 lg:w-3/12 lg:max-w-xs'>
                    <UserInfo />
                </div>

                <div className='w-full md:w-8/12 lg:w-6/12 lg:max-w-xl'>
                    <PostForm />
                    <PostList />
                </div>
                <div className='w-full md:hidden lg:block lg:w-3/12 lg:max-w-xs'>
                    {/* TODO: advertisements, friends list */}
                </div>
            </div>
            {/* Footer */}
        </div>
    );
};

export default Home;
