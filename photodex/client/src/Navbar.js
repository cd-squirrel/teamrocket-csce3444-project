import { Link, useHistory } from 'react-router-dom';
// import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap'; wow
import "./navbar.css"

const NavBar = () => {
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

        // <nav className="navbar navbar-expand-md navbar-light bg-primary"> 
        //   <a className="navbar-brand align-self-start"  href="index.html">PhotoDex</a>
        //   <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav">
        //     <span className="navbar-toggler-icon"></span>
        //   </button>
        //   <div className="collapse navbar-collapse" id="nav">
        //   <ul className="nav navbar-nav mr-auto justify-content-end">
        //       <li className="nav-item">
        //         <Link to="/upload" className="nav-link text-light">Upload</Link>
        //       </li>
        //       <li className="nav-item">
        //         <Link to="/myAlbums" className="nav-link text-light">My Albums</Link>
        //       </li>
        //       <li className="nav-item">
        //          <Link to="/login" className="nav-link text-light">Login</Link>
        //       </li>
        //       <li className="nav-item">
        //           <button className="nav-link" onClick={logout}>Log Out</button>
        //           </li>
        //       <li className="nav-item">
        //           <Link to="/register" className="nav-link text-light">Register</Link>
        //       </li>
        //   </ul>
        //   </div>
        // </nav>
        <div className="topnav">
          <Link to="/" className="active navbar-brand">PhotoDex</Link>
          <Link to="/upload">Upload</Link>
          <Link to="/myAlbums">My Albums</Link>
          <div className="topnav-right">
            <Link to="/login">Login</Link>
            <Link onClick={logout}>Logout</Link>
            <Link to="/register">Register</Link>
          </div>
        </div>
    );
};

export default NavBar;