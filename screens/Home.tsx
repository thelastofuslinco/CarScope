import React, { useEffect, useState, useContext } from "react";
import { FlatList, Button } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { ThemedView } from "@/components/ThemedView";

export default function Home({ navigation }: any) {
  const [brands, setBrands] = useState([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetch("https://parallelum.com.br/fipe/api/v1/carros/marcas")
      .then((res) => res.json())
      .then((data) => setBrands(data));
  }, []);

  return (
    <ThemedView>
      <FlatList
        data={brands}
        keyExtractor={(item) => item.codigo}
        renderItem={({ item }) => (
          <Button
            title={item.nome}
            onPress={() =>
              navigation.navigate("Model", { brandId: item.codigo })
            }
          />
        )}
      />
      <Button title="Logout" onPress={authContext?.logout} />
    </ThemedView>
  );
}
