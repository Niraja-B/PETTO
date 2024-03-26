import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Reg() {
  const [FirstName, setFname] = useState('');
  const [LastName, setLname] = useState('');
  const [EmailAddress, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [City, setCity] = useState('');
  const [Country, setCountry] = useState('');
  const [MobileNumber, setMobile] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [mobileError, setMobileError] = useState('');

  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // Reset password error when the user types in the password field
    setPasswordError('');
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    // Reset password error when the user types in the confirm password field
    setPasswordError('');
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    // Check if the value contains only numbers
    if (!/^\d+$/.test(value)) {
      setMobileError('Mobile number should contain only numbers');
    } else {
      setMobileError('');
    }
    setMobile(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (Password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
            
    // Check if the mobile number contains only numbers
    if (!/^\d+$/.test(MobileNumber)) {
      setMobileError('Mobile number should contain only numbers');
      return;
    }
         
    // Prepare the data to be sent to the API
    const userData = {
      FirstName,
      LastName,
      EmailAddress,
      Password,
      City,
      Country,
      MobileNumber,
    };

    try {
      // Make a POST request to your mock API endpoint
      const response = await axios.post(
        'https://65643735ceac41c0761da128.mockapi.io/ap1/v1/reg',
        userData
      );

      
      navigate('/Firstpage');
      

      // Reset errors
      setPasswordError('');
      setMobileError('');

      // Add your navigation logic here after successful registration
      // For example:
      // history.push('/Firstpage');
    } catch (error) {
      // Handle API request error
      console.error('Error registering user:', error);
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="registration_form">
          <div className="title">Registration Form</div>
          <form onSubmit={handleSubmit}>
            <div className="form_wrap">
              <div className="input_grp">
                <div className="input_wrap">
                  <label htmlFor="fname">First Name</label>
                  <input
                    type="text"
                    id="fname"
                    value={FirstName}
                    onChange={(e) => setFname(e.target.value)}
                  />
                </div>
                <div className="input_wrap">
                  <label htmlFor="lname">Last Name</label>
                  <input
                    type="text"
                    id="lname"
                    value={LastName}
                    onChange={(e) => setLname(e.target.value)}
                  />
                </div>
              </div>
              <div className="input_wrap">
                <label htmlFor="email">Email Address</label>
                <input
                  type="text"
                  id="email"
                  value={EmailAddress}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input_wrap">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={Password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="input_wrap">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                {passwordError && (
                  <p style={{ color: 'red' }}>{passwordError}</p>
                )}
              </div>
              <div className="input_wrap">
                <label htmlFor="mobile">Mobile Number</label>
                <input
                  type="text"
                  id="mobile"
                  value={MobileNumber}
                  onChange={handleMobileChange}
                />
                {mobileError && (
                  <p style={{ color: 'red' }}>{mobileError}</p>
                )}
              </div>
              <div className="input_wrap">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  value={City}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="input_wrap">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  value={Country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div className="input_wrap">
                <input
                  type="submit"
                  value="Register Now"
                  className="submit_btn"
                />
              </div>
            </div>
          </form>
          <div className="input_wrap">
           
          </div>
        </div>
      </div>
    </>
  );
  
}
