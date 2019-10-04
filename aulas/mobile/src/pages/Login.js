import React, { useState, useEffect } from "react";
import {
  View,
  KeyboardAvoidingView /* componente que redimensiona a janela de acordo com a
  visibilidade do teclado */,
  Platform /* componente que detecta o sistema operacional
  e com base nisso, podemos tomar decisoes de layout e acoes */,
  AsyncStorage /* componente para armazenar dados no aplicativo */,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import logo from "../assets/logo.png";
import api from "../services/api";
import GlobalStyles from "../components/GlobalStyles";
//nao existe um componente de form no react-native, cria-se uma view estilizada
//para isso

//Text = label
//TextInput = input
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [techs, setTechs] = useState("");

  useEffect(() => {
    //AsyncStorage.removeItem("user");
    //AsyncStorage.removeItem("techs");
    AsyncStorage.getItem("user").then(user => {
      if (user) {
        navigation.navigate("List");
      }
    });
  }, []);

  async function handleSubmit() {
    const response = await api.post("/sessions", { email });
    const { _id } = response.data;
    //para esperar o salvamento
    await AsyncStorage.setItem("user", _id);
    await AsyncStorage.setItem("techs", techs);
    //move para a janela
    navigation.navigate("List");
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Image source={logo} />
      <View style={styles.form}>
        <Text style={styles.label}>SEU E-MAIL *</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu e-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>TECNOLOGIAS *</Text>
        <TextInput
          style={styles.input}
          placeholder="Tecnologias de interesse"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          onChangeText={setTechs}
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Encontrar spots</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

/*criacao de estilos similar ao css */
/*
diferencas:
  .no css tem propriedades com hifen, no react-native usa-se CamelCase
  margin-bottom vira marginBottom
  .todos os valores das propriedades sao em string, exceto numeros

*/

const styles = StyleSheet.create({
  container: {
    flex: 1 /*ocupa o tamanho da tela */,
    justifyContent: "center",
    alignItems: "center"
  },
  /*nao ha aninhamento de css*/
  form: {
    alignSelf: "stretch",
    paddingHorizontal: 30,
    marginTop: 30
  },
  label: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },
  button: {
    height: 42,
    backgroundColor: "#f05a5b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16
  }
});
