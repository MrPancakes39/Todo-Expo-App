import { Link } from "expo-router";
import { Text } from "react-native";

import { Container } from "~/components/Container";

export default function NotFoundScreen() {
  return (
    <Container>
      <Text className="text-xl font-bold">This screen doesn't exist.</Text>
      <Link replace href="/" className="mt-4 pt-4">
        <Text className="text-base text-[#2e78b7]">Go to home screen!</Text>
      </Link>
    </Container>
  );
}
