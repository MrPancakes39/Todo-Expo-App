import { Link } from "expo-router";
import { Text } from "react-native";

import { Container } from "~/components/Container";
import { useAuth } from "~/lib/auth/useAuth";

export default function NotFoundScreen() {
  const { isAuthenticated } = useAuth();

  const homeRoute = isAuthenticated ? "/(protected)/" : "/";

  console.log({ homeRoute });

  return (
    <Container>
      <Text className="text-xl font-bold">This screen doesn't exist.</Text>
      <Link replace href={homeRoute} className="mt-4 pt-4">
        <Text className="text-base text-[#2e78b7]">Go to home screen!</Text>
      </Link>
    </Container>
  );
}
