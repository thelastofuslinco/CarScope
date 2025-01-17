import "../global.css";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider } from "@/context/AuthContext";
import SignIn from "@/screens/SignIn";
import Home from "@/screens/Home";
import Model from "@/screens/Model";
import { RootStackParamList } from "@/models/RootStackParamList";
import CustomHeader from "@/components/CustomHeader";

const Stack = createStackNavigator<RootStackParamList>();

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{
          header: ({ navigation, route }) => (
            <CustomHeader navigation={navigation} />
          ),
          headerStyle: { backgroundColor: "#3b82f6" },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 24, fontWeight: "bold" },
        }}
      >
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Model" component={Model} />
      </Stack.Navigator>
    </AuthProvider>
  );
}
