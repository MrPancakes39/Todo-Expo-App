import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, Text, View } from "react-native";

import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { FieldInput } from "~/components/FieldInput";
import { useAuth } from "~/lib/auth/useAuth";
import { useSupabase } from "~/lib/supabase/useSupabase";

export default function Profile() {
  const { user, signOut } = useAuth();
  const supabase = useSupabase();

  //   Get Profile
  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      if (!user) {
        throw new Error("User not logged in");
      }
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .limit(1)
        .single();
      if (error) {
        throw error;
      }
      return data;
    },
  });

  if (!user) {
    return (
      <Container className="items-center justify-center bg-black">
        <Text className="text-white">You must be logged in to view your profile</Text>
      </Container>
    );
  }

  return (
    <Container className="items-center justify-center bg-black">
      {profileQuery.isLoading ? (
        <ActivityIndicator size="large" color="white" />
      ) : profileQuery.isError ? (
        <Text className="text-white">Error getting profile</Text>
      ) : profileQuery.data ? (
        <>
          <Text className="mb-6 font-inter text-2xl font-bold text-white">View Profile</Text>
          <View className="mb-8 flex w-full flex-col gap-4">
            <View className="flex flex-row items-center justify-center gap-6">
              <FieldInput
                label="First name"
                placeholder=""
                className="flex-1"
                inputMode="text"
                value={profileQuery.data.first_name ?? ""}
                isDisabled
              />
              <FieldInput
                label="Last name"
                placeholder=""
                className="flex-1"
                inputMode="text"
                value={profileQuery.data.last_name ?? ""}
                isDisabled
              />
            </View>
            <FieldInput
              label="Email"
              placeholder=""
              inputMode="email"
              value={user.email ?? ""}
              isDisabled
            />
          </View>
          <Button
            onPress={signOut}
            btnStyle={{
              bg: ["bg-red-400", "bg-red-500"],
              border: ["border-red-700", "border-red-700"],
              text: "text-white",
            }}>
            Log out
          </Button>
        </>
      ) : null}
    </Container>
  );
}
