import { StyleSheet, View, ActivityIndicator, Text } from "react-native"
import {Background} from "../components/Background";

function LoadingScreen() {
  return (
  
    <Background>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00ff9d" />
        <Text style={styles.text}>Cargando...</Text>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    marginTop: 16,
    fontSize: 16,
  },
})
export { LoadingScreen }; 