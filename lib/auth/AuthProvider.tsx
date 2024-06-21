import type { AuthError, Session } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";
import { AppState, Text } from "react-native";

import { supabase } from "../supabase/supabase";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

// Auth Context Types
type SignUpProps = {
  first_name: string | null;
  last_name: string | null;
  email: string;
  password: string;
};

type SignInProps = {
  email: string;
  password: string;
};

export type AuthContextType = {
  session: Session | null;
  user: Session["user"] | null;
  isAuthenticated: boolean;
  signUp: (props: SignUpProps) => Promise<AuthError | null>;
  signIn: (props: SignInProps) => Promise<AuthError | null>;
  signOut: () => Promise<AuthError | null>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isAuthenticated: false,
  signUp: async () => null,
  signIn: async () => null,
  signOut: async () => null,
});

type AuthProviderProps = {
  fallback?: React.ReactNode;
  children: React.ReactNode;
};

export function AuthProvider({ fallback, children }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<Session["user"] | null>(null);

  const authQuery = useQuery({
    queryKey: ["auth", "session", "user"],
    queryFn: async () => {
      const sessionResult = await supabase.auth.getSession();
      if (sessionResult.error) {
        throw sessionResult.error;
      }

      const { session } = sessionResult.data;
      if (session === null) {
        return null;
      }

      const userResult = await supabase.auth.getUser();
      if (userResult.error) {
        throw userResult.error;
      }
      const { user } = userResult.data;

      return { session, user };
    },
  });

  useEffect(() => {
    if (authQuery.data) {
      setSession(authQuery.data.session);
      setUser(authQuery.data.user);
    } else {
      setSession(null);
      setUser(null);
    }
  }, [authQuery.data]);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setSession(session);
        setUser(session.user);
      } else {
        setSession(null);
        setUser(null);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (authQuery.isLoading) {
    if (fallback) {
      return fallback;
    }
    return <Text>Loading...</Text>;
  }

  if (authQuery.isError) {
    return <Text>AuthError: {authQuery.error.message}</Text>;
  }

  //   ========================================================================
  async function signUp({ first_name, last_name, email, password }: SignUpProps) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name,
          last_name,
        },
      },
    });
    if (error) {
      return error;
    }
    return null;
  }

  async function signIn({ email, password }: SignInProps) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return error;
    }
    return null;
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return error;
    }
    return null;
  }
  //   ========================================================================

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        isAuthenticated: !!user,
        signUp,
        signIn,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
