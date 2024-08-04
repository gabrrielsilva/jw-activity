import React, { useState, useEffect } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '@/components/ui/box';

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_CLIENT_ID,
});

export default function HomeScreen() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
  }

  async function onGoogleButtonPress() {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (!user) {
    return (
      <Box className='items-center justify-center flex-1'>
        <Button
          size='md'
          variant='solid'
          action='primary'
          onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
        >
          <ButtonText>Google Sign-In</ButtonText>
        </Button>
      </Box>
    );
  }

  return (
    <Box className='items-center justify-center flex-1'>
      <Text className='text-typography-black'>Welcome {user.displayName}</Text>
      <Button
          size='md'
          variant='solid'
          action='primary'
          className='w-40'
          onPress={() => auth().signOut()}
        >
          <ButtonText>Sign-Out</ButtonText>
        </Button>
    </Box>
  );
}