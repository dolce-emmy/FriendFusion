import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header>
        <div className='title-logo'>
        <Link className='title-logo' to='/'>
        Friend Fusion
        </Link>
        </div>
        <nav className='nav'> 
        <NavLink className='navlink' to='register'>
        Register
        </NavLink>
        <NavLink className='navlink' to='profile'>
        Profile
        </NavLink>
        <NavLink className='navlink' to='login'>
        Login
        </NavLink>
        <NavLink className='navlink' to='/'>
        Home
        </NavLink>
        <NavLink className='navlink' to='help'>
          Help
        </NavLink>
        <NavLink className='navlink' to='comments'>
          Comments
        </NavLink>
        </nav>
        </header>
        );
};

export default Navbar;