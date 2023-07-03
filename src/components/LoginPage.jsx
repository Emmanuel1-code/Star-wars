import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route,  } from 'react-router-dom';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import star1 from './assets/star1.png';
import flagman from './assets/flagman.png';
import dash from './assets/dash.png';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Check if password meets requirements
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        'Password must be at least 8 characters long and contain at least one capital letter, one small letter, and one number'
      );
      return;
    }

    // Clear the error message
    setError('');
   
    document.querySelector('.container').classList.add('dimmed');

    const loaderCubes = document.querySelectorAll('.cube');
    loaderCubes.forEach((cube, index) => {
      setTimeout(() => {
        cube.classList.add('blue');
      }, index * 400); // Adjust the delay as needed
    });
  
    // Simulate API request and successful login
    setTimeout(() => {
      // Set loggedIn to true
      setLoggedIn(true);
  
      // Navigate to the dashboard page
      navigate('/dashboard');

      document.querySelector('.container').classList.remove('dimmed');
    }, loaderCubes.length * 600);

    try {
      // Make API request to validate user credentials
      const response = await axios.get('https://swapi.dev/api/people', {
        auth: {
          username: email,
          password: password
        }
      });

       // Check if the API response indicates successful login
       if (response.status === 200) {
        // Set loggedIn to true
        setLoggedIn(true);
      } else {
        // Handle unsuccessful login
        console.log('Invalid credentials');
      }
    } catch (error) {
      // Handle error
      console.log('Error occurred during login:', error);
    }

    // Reset the form
    setEmail('');
    setPassword('');
  };
  useEffect(() => {
    // Check if loggedIn is true
    if (loggedIn) {
      // Navigate to the dashboard page
      navigate('/dashboard');
    }
  }, [loggedIn, navigate]);


  return (
    <div className="container">
      <div className="main-content">
        <div className="leftSection">
          <h2 className="welcome-text">Welcome to star<br /> wars<br /> the clone wars</h2>
          <img src={star1} alt="image" className="star-image" />
          <img src={dash} alt="dash" className="dash-image" />
        </div>

        <div className="rightSection">
          <div className="content">
            <h2 className="signin-text">Sign in to your<br /> account to<br /> continue</h2>
            <div className="form-div">
              <form onSubmit={handleSignIn}>
                <div>
                  <label>Email address</label>
                  <input type="text" value={email} onChange={handleEmailChange} placeholder="Enter email address" />
                </div>
                <div>
                  <label>Password</label>
                  <input type="password" value={password} onChange={handlePasswordChange} placeholder="Enter strong password" />
                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <button type="submit" onClick={handleSignIn}>Sign In</button>
                <div className="loader">
                  <div className="cube"></div>
                  <div className="cube"></div>
                  <div className="cube"></div>
                  <div className="cube"></div>
                  <div className="cube"></div>
               </div>
              </form>
            </div>
          </div>
          <img src={flagman} alt="flagman" className="flagman" />
          <div className="footer">
            <span className="footer-text">All rights reserved 2023 STAR<br /> WARS</span>
            <span className="footer-text-separator"></span>
            <span className="footer-text">Privacy<br /> Terms</span>
            <span className="footer-text-separator"></span>
            <span className="footer-text">English</span>
            <span className="footer-icon">&#9660;</span>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default LoginPage;