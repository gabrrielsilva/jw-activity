import { createContext, type PropsWithChildren, useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_CLIENT_ID,
});

export const AuthContext = createContext<{
  signIn: () => void;
  signOut: () => void;
  user?: FirebaseAuthTypes.User | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  user: null,
  isLoading: true
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  const [isLoading, setIsLoading] = useState(true);

  async function signInWithGoogle() {
    setIsLoading(true);
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } finally {
      setIsLoading(false);
    }
  }

  async function signOut() {
    setIsLoading(true);
    try {
      await auth().signOut();
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });

    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn: () => signInWithGoogle(),
        signOut: () => signOut(),
        isLoading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
