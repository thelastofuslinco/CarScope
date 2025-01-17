import React from "react";
import { TextInput, Text, View } from "react-native";
import { Controller } from "react-hook-form";
import { useThemeColor } from "@/hooks/useThemeColor";

type ThemedInputProps = {
  control: any;
  name: string;
  rules?: object;
  placeholder: string;
  errors?: any;
  lightColor?: string;
  darkColor?: string;
};

export function ThemedInput({
  control,
  name,
  rules,
  placeholder,
  errors,
  lightColor,
  darkColor,
}: Readonly<ThemedInputProps>) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <View className="w-full mb-4">
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              className={`text-[#${color}] border-b border-gray-400 p-3 text-base text-gray-800 rounded-lg`}
              placeholder={placeholder}
              onChangeText={onChange}
              value={value}
              placeholderTextColor="#A0AEC0"
            />
            {errors?.[name] && (
              <Text className="text-[#ff0000] text-sm mt-1">
                {errors[name]?.message}
              </Text>
            )}
          </>
        )}
      />
    </View>
  );
}
