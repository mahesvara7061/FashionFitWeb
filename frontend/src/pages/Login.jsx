import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // Required fields
    const userData = {
      Username: name , 
      Password: password , 
      Email: email ,
      FullName: 'Random Full Name', 
      Province: 'Random Province', 
      District: 'Random District', 
      Ward: 'Random Ward', 
      Address: 'Random Address', 
      DateOfBirth: '2000-01-01', 
      PhoneNumber: '1234567890' 
    };

    console.log(userData)

    if (currentState === 'Sign Up') {
      try {
        const response = await axios.post('http://127.0.0.1:5000/api/user/register', userData);
        if(response.data)
        {
          toast.success("Register successfully!")
        }

      } catch (error) {
        console.error('Registration error:', error);
      }
    } else {
      try {
        const response = await axios.post('http://127.0.0.1:5000/api/user/login', userData);
        console.log(response)
        if(response.data)
        {
          localStorage.setItem('userId', JSON.stringify(response.data.UserId));

          const userId = JSON.parse(localStorage.getItem('userId'));
          console.log(userId)
          navigate('/home');
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4">
      {/* Title Section */}
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {/* Input Fields */}
      {currentState === 'Sign Up' && (
        <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800 rounded placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
        placeholder="Email"
        required
      />
      )}
      <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800 rounded placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
          placeholder="Name"
          required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800 rounded placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
        placeholder="Password"
        required
      />

      {/* Forgot Password and Toggle State */}
      <div className="w-full flex justify-between text-sm mt-2">
        <p className="cursor-pointer text-gray-600 hover:text-gray-800">Forgot Password?</p>
        {currentState === 'Login' ? (
          <p
            onClick={() => setCurrentState('Sign Up')}
            className="cursor-pointer text-gray-600 hover:text-gray-800"
          >
            New User? Create an account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState('Login')}
            className="cursor-pointer text-gray-600 hover:text-gray-800"
          >
            Already have an account? Login
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900 transition-all duration-200"
      >
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;