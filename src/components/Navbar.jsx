import React from 'react';
import { RiAccountCircleFill } from 'react-icons/ri';
import { BsKeyboard } from 'react-icons/bs';
import { MdLeaderboard, MdOutlineLightMode } from 'react-icons/md';

const Navbar = ({ onClickToggleDark }) => {
  return (
    <nav className='w-full p-10 text-2xl flex items-center justify-between'>
      {/* Logo */}
      <a href='/' className='text-3xl font-bold cursor-pointer'>
        UUT Typing Contest
      </a>

      <ul className='flex items-center justify-center text-secondary dark:text-secondary-dark'>
        {/* Test */}
        <li className='flex items-center justify-center mx-5'>
          <a
            href='/'
            className='px-1 hover:text-white transition ease-in-out duration-300 cursor-pointer'
          >
            <BsKeyboard className='w-10 h-10' />
          </a>
        </li>

        {/* Leaderboard */}
        <li className='flex items-center justify-center mx-5'>
          <a
            href='/leaderboards'
            className='px-1 hover:text-white transition ease-in-out duration-300 cursor-pointer'
          >
            <MdLeaderboard className='w-10 h-10' />
          </a>
        </li>

        {/* Account */}
        <li className='flex items-center justify-center mx-5'>
          <a
            href='/account'
            className='px-1 hover:text-white transition ease-in-out duration-300 cursor-pointer'
          >
            <RiAccountCircleFill className='w-10 h-10' />
          </a>
        </li>

        {/* Theme toggle */}
        <li className='flex items-center justify-center ml-5'>
          <a
            className='px-1 hover:text-white transition ease-in-out duration-300 cursor-pointer'
            onClick={onClickToggleDark}
          >
            <MdOutlineLightMode className='w-10 h-10' />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
