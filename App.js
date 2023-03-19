import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./pages/HomePage";
import SettingPage from "./pages/SettingPage";
import NewChat from "./pages/NewChat";
import ChatPage from "./pages/ChatPage";

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#2C6BED" },
  headerTitleStyle: { color: "white" },
  headerTintColor: "white",
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginPage}
        />
        <Stack.Screen
          name="Register"
          options={{
            title: "Register & Start Chatting",
            headerBackTitle: "Back",
          }}
          component={RegisterPage}
        />
        <Stack.Screen name="Home" options={{}} component={HomePage} />
        <Stack.Screen name="Setting" options={{}} component={SettingPage} />
        <Stack.Screen name="NewChat" options={{}} component={NewChat} />
        <Stack.Screen name="Chat" options={{}} component={ChatPage} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
