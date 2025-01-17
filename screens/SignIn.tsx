import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/models/RootStackParamList";
import type { StackNavigationProp } from "@react-navigation/stack";
import { AuthContext } from "@/context/AuthContext";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedInput } from "@/components/ThemedInput";

type SignInScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SignIn"
>;

interface LoginFormInputs {
  user: string;
  password: string;
}

export default function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const authContext = useContext(AuthContext);
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: LoginFormInputs) => {
    setIsLoading(true);
    try {
      await authContext?.login(data.user, data.password);
      navigation.navigate("Home");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedView className="flex-1 p-5 justify-center bg-gray-100">
      <ThemedText type="title">Welcome!</ThemedText>

      <ThemedInput
        control={control}
        name="user"
        rules={{ required: "Username is required" }}
        placeholder="User"
        errors={errors.user}
      />

      <ThemedInput
        control={control}
        name="password"
        rules={{
          required: "Password is required",
          minLength: {
            value: 3,
            message: "Password must be at least 3 characters",
          },
        }}
        placeholder="Password"
        errors={errors.password}
      />

      <TouchableOpacity
        className={`w-full bg-blue-500 py-3 rounded-lg mt-4 ${
          isLoading ? "opacity-70" : "opacity-100"
        }`}
        disabled={isLoading}
        onPress={handleSubmit(onSubmit)}
      >
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Text className="text-center text-white text-lg font-semibold">
            Login
          </Text>
        )}
      </TouchableOpacity>
    </ThemedView>
  );
}
