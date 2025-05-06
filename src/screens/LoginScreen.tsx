"use client"

import { useState } from "react"
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { supabase } from "../utils/supabase"
import {Background} from "../components/Background"
import {Card} from "../components/Card"
import {Input} from "../components/Input"
import {Button} from "../components/Button"

function LoginScreen() {
  const navigation = useNavigation()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  // Validar formulario
  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}

    if (!email) {
      newErrors.email = "El correo electrónico es obligatorio"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Correo electrónico inválido"
    }

    if (!password) {
      newErrors.password = "La contraseña es obligatoria"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Iniciar sesión
  async function signInWithEmail() {
    if (!validateForm()) return

    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
    } catch (error: any) {
      Alert.alert("Error al iniciar sesión", error.message || "Verifica tus credenciales e intenta nuevamente")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Background>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <Card>
            <View style={styles.logoContainer}>
              <Text style={styles.logo}>DomiApp</Text>
              <Text style={styles.subtitle}>Iniciar Sesión</Text>
            </View>

            <Input
              label="Correo electrónico"
              placeholder="Ingresa tu correo"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              error={errors.email}
              autoComplete="email"
            />

            <Input
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              error={errors.password}
              autoComplete="password"
            />

            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={() => {
                // Implementar recuperación de contraseña
                Alert.alert("Recuperar contraseña", "Se enviará un enlace a tu correo para restablecer tu contraseña")
              }}
            >
              <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            <Button title="Iniciar Sesión" onPress={signInWithEmail} loading={loading} style={styles.loginButton} />

            <Button title="Registrarse" onPress={() => navigation.navigate("Register" as never)} variant="secondary" />
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#00ff9d",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#ffffff",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 16,
  },
  forgotPasswordText: {
    color: "#00ff9d",
    fontSize: 14,
  },
  loginButton: {
    marginTop: 8,
  },
})

export { LoginScreen };