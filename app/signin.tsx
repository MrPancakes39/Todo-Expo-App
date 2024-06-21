import { Link } from "expo-router";
import { View, Text } from "react-native";

import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { FieldInput } from "~/components/FieldInput";

export default function SignIn() {
  return (
    <Container className="items-center justify-center bg-black">
      <Text className="font-inter text-center text-2xl font-bold capitalize text-white">
        Login to your account
      </Text>
      <Text className="mb-8 text-base text-gray-300">Welcome back! Please login to continue</Text>
      <View className="mb-8 flex w-full flex-col gap-4">
        <FieldInput label="Email" placeholder="john@doe.com" inputMode="email" isRequired />
        <FieldInput
          label="Password"
          placeholder="********"
          secureTextEntry
          inputMode="text"
          isRequired
        />
      </View>
      <Button className="w-full" btnStyle={{ text: "font-bold" }}>
        Continue ➜
      </Button>
      <View className="mt-4 flex flex-row gap-2">
        <Text className="text-gray-400">Don't have an account?</Text>
        <Link href="/signup" className="text-white">
          Sign up
        </Link>
      </View>
    </Container>
  );
}
