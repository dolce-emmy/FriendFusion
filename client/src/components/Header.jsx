import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import api from '../api';

const Header = () => {
    const { user } = useAppContext();
    const navigate = useNavigate();
    const [isNightMode, setIsNightMode] = useState(false);
    const [showSearchedUsers, setShowSearchedUsers] = useState(false);
    const [searchedUsers, setSearchedUsers] = useState([]);

    const handleSearch = (event) => {
        event.preventDefault();
        // Handle search functionality here
        const query = event.target.search.value;

        const formData = new FormData();
        formData.append('query', query);

        // Filter the user list based on the search query
        api.post('/users/search', formData, {
            headers: { 'Content-Type': 'application/json' },
        }).then((res) => {
            console.log(res.data.data);
            setSearchedUsers(res.data.data);
            setShowSearchedUsers(true);
        });
    };

    const handleToggleNightMode = () => {
        // Handle night mode toggle functionality here
        setIsNightMode(!isNightMode);
        const body = document.querySelector('body');
        body.classList.toggle('night-mode');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload();
    };

    const handleNavigateProfilePublicPage = (userId) => {
        navigate(`/profile/public/${userId}`);
        setShowSearchedUsers(false);
    };

    return (
        <header className='flex justify-between items-center bg-neutral-800 shadow-md p-5 h-20'>
            <div className='left'>
                <Link to='/'>
                    <h1 className='mr-5 font-medium hover:text-gray-900'>
                        FriendFusion
                    </h1>
                </Link>
                <div className='relative'>
                    <form onSubmit={handleSearch}>
                        <input type='text' name='search' placeholder='Search' />
                        <button
                            type='submit'
                            className='mr-5 font-medium hover:text-gray-900'
                        >
                            Search
                        </button>
                    </form>
                    <div
                        className={`${
                            showSearchedUsers ? 'block' : 'hidden'
                        } absolute right-0 mt-2 py-2 w-full text-white bg-neutral-700 rounded-md shadow-xl z-20`}
                    >
                        {searchedUsers?.map((searchedUser) => (
                            <button
                                key={searchedUser._id}
                                onClick={() =>
                                    handleNavigateProfilePublicPage(
                                        searchedUser._id
                                    )
                                }
                                className='flex gap-4 items-center border-b border-neutral-700 p-3 hover:bg-neutral-600 hover:text-white'
                            >
                                <span className='block rounded-full max-w-[65px] h-16 overflow-hidden'>
                                    <img
                                        className='w-full h-full'
                                        src={
                                            searchedUser?.image?.url ||
                                            'https://placehold.co/60x60/png'
                                        }
                                        alt={searchedUser?.firstName}
                                    />
                                </span>
                                <div className='flex flex-col items-start'>
                                    {searchedUser?.firstName && (
                                        <span className='font-bold text-xl'>
                                            <span className='mr-1'>
                                                {searchedUser?.firstName}
                                            </span>
                                            <span>
                                                {searchedUser?.lastName}
                                            </span>
                                        </span>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className='right'>
                {/* <i
                    className={isNightMode ? 'fas fa-moon' : 'fas fa-sun'}
                    onClick={handleToggleNightMode}
                ></i> */}

                {isNightMode ? (
                    <MoonIcon
                        className='h-6 w-6 mr-4'
                        onClick={handleToggleNightMode}
                    />
                ) : (
                    <SunIcon
                        className='h-6 w-6 mr-4'
                        onClick={handleToggleNightMode}
                    />
                )}

                <Link to='/comments' className='mr-4'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-6 h-6'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z'
                        />
                    </svg>
                </Link>

                <Link to='/alerts' className='mr-4'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke-width='1.5'
                        stroke='currentColor'
                        class='w-6 h-6'
                    >
                        <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5'
                        />
                    </svg>
                </Link>
                <Link to='/help' className='mr-4'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke-width='1.5'
                        stroke='currentColor'
                        class='w-6 h-6'
                    >
                        <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            d='M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z'
                        />
                    </svg>
                </Link>
                <span>Welcome {user?.firstName}</span>
                <button onClick={handleLogout}>
                    <svg
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='w-6 h-6'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75'
                        />
                    </svg>
                </button>
            </div>
        </header>
    );
};

export default Header;
