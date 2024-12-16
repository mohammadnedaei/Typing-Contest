import React, { useState } from 'react';
import {
  Navbar,
  Home,
  Leaderboards,
  Account,
  Footer,
} from './components/index';
import { Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import { TestResultsProvider } from './contexts/TestResultsContext';

const App = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  function toggleDarkMode() {
    localStorage.setItem('theme', darkMode ? '' : 'dark');
    setDarkMode((prev) => !prev);
  }

  return (
    <AuthContextProvider>
      <div className={darkMode ? 'dark' : ''}>
        <div className='flex flex-grow w-full min-h-screen bg-primary dark:bg-primary-dark text-white font-mono transition ease-in-out duration-300'>
          {/* Content Container */}
          <div className='w-full hidden sm:flex flex-col items-center justify-between 2xl:px-0 px-10 max-w-screen-2xl mx-auto'>
            <Navbar onClickToggleDark={toggleDarkMode} />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route
                path='/leaderboards'
                element={
                  <TestResultsProvider>
                    <Leaderboards />
                  </TestResultsProvider>
                }
              />
              <Route path='/account' element={<Account />} />
            </Routes>
            <Footer />
          </div>

          {/* Warning for mobile users */}
          <div className='flex sm:hidden h-screen w-full justify-center items-center px-10'>
            <span>Sorry! This site does not yet support mobile devices.</span>
          </div>
        </div>
      </div>
    </AuthContextProvider>
  );
};

export default App;
