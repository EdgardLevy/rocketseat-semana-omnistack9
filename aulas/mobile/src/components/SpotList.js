import React, { useState, useEffect } from "react";
import { withNavigation } from "react-navigation";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from "react-native";

import api from "../services/api";

//passagem de propriedades para o componente pode-se utilizar a desestruturacao
//poderia ser export default function SpotList(props) {

//ao utilizar o withNavigation, o export fica abaixo encapsulando o componente

//de export default function SpotList({ tech }) {
//para
function SpotList({ tech, navigation }) {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    async function loadSpots() {
      const response = await api.get("/spots", {
        params: {
          tech
        }
      });
      console.log(response.data);
      setSpots(response.data);
    }
    loadSpots();
  }, []);

  //como o spotlist n eh uma pagina, ele n tem a propriedade navigation
  //porem podemos utilizar o 'withNavigation' do react-navigation para
  //habilitar a navegacao em um componente que n eh uma pagina

  function handleNavigate(id) {
    navigation.navigate("Book", { id });
  }
  // se a tech n tiver spots vinculados entao n exibe nada ;-)
  if (spots.length === 0) {
    // return (
    //   <View style={styles.container}>
    //     <Text style={styles.title}>
    //       Nenhuma empresa usa <Text style={styles.bold}>{tech}</Text>
    //     </Text>
    //   </View>
    // );
    return <View />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Empresas que usam <Text style={styles.bold}>{tech}</Text>
      </Text>

      <FlatList
        style={styles.list}
        data={spots}
        keyExtractor={spot => spot._id}
        horizontal
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image
              style={styles.thumbnail}
              source={{ uri: item.thumbnail_url }}
            />
            <Text style={styles.company}>{item.company}</Text>
            <Text style={styles.price}>
              {item.price ? `R$${item.price}/dia` : "GRATUITO"}
            </Text>
            <TouchableOpacity
              onPress={() => handleNavigate(item._id)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30
  },
  title: {
    fontSize: 20,
    color: "#444",
    paddingHorizontal: 20,
    marginBottom: 15
  },
  bold: {
    fontWeight: "bold"
  },
  list: {
    paddingHorizontal: 20
  },
  listItem: {
    marginRight: 15
  },
  thumbnail: {
    width: 200,
    height: 120,
    resizeMode: "cover",
    borderRadius: 2
  },
  company: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10
  },
  price: {
    fontSize: 15,
    color: `#999`,
    marginTop: 5
  },
  button: {
    height: 32,
    backgroundColor: "#f05a5b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    marginTop: 15
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 15
  }
});

export default withNavigation(SpotList);
