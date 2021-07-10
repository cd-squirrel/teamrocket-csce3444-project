import { useHistory } from "react-router-dom";
import { useState } from 'react';

const Register = () => {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const usernameError = document.querySelector('.username.error');
    const passwordError = document.querySelector('.password.error');

    const handleErrors = (data) => {
      if (data.includes('username')) 
        return usernameError.textContent = 'username already exists';
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
             const result = await fetch('/api/register', {
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
    <div className="container-fluid">
      <div className="col align-self-center">
        <br></br>
        <br></br>
        <h1>Welcome!</h1>
        <h2>Sign up here</h2>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input 
            type="text" 
            required
            value = {username} 
            onChange={(e) => setUsername(e.target.value)}/>
          <div className="username error"></div>
          <label>Password</label>
          <input 
            type="password" 
            required  
            value = {password} 
            onChange={(e) => setPassword(e.target.value)}/>
          <div className="password error"></div>
          <button>Sign Up</button>
        </form>
        </div>
        </div>
    );
}

export default Register;