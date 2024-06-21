import "../global.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { AuthProvider } from "~/lib/auth/AuthProvider";
import { useAuth } from "~/lib/auth/useAuth";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Inter: require("assets/fonts/Inter.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <StackLayout />
      </AuthProvider>
    </QueryClientProvider>
  );
}

function StackLayout() {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    console.log({ isAuthenticated, segments });
    const isAuthGroup = segments[0] === "(protected)";

    if (isAuthGroup && !isAuthenticated) {
      router.replace("/");
    } else if (isAuthenticated) {
      router.replace("/(protected)/");
    }
  }, [isAuthenticated]);

  return (
    <Stack>
      <Stack.Screen name="+not-found" options={{ title: "Oops!" }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="signin" options={{ headerShown: false }} />
      <Stack.Screen name="(protected)" />
    </Stack>
  );
}
