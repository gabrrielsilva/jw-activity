import * as SplashScreen from 'expo-splash-screen';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Stack } from 'expo-router';
import '@/global.css';
import 'react-native-reanimated';
import { SafeAreaView } from 'react-native';
import { useEffect } from 'react';
import { AuthProvider } from '@/contexts/auth';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => { SplashScreen.hideAsync() }, []);

  return (
    <AuthProvider>
      <SafeAreaView className='items-center justify-center flex-1'>
        <GluestackUIProvider>
          <ThemeProvider value={DefaultTheme}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name='sign-in' />
              <Stack.Screen name='+not-found' />
            </Stack>
          </ThemeProvider>
        </GluestackUIProvider>
      </SafeAreaView>
    </AuthProvider>
  );
}
