import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from "react-native"
//base de datos
import { supabase } from "../utils/supabase"
//#####
interface WelcomeScreenProps {
  route: {
    params: {
      userName: string
    }
  }
  navigation: any
}

function WelcomeScreen({ route, navigation }: WelcomeScreenProps) {
  const { userName } = route.params

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      navigation.navigate("Login")
    }
  }

  return (
    <ImageBackground source={require("../assets/background.png")} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>¡Bienvenido!</Text>
          <Text style={styles.userName}>{userName}</Text>

          <Text style={styles.message}>Has iniciado sesión correctamente en DomiApp.</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              /* Navegar a la pantalla principal */
            }}
          >
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={signOut}>
            <Text style={styles.secondaryButtonText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "rgba(18, 18, 18, 0.9)",
    borderRadius: 12,
    padding: 24,
    shadowColor: "#00ff9d",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#00ff9d",
    textAlign: "center",
    marginBottom: 8,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 24,
  },
  message: {
    fontSize: 16,
    color: "#cccccc",
    textAlign: "center",
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#00ff9d",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#121212",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "#00ff9d",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 12,
    width: "100%",
  },
  secondaryButtonText: {
    color: "#00ff9d",
    fontSize: 16,
    fontWeight: "bold",
  },
})
export {WelcomeScreen};