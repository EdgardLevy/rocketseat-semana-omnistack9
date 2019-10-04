import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Alert,
  Text,
  ScrollView,
  AsyncStorage,
  Image,
  StyleSheet
} from "react-native";
import socketio from "socket.io-client";

import logo from "../assets/logo.png";
//importacao do componente criado para a aplicacao
import SpotList from "../../src/components/SpotList";
import GlobalStyles from "../components/GlobalStyles";

export default function List() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("user").then(user_id => {
      const socket = socketio("http://192.168.1.5:3333", {
        query: { user_id }
      });

      socket.on("booking_response", booking => {
        Alert.alert(
          `Sua reserva em ${booking.spot.company} em ${booking.date} foi ${
            booking.approved ? "APROVADA" : "REJEITADA"
          }`
        );
      });
    });
  }, []);

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
