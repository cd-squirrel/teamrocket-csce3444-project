import { useHistory } from "react-router-dom";
import { useState } from 'react';

const Login = () => {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const usernameError = document.querySelector('.username.error');
    const passwordError = document.querySelector('.password.error');

    const handleErrors = (data) => {
      if (data.includes('username')) 
        return usernameError.textContent = 'username does not exist';
      else  
        return passwordError.textContent = 'invalid password';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const login = { username, password };

        //reset errors
        usernameError.textContent = '';
        passwordError.textContent = '';
        
        try {
             const result = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(login)
            });
            const data = await result.json();
            console.log(data);
            
            if (data.login) {
                history.push('/');
            } else {
                handleErrors(data);
            }
        } catch(err) {
            console.log(err);
        }
    };

    return (
       <div className="login">

      <img src="https://media.giphy.com/media/uFmH8za4E6M5STIiTu/giphy.gif" id="bG" alt=""></img>

        <br></br>
        <br></br>

        <div className="contents">
        <h1>The Login Page, You Have Found</h1>

        <div>
          <img id = "x" src="example_images/yoda.jpg"
            width="350"
            height="350"
            alt=""></img>
        </div>

        <br></br>

        <h2>In Below, Your Information Goes</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            required
            placeholder = "Username"
            value = {username} 
            onChange={(e) => setUsername(e.target.value)}/>
          <div className="username error"></div>
          <input 
            type="password" 
            required  
            placeholder = "Password"
            value = {password} 
            onChange={(e) => setPassword(e.target.value)}/>
          <div className="password error"></div>
          <button>Log In</button>
        </form>
        </div>
        </div>
    );
}

export default Login;
