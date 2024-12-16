import React, { useState, useEffect } from 'react';
import { validInput } from './input';
import { generate } from 'random-words';
import './test.css';
import { animate } from '../../../styles';

const buttonStyle = `mx-2 py-2 px-5 rounded-full bg-secondary dark:bg-secondary-dark hover:bg-white dark:hover:bg-white text-primary dark:text-primary-dark hover:scale-110 ${animate}`;

const Test = ({ onTestComplete }) => {
  const [numWords, setNumWords] = useState(25); // Test length
  const [words, setWords] = useState(generate(numWords)); // Words for user to type
  const [isFocused, setIsFocused] = useState(false); // Whether input is focused
  const [hasEnded, setHasEnded] = useState(true); // Whether test has ended
  const [timer, setTimer] = useState(0); // Timer
  const [currentInput, setCurrentInput] = useState(''); // Current word user is typing
  const [input, setInput] = useState([]); // Previously typed words
  const [prevCorrect, setPrevCorrect] = useState(true); // Whether previous word was typed correctly
  const [correct, setCorrect] = useState([]); // Words user has typed correctly
  const [wpm, setWpm] = useState(0); // Words per minute
  const [numTyped, setNumTyped] = useState(0); // Number of times user has typed a letter
  const [numTypedCorrect, setNumTypedCorrect] = useState(0); // Number of times user has typed a letter correctly
  const [keyPressed, setKeyPressed] = useState(''); // Key user has pressed
  const [accuracy, setAccuracy] = useState(100); // Accuracy
  const [resultArr, setResultArr] = useState([]); // Prevents double entry on late wpm calculation

  // Initialize test
  function init(_numWords) {
    setNumWords(_numWords);
    setWords(generate(_numWords));
    setCurrentInput('');
    setInput([]);
    setPrevCorrect(true);
    setCorrect([]);
    setHasEnded(true);
    setWpm(0);
    setKeyPressed('');
    setNumTyped(0);
    setNumTypedCorrect(0);
    setAccuracy(100);
    setTimer(0);
    setResultArr([]);
  }

  // Set focus of test
  function handleFocus() {
    setIsFocused((prev) => !prev);
  }

  // Start test
  function start() {
    setHasEnded(false);
  }

  // End Test
  function end() {
    setHasEnded(true);
  }

  // Create test results object
  useEffect(() => {
    if (hasEnded && timer && input.length === words.length) {
      const testResults = {
        time: timer,
        wpm: wpm,
        accuracy: accuracy,
        testLength: numWords,
        wordsCorrect: correct.length,
      };
      setResultArr((prev) => [...prev, testResults]);
    }
  }, [wpm, timer, accuracy, correct, input]);

  // Pass results to parent
  useEffect(() => {
    if (hasEnded && timer) {
      const timeoutID = setTimeout(() => {
        onTestComplete(resultArr.pop());
      }, 100);
      return () => clearTimeout(timeoutID);
    }
  }, [resultArr]);

  // Manage timer
  useEffect(() => {
    let interval;
    if (!hasEnded) {
      interval = setInterval(() => {
        setTimer((prev) => {
          const time = (prev += 0.01);
          return parseFloat(time.toFixed(2));
        });
      }, 10);
    }
    return () => clearInterval(interval);
  }, [hasEnded]);

  // Store correctly typed words
  function updateCorrect() {
    setCorrect(() => {
      return input.filter((word, index) => word === words[index]);
    });
  }

  // On change of input
  useEffect(() => {
    updateCorrect();
    if (input.length === words.length) end();
  }, [input]);

  // Calculates WPM
  function calcWPM() {
    if (!correct.length) return;
    const numChars = correct.join().length;
    const _wpm = numChars / 5 / (timer / 60);
    setWpm(parseFloat(_wpm.toFixed(2)));
  }

  // On change of correct
  useEffect(() => {
    calcWPM();
  }, [correct, hasEnded]);

  // Calculate accuracy
  function calcAccuracy() {
    const _accuracy = (numTypedCorrect / numTyped) * 100;
    if (!hasEnded) setAccuracy(parseFloat(_accuracy.toFixed(2)));
  }

  // On change of current input
  useEffect(() => {
    if (!hasEnded && keyPressed !== 'backspace' && currentInput.length) {
      setNumTyped((prev) => prev + 1);
      const correctKey = words[input.length][currentInput.length - 1];
      if (keyPressed === correctKey) setNumTypedCorrect((prev) => prev + 1);
    }
  }, [currentInput]);

  useEffect(() => {
    calcAccuracy();
  }, [numTyped]);

  // Handle user input
  function handleKeyDown(e) {
    const key = e.key.toLowerCase();
    if (!validInput.includes(key)) return;
    setKeyPressed(key);

    // Start condition
    if (
      !input.length &&
      !currentInput.length &&
      key !== 'backspace' &&
      key !== ' '
    )
      start();

    // Move onto next word
    if (key === ' ') {
      if (currentInput.length && input.length < words.length) {
        setInput((prev) => {
          const newInput = [...prev, currentInput];
          setPrevCorrect(currentInput === words[newInput.length - 1]);
          return newInput;
        });
        setCurrentInput('');
      }
    }

    // Handle backspaces
    else if (key === 'backspace') {
      if (currentInput.length) setCurrentInput((prev) => prev.slice(0, -1));
      else if (input.length && !prevCorrect && !hasEnded) {
        setCurrentInput(input.pop());
        setPrevCorrect(true);
      }
    }

    // Update input
    else if (currentInput.length < 15) {
      setCurrentInput((prev) => prev + key);
    }
  }

  // Render words to screen
  function renderWords(word, wIdx) {
    return (
      <span key={wIdx} className='mr-2 my-[2px]'>
        {word.split('').map((letter, lIdx) => {
          let color = 'text-secondary dark:text-secondary-dark';
          let rest;

          // style previous words
          if (wIdx < input.length) {
            // correct/incorrect
            if (input[wIdx][lIdx] === letter) color = 'text-white';
            else {
              color = 'text-error dark:text-error-dark underline';
              if (input[wIdx][lIdx] !== undefined) letter = input[wIdx][lIdx];
            }

            // extra input
            if (input[wIdx].length > word.length && lIdx === word.length - 1) {
              rest = (
                <span className='text-error dark:text-error-dark underline'>
                  {input[wIdx].substring(word.length, input[wIdx.lenght])}
                </span>
              );
            }
          }

          // style current word
          else if (wIdx === input.length) {
            // correct/incorrect
            if (lIdx < currentInput.length) {
              if (currentInput[lIdx] === letter) color = 'text-white';
              else {
                color = 'text-error dark:text-error-dark underline';
                letter = currentInput[lIdx];
              }
            }

            // extra input
            if (currentInput.length > word.length && lIdx === word.length - 1) {
              rest = (
                <span className='text-error dark:text-error-dark underline'>
                  {currentInput.substring(word.length, currentInput.length)}
                </span>
              );
            }
          }

          // Render letters
          return (
            <span
              key={lIdx}
              className={`${color} transition-colors ease-in-out duration-200 relative`}
            >
              {renderCaret(word, wIdx, lIdx)}
              {letter}
              {rest !== undefined && rest}
            </span>
          );
        })}
      </span>
    );
  }

  // Render caret
  function renderCaret(word, wIdx, lIdx) {
    if (
      isFocused &&
      wIdx === input.length &&
      (lIdx === currentInput.length ||
        (lIdx === word.length - 1 && currentInput.length >= word.length))
    ) {
      const pos =
        currentInput.length < word.length
          ? 'right-[.42rem]'
          : 'right-[-.42rem]';
      return <span className={`caret absolute top-[-.1rem] ${pos}`}>|</span>;
    }
    return;
  }

  return (
    // Container
    <div className='flex flex-col justify-center items-center'>
      {/* Metrics */}
      <div className='flex justify-center items-center w-full pt-10 text-2xl font-medium'>
        <h1 className='w-1/4 text-center'>
          Time: {hasEnded && !timer ? '--' : timer.toFixed(2) + 's'}
        </h1>
        <h1 className='w-1/4 text-center'>
          WPM: {hasEnded && !timer ? '--' : wpm.toFixed(2)}
        </h1>
        <h1 className='w-1/4 text-center'>
          Accuracy: {hasEnded && !timer ? '--' : accuracy.toFixed(2) + '%'}
        </h1>
      </div>

      {/* Test */}
      <div className='flex flex-wrap items-center relative p-10 text-2xl outline-none'>
        <div
          className={` ${
            isFocused && `opacity-0`
          } transition-opacity ease-in-out duration-300 absolute inset-1 z-10 flex justify-center items-center outline-none backdrop-blur-md overflow-hidden focus:cursor-default cursor-pointer`}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          onFocus={handleFocus}
          onBlur={handleFocus}
        >
          <span
            className={`${
              isFocused && 'opacity-0'
            } transition-opacity ease-in-out duration-300 text-white`}
          >
            Click to start typing!
          </span>
        </div>
        {words.map(renderWords)}
      </div>

      {/* Buttons */}
      <div className='flex justify-center items-center pb-10 pt-2 text-xl font-semibold'>
        <button className={buttonStyle} onClick={() => init(25)}>
          25
        </button>
        <button className={buttonStyle} onClick={() => init(50)}>
          50
        </button>
        <button className={buttonStyle} onClick={() => init(100)}>
          100
        </button>
        <button className={buttonStyle} onClick={() => init(numWords)}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Test;
