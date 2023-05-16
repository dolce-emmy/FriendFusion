import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Header = ({
    showSearchedUsers,
    onSearch,
    searchedUsers,
    isNightMode,
    onToggleNightMode,
}) => {
    const { user } = useAppContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload();
    };

    const handleNavigateProfilePublicPage = (userId) => {
        navigate(`/profile/public/${userId}`);
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
                    <form onSubmit={onSearch}>
                        <input type='text' name='search' placeholder='Search' />
                        <button
                            type='submit'
                            class='mr-5 font-medium hover:text-gray-900'
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
                {/* <button onClick={onToggleNightMode}>
                {isNightMode ? 'Day Mode' : 'Night Mode'}
            </button> */}
                <i
                    className={isNightMode ? 'fas fa-moon' : 'fas fa-sun'}
                    onClick={onToggleNightMode}
                ></i>
                <Link to='/comments'>
                    <i className='fas fa-comments'></i>
                </Link>
                <Link to='/alerts'>
                    <i className='fas fa-bell'></i>
                </Link>
                <Link to='/help'>
                    <i className='fas fa-question-circle'></i>
                </Link>
                {/* {userName && <span>Welcome, {userName}!</span>} */}
                <span>Welcome {user?.firstName}</span>
                <button onClick={handleLogout}>
                    <svg
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        class='w-6 h-6'
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
