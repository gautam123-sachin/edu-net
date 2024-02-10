import React, { useEffect } from 'react';
import './style.css'; 

const Signup = () => {
    
    useEffect(() => {
        document.body.classList.add('signup-bg');
        return () => {
            document.body.classList.remove('signup-bg');
        };
    }, []);

    return (
        <div class="sign-container">
        <div class="sign-header">
            <h2>Login</h2>
        </div>
        <div class="sign-form">
            <label for="firstname">First Name:</label>
            <input type="text" id="firstname" placeholder="Enter your First Name" />
            <label for="lastname">Last Name:</label>
            <input type="text" id="lastname" placeholder="Enter your Last Name" />
            <label for="email">Email:</label>
            <input type="text" id="email" placeholder="Enter your Email" />
            <label for="password">Password:</label>
            <input type="password" id="password" placeholder="Enter your password" />

            <button type="submit">Signup</button>
        </div>
    </div>
    );
}

export default Signup;
