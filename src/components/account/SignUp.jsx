import React, { useState } from 'react';
import { UserAuth } from '../../contexts/AuthContext';
import { animate } from '../../styles';
import { BsGoogle } from 'react-icons/bs';
import { BiErrorCircle } from 'react-icons/bi';

const inputStyle = `p-4 mb-6 rounded-lg outline-none bg-white text-black ${animate}`;
const buttonStyle = `p-4 rounded-lg text-xl font-semibold bg-secondary dark:bg-secondary-dark text-primary dark:text-primary-dark hover:bg-white dark:hover:bg-white ${animate}`;

const SignUp = ({ onCreate, onClickToggleForm }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { createUser, googleSignIn } = UserAuth();

  // Sign up with email
  async function handleSubmit(e) {
    e.preventDefault('');
    setError('');

    if (
      !email.length ||
      !username.length ||
      !password.length ||
      !confirmPassword.length
    ) {
      setError('All fields must be filled out');
      return;
    }

    if (username.length > 12 || username.length < 4) {
      setError('Username must be between 4 and 12 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      await createUser(email, password, username);
      onCreate(username);
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  }

  // Sign up with google
  async function handleGoogleSignIn() {
    try {
      await googleSignIn();
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  }

  return (
    <div className='flex flex-col'>
      {/* Header */}
      <h1 className='text-2xl font-semibold text-white'>Create Account</h1>
      <p className='py-2'>
        Already have an account?{' '}
        <button onClick={onClickToggleForm} className='underline'>
          Sign In
        </button>
      </p>

      {/* Error Message */}
      {error.length > 0 && (
        <span
          className={`flex items-center pb-2 underline text-error dark:text-error-dark ${animate}`}
        >
          <BiErrorCircle className='mr-2' /> {error}
        </span>
      )}

      {/* Signup Form */}
      <form
        onSubmit={handleSubmit}
        className='flex flex-col mt-1 text-xl text-primary dark:text-primary-dark'
      >
        {/* Email */}
        <input
          placeholder='Email'
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          className={inputStyle}
        />

        {/* Email */}
        <input
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
          className={inputStyle}
        />

        {/* Password */}
        <input
          placeholder='Password'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          className={inputStyle}
        />

        {/* Confirm Password */}
        <input
          placeholder='Confirm Password'
          type='password'
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={inputStyle}
        />

        {/* Sign Up Button */}
        <button type='submit' className={`mb-3 ${buttonStyle}`}>
          Sign Up
        </button>
      </form>

      {/* Google Signin */}
      <span className='text-white text-center pb-3'>or</span>
      <button
        onClick={handleGoogleSignIn}
        className={`flex justify-evenly items-center ${buttonStyle}`}
      >
        <BsGoogle className='w-[2rem] h-[2rem]' />
        Continue with Google
      </button>
    </div>
  );
};

export default SignUp;
