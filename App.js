import { useState, useEffect } from "react"
import { StatusBar } from "expo-status-bar"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import type { Session } from "@supabase/supabase-js"
import { supabase } from "./lib/supabase"

// Importar pantallas
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import WelcomeScreen from "./screens/WelcomeScreen"
import LoadingScreen from "./screens/LoadingScreen"

const userID = [userName, setUserName]= useState<string | null>(null)
const Stack = createNativeStackNavigator()

function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState<string | null>(null)

  useEffect(() => {
    // Verificar si hay una sesión activa
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)

      // Si hay una sesión, obtener el nombre del usuario
      if (session) {
        getUserProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })
  
  // Escuchar cambios en el estado de autenticación
  const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
    setSession(session)

    if (session) {
      await getUserProfile(session.user.id)
    } else {
      setUserName(null)
      setLoading(false)
    }
  })

  return () => {
    authListener.subscription.unsubscribe()
  }
}, [])

// Función para obtener el perfil del usuario
async function getUserProfile(userId) {
  try {
    const { data, error } = await supabase.from("profiles").select("name").eq("id", userId).single()

    if (error) {
      throw error
    }

    if (data) {
      setUserName(data.name)
    }
  } catch (error) {
    console.error("Error al obtener el perfil:", error)
  } finally {
    setLoading(false)
  }
}
  // Mostrar pantalla de carga mientras se verifica la sesión
  if (loading) {
    return <LoadingScreen />
  }
return (
    <>
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#121212" },
          animation: "fade_from_bottom",
        }}
      >
        {session && session.user ? (
          // Rutas para usuarios autenticados
          <Stack.Screen name="Welcome" component={WelcomeScreen} initialParams={{ userName: userName || "Usuario" }} />
        ) : (
          // Rutas para usuarios no autenticados
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {App};