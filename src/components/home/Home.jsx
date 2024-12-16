import React from 'react';
import Test from './test/Test';
import { UserAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';
import { collection, addDoc, doc, getDoc, setDoc } from 'firebase/firestore';

const Home = () => {
  const { user } = UserAuth();

  async function handleTestResults(result) {
    if (!user) return;
    console.log(user)
    const testResultsRef = collection(db, 'users', user.uid, 'testResults');
    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && docSnap.data()) {
        const userData = docSnap.data();
        if (!userData.bestWpm || result.wpm > userData.bestWpm) {
            await setDoc(
                docRef,
                {
                    displayName: result.displayName,
                    bestTime: result.time,
                    bestWpm: result.wpm,
                    bestAccuracy: result.accuracy,
                    bestTestLength: result.testLength,
                    bestWordsCorrect: result.wordsCorrect,
                },
                {merge: true}
            );
        }
    }
        else {console.warn("User document does not exist, creating new user document...");
            // Optional: Create a new user document if it doesn't exist
            await setDoc(docRef, {
                displayName: result.displayName,
                bestTime: result.time,
                bestWpm: result.wpm,
                bestAccuracy: result.accuracy,
                bestTestLength: result.testLength,
                bestWordsCorrect: result.wordsCorrect,
            });
    }

      await addDoc(testResultsRef, {
          displayName: result.displayName,
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
