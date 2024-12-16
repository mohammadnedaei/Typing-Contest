import React, { useEffect, useState, createContext, useContext } from 'react';
import { UserAuth } from './AuthContext';
import { db } from '../firebase';
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';

const TestResultsContext = createContext([]);

const TestResultsProvider = ({ children }) => {
  const [testResults, setTestResults] = useState([]);
  const [personalBest, setPersonalBest] = useState({});
  const [leaderboard, setLeaderboard] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    const fetchTestResults = async () => {
      if (!user) return;

      const q = query(
        collection(db, 'users', user.uid, 'testResults'),
        orderBy('timestamp', 'desc'),
        limit(5)
      );
      const querySnapshot = await getDocs(q);

      const results = [];
      querySnapshot.forEach((doc) => {
        results.push(doc.data());
      });
      setTestResults(results);
    };

    const fetchPersonalBest = async () => {
      if (!user) return;

      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.data().bestWpm !== undefined) {
        const pb = {
          time: docSnap.data().bestTime,
          wpm: docSnap.data().bestWpm,
          accuracy: docSnap.data().bestAccuracy,
          wordsCorrect: docSnap.data().bestWordsCorrect,
          testLength: docSnap.data().bestTestLength,
        };
        setPersonalBest(pb);
      }
    };

    const fetchLeaderboard = async () => {
      const q = query(collection(db, 'users'), orderBy('bestWpm', 'desc'));
      const querySnapshot = await getDocs(q);

      const results = [];
      querySnapshot.forEach((doc) => {
        results.push(doc.data());
      });
      setLeaderboard(results);
    };

    fetchTestResults();
    fetchPersonalBest();
    fetchLeaderboard();
  }, [user]);

  return (
    <TestResultsContext.Provider
      value={{ testResults, personalBest, leaderboard }}
    >
      {children}
    </TestResultsContext.Provider>
  );
};

const useTestResults = () => useContext(TestResultsContext);

export { TestResultsProvider, useTestResults };
