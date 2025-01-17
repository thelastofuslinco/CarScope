import { ThemedView } from "@/components/ThemedView";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Animated } from "react-native";

export default function Model({ route }: any) {
  const { brandId } = route.params;
  const [models, setModels] = useState<any[]>([]);

  const [scaleValues, setScaleValues] = useState<{
    [key: string]: Animated.Value;
  }>({});

  const handlePressIn = (itemId: string) => {
    const newScaleValues = { ...scaleValues };
    newScaleValues[itemId] = new Animated.Value(1);

    Animated.spring(newScaleValues[itemId], {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();

    setScaleValues(newScaleValues);
  };

  const handlePressOut = (itemId: string) => {
    Animated.spring(scaleValues[itemId], {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fetch(
      `https://parallelum.com.br/fipe/api/v1/carros/marcas/${brandId}/modelos`
    )
      .then((res) => res.json())
      .then((data) => setModels(data.modelos));
  }, [brandId]);

  return (
    <ThemedView className="flex-1 bg-gray-100 p-4">
      <FlatList
        data={models}
        keyExtractor={(item) => item.codigo}
        renderItem={({ item }) => {
          if (!scaleValues[item.codigo]) {
            scaleValues[item.codigo] = new Animated.Value(1);
          }

          return (
            <Animated.View
              style={{
                transform: [{ scale: scaleValues[item.codigo] }],
              }}
            >
              <TouchableOpacity
                className="mb-4 bg-white p-4 rounded-lg shadow-md"
                onPressIn={() => handlePressIn(item.codigo)}
                onPressOut={() => handlePressOut(item.codigo)}
                activeOpacity={0.7}
              >
                <View className="flex-row items-center">
                  <Text className="text-lg font-semibold text-gray-800">
                    {item.nome}
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          );
        }}
      />
    </ThemedView>
  );
}
