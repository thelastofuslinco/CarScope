import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";

export default function Model({ route }: any) {
  const { brandId } = route.params;
  const [models, setModels] = useState<any[]>([]);

  useEffect(() => {
    fetch(
      `https://parallelum.com.br/fipe/api/v1/carros/marcas/${brandId}/modelos`
    )
      .then((res) => res.json())
      .then((data) => setModels(data.modelos));
  }, [brandId]);

  return (
    <ThemedView className="flex-1 bg-gray-100 p-4">
      <ThemedText className="text-2xl font-bold text-center mb-6 text-gray-800">
        Modelos de Carros
      </ThemedText>

      <FlatList
        data={models}
        keyExtractor={(item) => item.codigo}
        renderItem={({ item }) => (
          <TouchableOpacity className="mb-4 bg-white p-4 rounded-lg shadow-md hover:bg-gray-200 transition-all duration-300">
            <View className="flex-row items-center">
              <Image
                source={{
                  uri: "https://www.iconfinder.com/icons/3167079/download/png/512", // exemplo de imagem
                }}
                className="w-10 h-10 rounded-full mr-4"
              />
              <Text className="text-lg font-semibold text-gray-800">
                {item.nome}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </ThemedView>
  );
}
