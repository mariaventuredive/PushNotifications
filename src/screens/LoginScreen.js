// LoginScreen.js
import React, { useState, useContext ,useEffect} from 'react';
import { View, Text, TextInput, Button, StyleSheet, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from './../../App';
import { useRoute } from '@react-navigation/native';
import inAppMessaging from '@react-native-firebase/in-app-messaging';
import { setUserData } from './../../userSlice';
import { useDispatch } from 'react-redux';
import { registerUser } from './../../userSlice';
const LoginScreen = ({ navigation }) => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const route = useRoute();
  const dispatch = useDispatch();

  useEffect(() => {
    // Display in-app messages
    console.log("receivedd");
    console.log(inAppMessaging().isMessagesDisplaySuppressed)
    inAppMessaging().setMessagesDisplaySuppressed(false)
  
    return () => {
      // Cleanup code here
    };
  }, []);
  const handleLogin = async () => {
    const userData = { name: 'John', age: 30 };
    dispatch(registerUser(userData));
  
    setIsAuthenticated(true);
    await AsyncStorage.setItem('userToken', 'authenticated');


  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity onPress={handleLogin} style={{ backgroundColor: 'red', width: 150, borderRadius: 20, alignItems: 'center', justifyContent: 'center', paddingVertical: 10 }} >
        <Text style={{ color: '#ffff', fontSize: 16 }}>Logins</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffff'
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    width: '100%',
  },
});

export default LoginScreen;
