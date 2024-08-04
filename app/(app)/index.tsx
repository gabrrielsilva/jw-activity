import React, { useContext, useEffect } from 'react';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { AuthContext } from '@/contexts/auth';
import { Redirect, SplashScreen, Stack } from 'expo-router';

export default function HomeScreen() {
  const { signOut, user } = useContext(AuthContext);
  if (!user) return <Redirect href='/sign-in' />;
  
  return (
    <Box className='items-center justify-center flex-1'>
      <Text className='text-typography-black'>Welcome {user.displayName}</Text>
      <Button size='md' variant='solid' action='primary' onPress={() => signOut()}>
        <ButtonText>Sign-Out</ButtonText>
      </Button>
    </Box>
  );
}