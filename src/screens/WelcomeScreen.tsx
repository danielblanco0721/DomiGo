import { StyleSheet, View, Text, Alert } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { supabase } from "../lib/supabase"
import {Background} from "../components/Background"
import {Card} from "../components/Card"
import {Button} from "../components/Button"

function WelcomeScreen() {
  const navigation = useNavigation()
  const route = useRoute()
  const { userName } = route.params as { userName: string }

  // Cerrar sesión
  async function signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error: any) {
      Alert.alert("Error", error.message)
    }
  }

  return (
    <Background>
      <View style={styles.container}>
        <Card style={styles.card}>
          <View style={styles.content}>
            <Text style={styles.welcomeText}>¡Bienvenido!</Text>
            <Text style={styles.userName}>{userName}</Text>

            <View style={styles.divider} />

            <Text style={styles.message}>Has iniciado sesión correctamente en DomiApp.</Text>
            <Text style={styles.submessage}>
              Ahora puedes comenzar a utilizar todas las funciones de la aplicación.
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Continuar"
              onPress={() => {
                // Navegar a la pantalla principal
                Alert.alert("Próximamente", "Esta función estará disponible en la próxima actualización")
              }}
            />

            <Button title="Cerrar Sesión" onPress={signOut} variant="secondary" style={styles.logoutButton} />
          </View>
        </Card>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    maxWidth: 400,
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    width: "100%",
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#00ff9d",
    marginBottom: 8,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    width: "80%",
    marginVertical: 24,
  },
  message: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 8,
  },
  submessage: {
    fontSize: 14,
    color: "#aaaaaa",
    textAlign: "center",
    marginBottom: 32,
  },
  buttonContainer: {
    width: "100%",
  },
  logoutButton: {
    marginTop: 8,
  },
})
export { WelcomeScreen };