import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAppContext } from "../context/AppContext";


const Header = ({ onSearch, isNightMode, onToggleNightMode, }) => {
    const {user} = useAppContext();
    return (
        <header>
            <div className='left'>
                <Link to= '/'>
                    <h1 class="mr-5 font-medium hover:text-gray-900">FriendFusion</h1>
                </Link>
                <form onSubmit={onSearch}>
                    <input type='text' placeholder='Search' />
                    <button type='submit' class="mr-5 font-medium hover:text-gray-900">Search</button>
                </form>
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
            </div>
        </header>
    );
};

export default Header;



