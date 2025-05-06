import { StyleSheet, View, Text, TextInput, type TextInputProps, type ViewStyle } from "react-native"

interface InputProps extends TextInputProps {
  label: string
  error?: string
  containerStyle?: ViewStyle
}

function Input({ label, error, containerStyle, ...props }: InputProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholderTextColor="#666"
        autoCapitalize="none"
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#00ff9d",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#222",
    borderRadius: 8,
    padding: 12,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#333",
    fontSize: 16,
  },
  inputError: {
    borderColor: "#ff4d4f",
  },
  errorText: {
    color: "#ff4d4f",
    fontSize: 12,
    marginTop: 4,
  },
})
export { Input };