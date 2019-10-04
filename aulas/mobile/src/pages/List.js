import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  ScrollView,
  AsyncStorage,
  Image,
  StyleSheet
} from "react-native";

import logo from "../assets/logo.png";
//importacao do componente criado para a aplicacao
import SpotList from "../../src/components/SpotList";
import GlobalStyles from "../components/GlobalStyles";

export default function List() {
  const [techs, setTechs] = useState([]);
  //executa uma unica vez, pq n tem dependencias
  useEffect(() => {
    AsyncStorage.getItem("techs").then(storagedTechs => {
      if (!storagedTechs) return;
      const techsArray = storagedTechs.split(",").map(tech => tech.trim());
      setTechs(techsArray);
    });
  }, []);

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Image style={styles.logo} source={logo} />
      <ScrollView>
        {techs.map(tech => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

//o estilo eh criado fora da funcao
const styles = StyleSheet.create({
  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 10
  }
});
