import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { getDoc, setDoc, doc } from 'firebase/firestore';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const createUser = (email, password, displayName) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const user = userCredential.user;
        const { uid } = user;

        return updateProfile(user, {
          displayName: displayName,
        })
          .then(() => {
            const userDocRef = doc(db, 'users', uid);
            return setDoc(userDocRef, { displayName });
          })
          .then(() => setUser(user));
      }
    );
  };

  const logout = () => {
    return signOut(auth);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      const user = result.user;
      const { uid, displayName } = user;

      const userDocRef = doc(db, 'users', uid);
      return getDoc(userDocRef).then((docSnapshot) => {
        if (docSnapshot.exists()) setUser(user);
        else {
          return setDoc(userDocRef, { displayName }).then(() => setUser(user));
        }
      });
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ createUser, user, logout, signIn, googleSignIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
