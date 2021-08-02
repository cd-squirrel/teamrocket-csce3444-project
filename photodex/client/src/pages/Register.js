import { useHistory } from "react-router-dom";
import { useState } from 'react';
import React  from 'react';

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
      <div class="contentss">
        
      <img src="https://media.giphy.com/media/4ZtY6pvsG2HdtPSKiS/giphy.gif" id="bG"></img>

        <br></br>
        <h1>Wake Up Samurai</h1>
        <div>
          <img id = "x" src="https://media.giphy.com/media/fA7rLtaJDIWEzU57CT/giphy.gif"
            width="475"
            height="600"></img>
        </div>
        <h2>We've Got An Account To Burn</h2>
        </div>
        <br></br>
        
        <div class="regCard">
        <img src="example_images/card.jpg" id="regCard"></img>
        </div>

        <font color="white">Enter Account Info</font>
        <br></br>
        <br></br>
        <br></br>
               
        <form onSubmit={handleSubmit}>
          
          <input 
            type="text" 
            required
            placeholder = "Username"
            value = {username} 
            onChange={(e) => setUsername(e.target.value)}/>
          <div className="username error"></div>
          
          <label>
          <input 
            type="password" 
            required  
            placeholder = "Password"
            value = {password} 
            onChange={(e) => setPassword(e.target.value)}/>
          <div className="password error"></div>
          </label>
          <br></br>
          <br></br>
         <button>Sign Up</button>        
        </form>

        </div>
        </div>
    );
}

export default Register;
