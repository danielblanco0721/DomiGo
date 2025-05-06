"use client"
import { StyleSheet, View, Text, type ViewStyle } from "react-native"
import { Picker } from "@react-native-picker/picker"

interface SelectOption {
  label: string
  value: string
}

interface SelectProps {
  label: string
  value: string
  onValueChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  error?: string
  containerStyle?: ViewStyle
}

function Select({
  label,
  value,
  onValueChange,
  options,
  placeholder = "Seleccionar",
  error,
  containerStyle,
}: SelectProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.pickerContainer, error && styles.pickerError]}>
        <Picker selectedValue={value} onValueChange={onValueChange} style={styles.picker} dropdownIconColor="#00ff9d">
          <Picker.Item label={placeholder} value="" color="#666" />
          {options.map((option) => (
            <Picker.Item key={option.value} label={option.label} value={option.value} color="#fff" />
          ))}
        </Picker>
      </View>
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
    height: 50,
  },
  pickerError: {
    borderColor: "#ff4d4f",
  },
  errorText: {
    color: "#ff4d4f",
    fontSize: 12,
    marginTop: 4,
  },
})

export {Select};