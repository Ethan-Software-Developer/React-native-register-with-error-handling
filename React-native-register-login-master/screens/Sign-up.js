import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';  // Added gradient for modern touch

const { width, height } = Dimensions.get('window');

const Signup = () => {
  const navigation = useNavigation();
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

      if (response.status === 201) {
        Alert.alert('Success', 'User registered successfully');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        const errorMsg = error.response.data.message || error.response.data.detail || 'Unknown error';
        Alert.alert('Error', errorMsg);
      } else {
        Alert.alert('Error', 'Failed to connect to the server');
      }
    }
  };

  return (
    <ImageBackground 
      source={require('../assets/image.jpg')} 
      style={styles.container}
    >
      <StatusBar style="light" />
      <View style={styles.overlay}>
        <Text style={styles.title}>Join Us</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#fff"
          value={username}
          onChangeText={setUsername}
        />
   <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#fff"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#fff"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity 
          onPress={handleRegister} 
          style={styles.signupButton} 
          disabled={loading}
        >
          <Text style={styles.signupText}>
            {loading ? 'Registering...' : 'Sign Up'}
          </Text>
        </TouchableOpacity>

        <View style={styles.loginLinkContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.push('Login')}>
            <Text style={styles.loginLink}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Semi-transparent overlay for readability
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: height * 0.07,
    color: '#FFA500',
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginBottom: 30,
  },
  input: {
    height: 55,
    width: '90%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
    color: 'white',
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 16,
  },
  signupButton: {
    width: '90%',
    backgroundColor: '#fff',
    paddingVertical: 12,
    MarginVertical: 12,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  signupText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: 'white',
    fontSize: 16,
  },
  loginLink: {
    color: '#FFA500',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Signup;
