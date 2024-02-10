import React, { useEffect } from 'react';
import './style.css';

const Login = () => {

    useEffect(() => {
        document.body.classList.add('login-bg');
        return () => {
            document.body.classList.remove('login-bg');
        };
    }, []);

    return (
        <div class="login-container">
            <div class="login-header">
                <h2>Login</h2>
            </div>
            <div class="login-form">
                <label for="username">Username:</label>
                <input type="text" id="username" placeholder="Enter your username" />

                <label for="password">Password:</label>
                <input type="password" id="password" placeholder="Enter your password" />

                <button type="submit">Login</button>
            </div>
        </div>
    );
}

export default Login;
