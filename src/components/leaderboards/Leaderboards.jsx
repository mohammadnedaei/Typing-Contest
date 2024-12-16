import React from 'react';
import UserScores from './UserScores';
import { UserAuth } from '../../contexts/AuthContext';
import { useTestResults } from '../../contexts/TestResultsContext';
import { animate } from '../../styles';

const Leaderboards = () => {
  const { user } = UserAuth();
  const { leaderboard } = useTestResults();

  return (
    // Personal best / results
    <div className='flex flex-col justify-center items-center w-full p-10'>
      {user ? (
        <UserScores />
      ) : (
        <div className='py-10 text-2xl'>
          <a href='/account' className='underline'>
            Sign in
          </a>{' '}
          to track/view your results!
        </div>
      )}

      {/* Leaderboard */}
      <div
        className={`flex flex-col justify-center items-center w-full p-10 mt-10 rounded-2xl bg-white/50 text-primary dark:text-primary-dark ${animate} font-bold`}
      >
        {/* Title */}
        <h1 className='text-2xl lg:text-3xl mt-0 lg:mt-5 mb-10'>Leaderboard</h1>

        {/* Labels */}

        <div className='flex text-lg lg:text-xl w-full text-center'>
          <span className='w-1/6'>Rank:</span>
          <span className='w-1/6'>Username:</span>
          <span className='w-1/6'>Time:</span>
          <span className='w-1/6'>WPM:</span>
          <span className='w-1/6'>Accuracy:</span>
          <span className='w-1/6'>Correct:</span>
        </div>

        {/* Divider */}
        <div
          className={`w-full my-5 h-1 rounded-full bg-primary dark:bg-primary-dark ${animate}`}
        />

        {/* Scores */}
        {leaderboard.map((result, idx) => (
          <div
            key={idx}
            className='flex w-full text-center mb-5 text-lg lg:text-xl'
          >
            <span className='w-1/6'>{`${idx + 1}`}</span>
            <span className='w-1/6'>{`${result.displayName}`}</span>
            <span className='w-1/6'>{`${result.bestTime}s`}</span>
            <span className='w-1/6'>{`${result.bestWpm}`}</span>
            <span className='w-1/6'>{`${result.bestAccuracy} %`}</span>
            <span className='w-1/6'>{`${result.bestWordsCorrect}/${result.bestTestLength}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboards;
