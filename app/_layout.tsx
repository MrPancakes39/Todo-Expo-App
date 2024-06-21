import "../global.css";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
        <GestureHandlerRootView>
          <BottomSheetModalProvider>
            <StackLayout />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </AuthProvider>
    </QueryClientProvider>
  );
}

function StackLayout() {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const isAuthGroup = segments[0] === "(protected)";
    // clear the history stack
    if (router.canDismiss()) {
      router.dismissAll();
    }
    // Go to the protected route if the user is authenticated
    if (!isAuthenticated && isAuthGroup) {
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
      <Stack.Screen name="(protected)" options={{ headerShown: false }} />
    </Stack>
  );
}
