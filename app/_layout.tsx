import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  const createDbIfNeeded = async (db: SQLiteDatabase) => {
    console.log("create database if needed")
    await db.execAsync(
      "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT);"
    );
  };

  return (
    <SQLiteProvider databaseName="test.db" onInit={createDbIfNeeded}>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{presentation: "modal"}} />
        <Stack.Screen name="modalthree" options={{presentation: "modal"}} />
        <Stack.Screen name="modaltwo" options={{presentation: "modal"}} />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
    </SQLiteProvider>
  );
}
