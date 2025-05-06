"use client"

import { useState } from "react"
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native"
import { Picker } from "@react-native-picker/picker"
import { supabase } from "../utils/supabase"

interface RegisterScreenProps {
  navigation: any
}

function RegisterScreen({ navigation }: RegisterScreenProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [city, setCity] = useState("")
  const [userType, setUserType] = useState("DomiCliente")
  const [loading, setLoading] = useState(false)

  const colombianCities = [
    "Bogotá",
    "Medellín",
    "Cali",
    "Barranquilla",
    "Cartagena",
    "Cúcuta",
    "Bucaramanga",
    "Pereira",
    "Santa Marta",
    "Ibagué",
    "Pasto",
    "Manizales",
    "Neiva",
    "Villavicencio",
    "Armenia",
  ]

  async function signUpWithEmail() {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden")
      return
    }

    setLoading(true)
    try {
      // Registrar usuario en Supabase Auth
      const {
        data: { user },
        error,
      } = await supabase.auth.signUp({
        email: email,
        password: password,
      })

      if (error) throw error

      if (user) {
        // Guardar información adicional en la tabla profiles
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: user.id,
            name,
            email,
            phone,
            city,
            user_type: userType,
          },
        ])

        if (profileError) throw profileError

        Alert.alert("Registro exitoso", "Por favor verifica tu correo electrónico para activar tu cuenta", [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login"),
          },
        ])
      }
    } catch (error: any) {
      Alert.alert("Error", error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ImageBackground source={require("../assets/background.png")} style={styles.backgroundImage}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.card}>
            <Text style={styles.title}>DomiApp</Text>
            <Text style={styles.subtitle}>Registro</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nombre completo</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingresa tu nombre"
                placeholderTextColor="#666"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Correo electrónico</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingresa tu correo"
                placeholderTextColor="#666"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Número telefónico</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingresa tu número"
                placeholderTextColor="#666"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Contraseña</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingresa tu contraseña"
                placeholderTextColor="#666"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Repetir contraseña</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirma tu contraseña"
                placeholderTextColor="#666"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Ciudad</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={city}
                  onValueChange={(itemValue) => setCity(itemValue)}
                  style={styles.picker}
                  dropdownIconColor="#00ff9d"
                >
                  <Picker.Item label="Selecciona tu ciudad" value="" color="#666" />
                  {colombianCities.map((city) => (
                    <Picker.Item key={city} label={city} value={city} color="#fff" />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Tipo de usuario</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={userType}
                  onValueChange={(itemValue) => setUserType(itemValue)}
                  style={styles.picker}
                  dropdownIconColor="#00ff9d"
                >
                  <Picker.Item label="DomiCliente" value="DomiCliente" color="#fff" />
                  <Picker.Item label="DomiGo" value="DomiGo" color="#fff" />
                  <Picker.Item label="Establecimiento/comercio" value="Establecimiento" color="#fff" />
                </Picker>
              </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={signUpWithEmail} disabled={loading}>
              <Text style={styles.buttonText}>{loading ? "Cargando..." : "Registrarse"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate("Login")}>
              <Text style={styles.secondaryButtonText}>Volver</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "rgba(18, 18, 18, 0.9)",
    borderRadius: 12,
    padding: 24,
    shadowColor: "#00ff9d",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#00ff9d",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#00ff9d",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#222",
    borderRadius: 8,
    padding: 12,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#333",
  },
  pickerContainer: {
    backgroundColor: "#222",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333",
    overflow: "hidden",
  },
  picker: {
    color: "#fff",
    backgroundColor: "transparent",
  },
  button: {
    backgroundColor: "#00ff9d",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
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
  },
  secondaryButtonText: {
    color: "#00ff9d",
    fontSize: 16,
    fontWeight: "bold",
  },
})
export { RegisterScreen };