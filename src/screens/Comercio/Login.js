import React, { useState, useCallback } from 'react';
import { Alert, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = useCallback(async () => {
    if (!username || !password) {
      Alert.alert('Todos los campos son obligatorios');
      return;
    }

    try {
      const response = await fetch(`https://bygtrack.hostingbygnet.com/demo/public/servicios/login/${username}/${password}`);
      const data = await response.json();

      if (response.ok) {
        if (data && data.userName && data.personId) {
          navigation.navigate('Home', { username, personId: data.personId });
        } else {
          Alert.alert('Usuario o contraseña incorrectos');
        }
      } else {
        Alert.alert('Error en la autenticación, por favor intente nuevamente.');
      }
    } catch (error) {
      Alert.alert('Error en la conexión, por favor intente nuevamente.');
    }
  }, [username, password, navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={require('../assets/login.png')} style={styles.image} />
        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          value={username}
          onChangeText={setUsername}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon name={showPassword ? 'visibility-off' : 'visibility'} size={24} color="gray" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.roundedButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 300,
    height: 200,
    marginTop: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  inputPassword: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
  },
  roundedButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
