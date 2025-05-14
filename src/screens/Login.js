import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Static credentials
    const validEmail = '1';
    const validPassword = '1';

    if (email === validEmail && password === validPassword) {
      navigation.replace('Home'); // Using replace to prevent going back to login
    } else {
      Alert.alert('Error', 'Credenciales inválidas');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
            
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#666"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#666"
      />
      
      <TouchableOpacity 
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 50,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 2,
    borderColor: '#FFD700',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#fff',
    backgroundColor: '#000',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFD700',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
});