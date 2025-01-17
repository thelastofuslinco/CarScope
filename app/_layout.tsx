import "../global.css";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider } from "@/context/AuthContext";
import SignIn from "@/screens/SignIn";
import Home from "@/screens/Home";
import Model from "@/screens/Model";
import { RootStackParamList } from "@/models/RootStackParamList";

const Stack = createStackNavigator<RootStackParamList>();

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Model" component={Model} />
      </Stack.Navigator>
    </AuthProvider>
  );
}
