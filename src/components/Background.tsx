import type React from "react"
import { StyleSheet, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

interface BackgroundProps {
  children: React.ReactNode
}

function Background({ children }: BackgroundProps) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0a0a0a", "#121212", "#181818"]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Elementos decorativos */}
        <View style={[styles.circle, styles.circle1]} />
        <View style={[styles.circle, styles.circle2]} />
        <View style={[styles.circle, styles.circle3]} />

        {/* Contenido */}
        <View style={styles.content}>{children}</View>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
  circle: {
    position: "absolute",
    borderRadius: 300,
    opacity: 0.1,
  },
  circle1: {
    backgroundColor: "#00ff9d",
    width: 300,
    height: 300,
    top: -100,
    right: -100,
  },
  circle2: {
    backgroundColor: "#00d68f",
    width: 200,
    height: 200,
    bottom: 100,
    left: -50,
  },
  circle3: {
    backgroundColor: "#00a67d",
    width: 250,
    height: 250,
    bottom: -100,
    right: 50,
  },
})
export { Background };