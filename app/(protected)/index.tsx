import { Text } from "react-native";

import { Container } from "~/components/Container";

export default function Page() {
  return (
    <Container className="bg-black pt-8">
      <Text className="text-center text-2xl font-bold text-white">List of Todos</Text>
    </Container>
  );
}
