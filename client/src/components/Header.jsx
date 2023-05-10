import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Header = ({ onSearch, isNightMode, onToggleNightMode, userName }) => {
    return (
        <header>
            <div className='left'>
                <h1>FriendFusion</h1>
                <form onSubmit={onSearch}>
                    <input type='text' placeholder='Search' />
                    <button type='submit'>Search</button>
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
                {userName && <span>Welcome, {userName}!</span>}
            </div>
        </header>
    );
};

export default Header;
