import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";

export default function Model({ route }: any) {
  const { brandId } = route.params;
  const [models, setModels] = useState([]);

  useEffect(() => {
    fetch(
      `https://parallelum.com.br/fipe/api/v1/carros/marcas/${brandId}/modelos`
    )
      .then((res) => res.json())
      .then((data) => setModels(data.modelos));
  }, [brandId]);

  return (
    <View>
      <FlatList
        data={models}
        keyExtractor={(item) => item.codigo}
        renderItem={({ item }) => <Text>{item.nome}</Text>}
      />
    </View>
  );
}
