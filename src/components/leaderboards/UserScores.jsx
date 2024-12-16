import React from 'react';
import { animate } from '../../styles';
import { useTestResults } from '../../contexts/TestResultsContext';

const UserScores = () => {
  const { testResults, personalBest } = useTestResults();

  return (
    <div className='flex lg:flex-row-reverse flex-col justify-between items-center w-full'>
      {/* Personal Best */}
      {JSON.stringify(personalBest) === '{}' ? null : (
        // Container
        <div
          className={`flex flex-col w-full lg:w-[48.5%] mb-10 lg:mb-0 h-full items-center justify-center p-10 rounded-2xl bg-white/50 text-primary dark:text-primary-dark ${animate} font-bold`}
        >
          {/* Label */}
          <div className='text-2xl lg:text-3xl mt-0 lg:mt-5 mb-5 lg:mb-0'>
            Personal Best
          </div>

          {/* Values */}
          <div className='flex flex-col w-full justify-center items-center text-lg lg:text-xl h-full'>
            <span className='mb-2'>{`Time: ${personalBest.time}s`}</span>
            <span className='mb-2'>{`WPM: ${personalBest.wpm}`}</span>
            <span className='mb-2'>{`Accuracy: ${personalBest.accuracy} %`}</span>
            <span>{`Correct: ${personalBest.wordsCorrect}/${personalBest.testLength}`}</span>
          </div>
        </div>
      )}

      {/* Recent results */}
      {!testResults.length ? null : (
        // Container
        <div
          className={`flex flex-col w-full lg:w-[48.5%] items-center justify-center p-10 rounded-2xl bg-white/50 text-primary dark:text-primary-dark ${animate} font-bold`}
        >
          {/* Title */}
          <div className='mb-10 mt-0 lg:mt-5 text-2xl lg:text-3xl'>
            Recent Results
          </div>

          {/* Labels */}
          <div className='flex text-lg lg:text-xl w-full text-center'>
            <span className='w-1/4'>Time:</span>
            <span className='w-1/4'>WPM:</span>
            <span className='w-1/4'>Accuracy:</span>
            <span className='w-1/4'>Correct:</span>
          </div>

          {/* Divider */}
          <div
            className={`w-full my-5 h-1 rounded-full bg-primary dark:bg-primary-dark ${animate}`}
          />

          {/* Scores */}
          {testResults.map((result, idx) => (
            <div
              key={idx}
              className='flex text-lg lg:text-xl text-center w-full mb-5'
            >
              <span className='w-1/4'>{`${result.time.toFixed(2)}s`}</span>
              <span className='w-1/4'>{result.wpm.toFixed(2)}</span>
              <span className='w-1/4'>{`${result.accuracy.toFixed(2)} %`}</span>
              <span className='w-1/4'>{`${result.wordsCorrect}/${result.testLength}`}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserScores;
