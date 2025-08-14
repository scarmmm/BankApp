import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Appearance } from 'react-native';
import { Colors } from '@/constants/Colors';
import { GlobalStateProvider } from '@/app/GlobalStateContext.jsx'; 
import { useGlobalState } from '@/app/GlobalStateContext.jsx';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GlobalStateProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.headerBackground},
          headerTintColor: theme.text,
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false, title: 'Home' }} />
        <Stack.Screen name="analysis" options={{ headerShown: true, title: 'Analysis', headerTitle: 'Get Analysis' }} />
        <Stack.Screen name="model" options={{ headerShown: true, title: 'Change Model' }} />
        <Stack.Screen name="parameterselection" options={{ headerShown: true, title: 'Select Parameters' }} />
        <Stack.Screen name="input" options={{headerShown: true, title: 'Input', headerTitle: "Enter values to determine loan approval"}}/>
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>
    </GlobalStateProvider>
  );
}
