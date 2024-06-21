import { Button as RNButton, View } from "react-native";

import { Button } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";

export default function Home() {
  return (
    <Container>
      <View className="mb-4">
        <RNButton title="Hello 1" />
      </View>
      <Button className="mb-4">Hello 1</Button>
      <Button
        btnColor={{
          bg: ["bg-red-500", "bg-red-600"],
          border: ["border-red-500", "border-red-600"],
          text: "text-red-100",
        }}>
        Hello 2
      </Button>
    </Container>
  );
}
