import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#14354A",
        tabBarInactiveTintColor: "#7B92A1",
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10
        }
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Inicio" }} />
      <Tabs.Screen name="materials" options={{ title: "Materiales" }} />
      <Tabs.Screen name="teacher" options={{ title: "Docente" }} />
      <Tabs.Screen name="settings" options={{ title: "Ajustes" }} />
    </Tabs>
  );
}
