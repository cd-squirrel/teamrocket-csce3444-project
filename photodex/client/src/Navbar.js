import { Link, useHistory } from 'react-router-dom';


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
        <nav className="navbar navbar-expand-md navbar-light bg-light justify-content-center">
          <a className="navbar-brand d-flex w-50 mr-auto" href="index.html">PhotoDex</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="nav">
          <ul className="nav navbar-nav mr-auto justify-content-end">
              <li className="nav-item">
                <Link to="/myAlbums" className="nav-link">My Albums</Link>
              </li>
              <li className="nav-item">
  
                 <Link to="/login" className="nav-link">Login</Link>

              </li>
              <li className="nav-item">
                  <button className="nav-link" onClick={logout}>Log Out</button>
                  </li>
              <li className="nav-item">
                  <Link to="/register" className="nav-link">Register</Link>
              </li>
          </ul>
          </div>
        </nav>
    );
};

export default Navbar;