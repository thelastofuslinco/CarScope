import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/models/RootStackParamList";
import type { StackNavigationProp } from "@react-navigation/stack";
import { AuthContext } from "@/context/AuthContext";

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
    <View style={styles.container}>
      <Text>Login</Text>
      <Controller
        control={control}
        name="user"
        rules={{ required: "Username is required" }}
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="User"
              onChangeText={onChange}
              value={value}
            />
            {errors.user && (
              <Text style={styles.errorText}>{errors.user.message}</Text>
            )}
          </>
        )}
      />
      <Controller
        control={control}
        name="password"
        rules={{
          required: "Password is required",
          minLength: {
            value: 3,
            message: "Password must be at least 3 characters",
          },
        }}
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={onChange}
              value={value}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
          </>
        )}
      />
      <Button
        title={isLoading ? "Logging in..." : "Login"}
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 15,
    padding: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
});
