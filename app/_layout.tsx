import * as SplashScreen from 'expo-splash-screen';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Stack } from 'expo-router';
import '@/global.css';
import 'react-native-reanimated';
import { SafeAreaView } from 'react-native';
import { useEffect } from 'react';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <SafeAreaView className='items-center justify-center flex-1'>
      <GluestackUIProvider>
        <ThemeProvider value={DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
      </GluestackUIProvider>
    </SafeAreaView>
  );
}
