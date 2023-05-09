import React from 'react'
import UserInfo from './UserInfo'

const Home = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  }
  return (
    <div>
     <button onClick={handleLogout}>Logout</button>
      {/* Header */}
    <UserInfo />
    {/* Main create post, post component
    advertisements
    friends list */}
    {/* Footer */}
    </div>
  )
}

export default Home