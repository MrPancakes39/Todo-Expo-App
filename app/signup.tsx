import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { z } from "zod";

import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { FieldInput } from "~/components/FieldInput";
import { useAuth } from "~/lib/auth/useAuth";

function optionalName(name: string) {
  return name.length === 0 || name.length > 2;
}

export const accountSchema = z.object({
  first_name: z
    .string()
    .trim()
    .refine(optionalName, "First name must be at least 2 characters long")
    .transform((name) => (name === "" ? null : name)),
  last_name: z
    .string()
    .trim()
    .refine(optionalName, "Last name must be at least 2 characters long")
    .transform((name) => (name === "" ? null : name)),
  email: z.string().trim().toLowerCase().email("You must enter a valid email address"),
  password: z.string().trim().min(8, "Password must be at least 8 characters long"),
});

type InputValues = z.infer<typeof accountSchema>;

export default function Signup() {
  const { signUp } = useAuth();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputValues, setInputValues] = useState<InputValues>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  function handleInputChange<K extends keyof InputValues>(name: K, value: InputValues[K]) {
    setInputValues((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit() {
    const result = accountSchema.safeParse(inputValues);
    if (!result.success) {
      const message = result.error.issues.map((issue) => `- ${issue.message}`).join("\n");
      Alert.alert("Incorrect credentials", message);
      return;
    }
    const error = await signUp(result.data);
    if (error) {
      Alert.alert("Signup Error", error.message);
      return;
    }
    Alert.alert(
      "Signup",
      "Signup successful!\nPlease check your email for a verification before logging in."
    );
    router.replace("/signin");
  }

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
          <FieldInput
            label="First name"
            placeholder="John"
            className="flex-1"
            inputMode="text"
            onChangeText={(text) => handleInputChange("first_name", text)}
          />
          <FieldInput
            label="Last name"
            placeholder="Doe"
            className="flex-1"
            inputMode="text"
            onChangeText={(text) => handleInputChange("last_name", text)}
          />
        </View>
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
        onPress={() => {
          setIsProcessing(true);
          handleSubmit().then(() => setIsProcessing(false));
        }}
        disabled={isProcessing}>
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
