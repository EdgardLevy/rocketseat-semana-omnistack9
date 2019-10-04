import { StyleSheet, Platform, StatusBar } from "react-native";
//Estilizacao para o SafeAreaView, que soh funciona no iOS
export default StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});
