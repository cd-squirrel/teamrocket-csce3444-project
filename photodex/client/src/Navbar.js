import { Link, useHistory } from 'react-router-dom';
import React  from 'react';
import "./navbar.css"

const Navbar = () => {
    const history = useHistory();
    
    const logout = async () => {
        try {
          await fetch('/api/logout', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
        } catch(err) {
          console.log(err);
        }
        history.push('/');
      };

    return (

        <div className="topnav">
          <Link to="/" className="active navbar-brand">PhotoDex</Link>
          <Link to="/home" className="Home"> Home</Link>
          <Link to="/upload">Upload</Link>
          <Link to="/myAlbums">My Albums</Link>
          <div className="topnav-right">
            <Link to="/login">Login</Link>
            <Link to="#" onClick={logout}>Logout</Link>
            <Link to="/register">Register</Link>
          </div>
        </div>
    );
};

export default Navbar;