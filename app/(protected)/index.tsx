import { Text } from "react-native";

import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { useAuth } from "~/lib/auth/useAuth";

export default function TodoPage() {
  const { signOut } = useAuth();

  return (
    <Container className="items-center justify-center">
      <Text className="text-bold mb-4 text-center text-2xl">You are logged in</Text>
      <Button
        btnStyle={{
          bg: ["bg-red-400", "bg-red-500"],
          border: ["border-red-700", "border-red-700"],
          text: "text-white",
        }}
        onPress={signOut}>
        Sign Out
      </Button>
    </Container>
  );
}
