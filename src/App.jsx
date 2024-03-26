import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { useNavigate } from 'react-router-dom';


export default function App() {

  const [user, setUser] = useState({ email: '', password: '' });
  const [isValidEmail, setIsValidEmail] = useState(true);
  const navigate = useNavigate();
  
const APIKEY="https://65643735ceac41c0761da128.mockapi.io/ap1/v1/reg";


//   useEffect(() => {
//     axios.get(APIKEY)
//       .then(response => {
//         setRegistrationData(response.data);

//         // Optional: Log the fetched registration data
//         console.log('Registration Data:', response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching registration data:', error);
//       });
//   }, []);

  const updateemail = (e) => {
    setUser({ ...user, email: e.target.value });
    setIsValidEmail(validateEmail(e.target.value));
  };

  const updatepassword = (e) => {
    setUser({ ...user, password: e.target.value });
  };

//   const handleSubmit = () => {
//     setLoginAttempted(true);

//     if (!isValidEmail) {
//       alert('Invalid email address.');
//       return;
//     }

//     // Check for matching user after data has been fetched
//     const matchingUser = registrationData.find(regUser => regUser.email === user.email && regUser.password === user.password);

//     console.log('Matching User:', matchingUser);

//     if (matchingUser) {
//       handlemeow();
//       alert('Login successful!');
//       // Proceed with your login logic here or redirect to the next page
//       // history.push('/Firstpage');
//     } else {
//       alert('Invalid email or password.');
//     }
//   };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkUser = async (email , password) => {
     const response = await axios.get(APIKEY);

     console.log(response);

     return response.data.some(
       (user) => user.EmailAddress === email && user.Password === password
     )

  }

  const handleLogin = async () => {
      const userExist = await checkUser(user.email , user.password);

      if(userExist)
      {
         alert("login succesfull");
         navigate('/Firstpage');
      }

      else
      {
         alert("user does not exits")
      }
  }

  return (
    <>
      <div className="login1">
        <img
          className="img1"
          src="https://media.istockphoto.com/id/1298623258/vector/pets-cats-and-dogs-seamless-pattern-in-doodle-style.jpg?s=612x612&w=0&k=20&c=aBGESJnmydI7uM1Yu8bWCm0Obf0YBG8sahzR3KJgffY="
          alt=""
        />

        <div className="login">
          <table>
            <img
              className="pic1"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1yiKsNL7hVr4LCGASGh8LjuUIfm5T6YWsjw&usqp=CAU"
              alt=""
            />
            <h1>Adapt Me!</h1>
            <br></br>
            <label>Email Address: </label>
            <br />
            <br />
            <input
              type="text"
              placeholder="email"
              value={user.email}
              onChange={updateemail}
              className="email"
            />
            
            <br />
            <br />
            <label>Password: </label>
            <br />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={updatepassword}
              className="email"
            />
            <br />
            <br />
            <Link to="/">
              <input
                className="button1"
                type="button"
                value="Login"
                onClick={handleLogin}
              />
            </Link>
            {!isValidEmail && (
              <p style={{ color: 'red' }}>Invalid email or password.</p>
            )}
            <p className="p1">
              Don't have an account? <br />
            </p>
            <Link to="/Reg">
              <p>Sign up</p>
            </Link>
          </table>
        </div>
      </div>
    </>
  );
}
 