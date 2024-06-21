import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";

export default function ProtectedLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarActiveBackgroundColor: "#18181b",
        tabBarIconStyle: {
          marginTop: 5,
        },
        tabBarLabelStyle: {
          marginBottom: 5,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Todos",
          tabBarIcon: ({ color }) => <Feather name="edit-3" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
