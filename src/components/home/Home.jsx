import React from 'react';
import Test from './test/Test';
import { UserAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';
import { collection, addDoc, doc, getDoc, setDoc } from 'firebase/firestore';

const Home = () => {
  const { user } = UserAuth();

  async function handleTestResults(result) {
    if (!user) return;

    const testResultsRef = collection(db, 'users', user.uid, 'testResults');
    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      if (!docSnap.data().bestWpm || result.wpm > docSnap.data().bestWpm)
        await setDoc(
          docRef,
          {
            bestTime: result.time,
            bestWpm: result.wpm,
            bestAccuracy: result.accuracy,
            bestTestLength: result.testLength,
            bestWordsCorrect: result.wordsCorrect,
          },
          { merge: true }
        );
    }

    await addDoc(testResultsRef, {
      time: result.time,
      wpm: result.wpm,
      accuracy: result.accuracy,
      testLength: result.testLength,
      wordsCorrect: result.wordsCorrect,
      timestamp: new Date(),
    });
  }

  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <Test onTestComplete={handleTestResults} />
    </div>
  );
};

export default Home;
