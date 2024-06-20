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
      <Button intent="primary">Hello 2</Button>
    </Container>
  );
}
