import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";

export default function ProtectedLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveBackgroundColor: "#18181b",
        tabBarActiveBackgroundColor: "#27272a",
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
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ color }) => <Feather name="user" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
