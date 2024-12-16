import React, { useState } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { animate } from '../../styles';
import { UserAuth } from '../../contexts/AuthContext';

const Account = () => {
  const [hasAccount, setHasAccount] = useState(
    localStorage.getItem('hasAccount') === 'true'
  );
  const [displayName, setDisplayName] = useState('');
  const { user, logout } = UserAuth();

  function getDisplayName(displayName) {
    setDisplayName(displayName);
  }

  function toggleForm() {
    localStorage.setItem('hasAccount', hasAccount ? 'false' : 'true');
    setHasAccount((prev) => !prev);
  }

  async function handleLogout() {
    try {
      await logout();
      setDisplayName('');
      console.log('Logged out');
    } catch (e) {
      console.log(e.message);
    }
  }

  function renderLogin() {
    return (
      <div className='flex flex-col justify-evenly min-w-[25%]'>
        {hasAccount ? (
          <SignIn onClickToggleForm={toggleForm} />
        ) : (
          <SignUp onCreate={getDisplayName} onClickToggleForm={toggleForm} />
        )}
      </div>
    );
  }

  function renderAccount() {
    return (
      <div className='flex flex-col justify-center items-center w-full'>
        {/* Account Info container */}
        <div className='flex flex-col text-2xl mb-10'>
          <span className='mb-2'>
            Signed in as: {displayName.length ? displayName : user.displayName}
          </span>
          <span>Email: {user.email}</span>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={handleLogout}
          className={`py-4 px-10 text-xl font-semibold rounded-lg bg-secondary dark:bg-secondary-dark text-primary dark:text-primary-dark hover:bg-white dark:hover:bg-white ${animate}`}
        >
          Sign Out
        </button>
      </div>
    );
  }

  return user ? renderAccount() : renderLogin();
};

export default Account;
