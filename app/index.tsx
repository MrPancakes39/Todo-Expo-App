import { Link } from "expo-router";
import { Image, Text, View } from "react-native";

import { Button } from "~/components/Button";
import { Container } from "~/components/Container";

export default function Home() {
  return (
    <Container className="bg-black">
      <View className="flex flex-1 items-center justify-center">
        <Image source={require("~/assets/org.gnome.Todo.png")} className="mb-4 h-[96] w-[72]" />
        <Text className="font-inter mb-6 text-2xl font-bold text-white">To-Do List App!</Text>
        <Text className="text-md font-inter text-center font-medium text-gray-400">
          This is a simple todo list app built with Expo as a demo for what you can do with React
          Native. It implements Auth with Supabase, uses Expo Router for navigation, uses Tailwind
          CSS for styling, and uses Supabase as a postgres database for storing the todo items.
        </Text>
      </View>
      <View className="flex flex-row gap-10 px-8">
        <Link href="/signin" asChild>
          <Button className="flex-1">Login</Button>
        </Link>
        <Link href="/signup" asChild>
          <Button className="flex-1">Signup</Button>
        </Link>
      </View>
    </Container>
  );
}
