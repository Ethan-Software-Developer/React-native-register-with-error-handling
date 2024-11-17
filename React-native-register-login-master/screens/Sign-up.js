import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const Signup = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://192.168.1.113:8000/signup/', {
        username,
        email,
        password,
      });

      // If registration is successful, navigate to login
      if (response.status === 201) {
        Alert.alert('Success', 'User registered successfully');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        // Axios response error with data
        const errorMsg = error.response.data.message || error.response.data.detail || 'Unknown error';
        Alert.alert('Error', errorMsg);  // Show detailed error message
      } else {
        Alert.alert('Error', 'Failed to connect to the server');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={setUsername}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Registering...' : 'Register'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: '#333',
  },
  button: {
    height: 50,
    width: '100%',
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Signup;
