"use client"

import { useState } from "react"
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform, Alert, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { supabase } from "../lib/supabase"
import {Background} from "../components/Background"
import Card from "../components/Card"
import Input from "../components/Input"
import Button from "../components/Button"
import Select from "../components/Select"

function RegisterScreen() {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)

  // Datos del formulario
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    city: "",
    userType: "",
  })

  // Errores de validación
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Actualizar campo del formulario
  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })

    // Limpiar error al editar
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" })
    }
  }

  // Ciudades de Colombia
  const colombianCities = [
    { label: "Bogotá", value: "Bogotá" },
    { label: "Medellín", value: "Medellín" },
    { label: "Cali", value: "Cali" },
    { label: "Barranquilla", value: "Barranquilla" },
    { label: "Cartagena", value: "Cartagena" },
    { label: "Cúcuta", value: "Cúcuta" },
    { label: "Bucaramanga", value: "Bucaramanga" },
    { label: "Pereira", value: "Pereira" },
    { label: "Santa Marta", value: "Santa Marta" },
    { label: "Ibagué", value: "Ibagué" },
    { label: "Pasto", value: "Pasto" },
    { label: "Manizales", value: "Manizales" },
    { label: "Neiva", value: "Neiva" },
    { label: "Villavicencio", value: "Villavicencio" },
    { label: "Armenia", value: "Armenia" },
  ]

  // Tipos de usuario
  const userTypes = [
    { label: "DomiCliente", value: "DomiCliente" },
    { label: "DomiGo", value: "DomiGo" },
    { label: "Establecimiento/comercio", value: "Establecimiento" },
  ]

  // Validar formulario
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Validar nombre
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio"
    }

    // Validar email
    if (!formData.email) {
      newErrors.email = "El correo electrónico es obligatorio"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Correo electrónico inválido"
    }

    // Validar teléfono
    if (!formData.phone) {
      newErrors.phone = "El número telefónico es obligatorio"
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Número telefónico inválido (10 dígitos)"
    }

    // Validar contraseña
    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria"
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres"
    }

    // Validar confirmación de contraseña
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden"
    }

    // Validar ciudad
    if (!formData.city) {
      newErrors.city = "Selecciona una ciudad"
    }

    // Validar tipo de usuario
    if (!formData.userType) {
      newErrors.userType = "Selecciona un tipo de usuario"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Registrar usuario
  async function signUpWithEmail() {
    if (!validateForm()) return

    setLoading(true)
    try {
      // Registrar usuario en Supabase Auth
      const {
        data: { user },
        error,
      } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      })

      if (error) throw error

      if (user) {
        // Guardar información adicional en la tabla profiles
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: user.id,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            city: formData.city,
            user_type: formData.userType,
          },
        ])

        if (profileError) throw profileError

        Alert.alert("Registro exitoso", "Por favor verifica tu correo electrónico para activar tu cuenta", [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login" as never),
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
    <Background>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <Card>
            <View style={styles.headerContainer}>
              <Text style={styles.logo}>DomiApp</Text>
              <Text style={styles.subtitle}>Registro</Text>
            </View>

            <Input
              label="Nombre completo"
              placeholder="Ingresa tu nombre"
              value={formData.name}
              onChangeText={(text) => updateField("name", text)}
              error={errors.name}
              autoComplete="name"
            />

            <Input
              label="Correo electrónico"
              placeholder="Ingresa tu correo"
              value={formData.email}
              onChangeText={(text) => updateField("email", text)}
              keyboardType="email-address"
              error={errors.email}
              autoComplete="email"
            />

            <Input
              label="Número telefónico"
              placeholder="Ingresa tu número"
              value={formData.phone}
              onChangeText={(text) => updateField("phone", text)}
              keyboardType="phone-pad"
              error={errors.phone}
              autoComplete="tel"
            />

            <Input
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
              value={formData.password}
              onChangeText={(text) => updateField("password", text)}
              secureTextEntry
              error={errors.password}
              autoComplete="password-new"
            />

            <Input
              label="Repetir contraseña"
              placeholder="Confirma tu contraseña"
              value={formData.confirmPassword}
              onChangeText={(text) => updateField("confirmPassword", text)}
              secureTextEntry
              error={errors.confirmPassword}
              autoComplete="password-new"
            />

            <Select
              label="Ciudad"
              value={formData.city}
              onValueChange={(value) => updateField("city", value)}
              options={colombianCities}
              placeholder="Selecciona tu ciudad"
              error={errors.city}
            />

            <Select
              label="Tipo de usuario"
              value={formData.userType}
              onValueChange={(value) => updateField("userType", value)}
              options={userTypes}
              placeholder="Selecciona tipo de usuario"
              error={errors.userType}
            />

            <Button title="Registrarse" onPress={signUpWithEmail} loading={loading} style={styles.registerButton} />

            <Button title="Volver" onPress={() => navigation.navigate("Login" as never)} variant="secondary" />
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
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  headerContainer: {
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
  registerButton: {
    marginTop: 8,
  },
})
export { RegisterScreen }