import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');  // State to store the user's name
  const [username, setUsername] = useState('');  // State to store the user's username

  // Email validation regex
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://192.168.1.113:8000/login/', {
        email,
        password,
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Login successful');
        
        // Assuming the response includes the user's data (name, username, and email)
        const { name, username, email } = response.data;
        
        // Save the name and username in the state
        setName(name);
        setUsername(username);

        // Optionally store the data in AsyncStorage for persistence across app restarts
        // AsyncStorage.setItem('userData', JSON.stringify({ name, username, email }));

        // Navigate to Profile screen, passing the name, username, and email
        navigation.navigate('MyProfile', { name, username, email });
        
      } else {
        Alert.alert('Error', response.data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', error.response ? error.response.data.message : 'Server connection failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/image.jpg')} // Ensure the path to your image is correct
      style={styles.container}
    >
      <StatusBar style="light" />
      <View style={styles.overlay}>
        <Text style={styles.title}>PaySignal</Text>

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
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Logging in...' : 'Login'}
          </Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupText}>Sign Up</Text>
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
  button: {
    height: 50,
    width: '90%',
    backgroundColor: '#fff',  // Orange color for button
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  footerText: {
    color: 'white',
    fontSize: 16,
  },
  signupText: {
    color: '#FFA500',  // Orange color for "Sign Up" link
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Login;
