import { Link } from "expo-router";
import { Text, View } from "react-native";

import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { FieldInput } from "~/components/FieldInput";

export default function Signup() {
  return (
    <Container className="items-center justify-center bg-black">
      <Text className="font-inter text-center text-2xl font-bold capitalize text-white">
        Create your account
      </Text>
      <Text className="mb-8 text-base text-gray-300">
        Welcome! Please fill in the details to get started.
      </Text>
      <View className="mb-8 flex w-full flex-col gap-4">
        <View className="flex flex-row items-center justify-center gap-4">
          <FieldInput label="First name" placeholder="John" className="flex-1" inputMode="text" />
          <FieldInput label="Last name" placeholder="Doe" className="flex-1" inputMode="text" />
        </View>
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
        Create account ➜
      </Button>
      <View className="mt-4 flex flex-row gap-2">
        <Text className="text-gray-400">Already have an account?</Text>
        <Link href="/signin" className="text-white">
          Login
        </Link>
      </View>
    </Container>
  );
}
