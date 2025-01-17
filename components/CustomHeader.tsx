import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function CustomHeader({ navigation }: any) {
  return (
    <View className="bg-blue-600 p-4 flex-row items-center">
      <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
        <Icon name="arrow-left" size={30} color="white" />
      </TouchableOpacity>
      <Text className="text-white text-2xl font-bold flex-1 text-center">
        Modelos de Carros
      </Text>
    </View>
  );
}
