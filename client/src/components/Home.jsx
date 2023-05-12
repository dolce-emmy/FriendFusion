import React from 'react'
import { useState } from 'react'
import UserInfo from './UserInfo'
import Header from './Header'

import PostForm from './PostForm';

const Home = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  }

  const handleSearch = (event) => {
    // Handle search functionality here
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
     <button onClick={handleLogout}>Logout</button>
      {/* Header */}
      <div>
        <Header onSearch={handleSearch} 
        isNightMode={isNightMode} 
        onToggleNightMode={handleToggleNightMode} />
        
      </div>
    <UserInfo />
    <PostForm />
    {/* Main create post, post component
    advertisements
    
    friends list */}
    {/* Footer */}
    </div>
  )
}

export default Home