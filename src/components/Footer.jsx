import React from 'react';
import { AiFillGithub, AiFillLinkedin, AiOutlineLink } from 'react-icons/ai';

const spanStyle = `text-secondary dark:text-secondary-dark transition ease-in-out duration-300`;
const linkStyle = `cursor-pointer text-secondary dark:text-secondary-dark hover:text-white dark:hover:text-white transition ease-in-out duration-300`;

const Footer = () => {
  return (
    <div className='flex justify-between items-center w-full p-10'>
      <span className={spanStyle}>Developed by Mohammad Nedaei</span>
      <ul className='flex'>
        <li className={`mr-5 ${linkStyle}`}>
          <a
            href=''
            target='_blank'
            className='flex items-center justify-center'
          >
            Portfolio
            <AiOutlineLink className='ml-1' />
          </a>
        </li>
        <li className={`mr-5 ${linkStyle}`}>
          <a
            href=''
            target='_blank'
            className='flex items-center justify-center'
          >
            Github
            <AiFillGithub className='ml-1' />
          </a>
        </li>
        <li className={linkStyle}>
          <a
            href=''
            target='_blank'
            className='flex items-center justify-center'
          >
            LinkedIn
            <AiFillLinkedin className='ml-1' />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
