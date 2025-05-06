import type React from "react"
import { StyleSheet, View, type ViewStyle } from "react-native"

interface CardProps {
  children: React.ReactNode
  style?: ViewStyle
}

function Card({ children, style }: CardProps) {
  return <View style={[styles.card, style]}>{children}</View>
}

const styles = StyleSheet.create({
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
    borderWidth: 1,
    borderColor: "rgba(0, 255, 157, 0.1)",
  },
})

export {Card};