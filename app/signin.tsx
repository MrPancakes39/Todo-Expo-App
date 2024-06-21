import { Link } from "expo-router";
import { useState } from "react";
import { View, Text, Alert } from "react-native";
import { z } from "zod";

import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { FieldInput } from "~/components/FieldInput";
import { useAuth } from "~/lib/auth/useAuth";

import { accountSchema } from "./signup";

const loginSchema = accountSchema.pick({ email: true, password: true });

type InputValues = z.infer<typeof loginSchema>;

export default function SignIn() {
  const { signIn } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputValues, setInputValues] = useState<InputValues>({
    email: "",
    password: "",
  });

  function handleInputChange<K extends keyof InputValues>(name: K, value: InputValues[K]) {
    setInputValues((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit() {
    const result = loginSchema.safeParse(inputValues);
    if (!result.success) {
      const message = result.error.issues.map((issue) => `- ${issue.message}`).join("\n");
      Alert.alert("Incorrect credentials", message);
      return;
    }
    const error = await signIn(result.data);
    if (error) {
      Alert.alert("Login Error", error.message);
    }
  }

  return (
    <Container className="items-center justify-center bg-black">
      <Text className="font-inter text-center text-2xl font-bold capitalize text-white">
        Login to your account
      </Text>
      <Text className="mb-8 text-base text-gray-300">Welcome back! Please login to continue</Text>
      <View className="mb-8 flex w-full flex-col gap-4">
        <FieldInput
          label="Email"
          placeholder="john@doe.com"
          inputMode="email"
          isRequired
          onChangeText={(text) => handleInputChange("email", text)}
        />
        <FieldInput
          label="Password"
          placeholder="********"
          secureTextEntry
          inputMode="text"
          isRequired
          onChangeText={(text) => handleInputChange("password", text)}
        />
      </View>
      <Button
        className="w-full"
        btnStyle={{ text: "font-bold" }}
        disabled={isProcessing}
        onPress={() => {
          setIsProcessing(true);
          handleSubmit().then(() => setIsProcessing(false));
        }}>
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
