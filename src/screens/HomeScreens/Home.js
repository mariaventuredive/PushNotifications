// HomeScreen.js
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import HomeDetails from "./HomeDetails";
import MyHome from './MyHome';
import { Colors } from 'react-native/Libraries/NewAppScreen';
const Home = ({ navigation }) => {

    const stack = createStackNavigator();



    return (
        <stack.Navigator initialRouteName='Home' >
            <stack.Screen
                options={{
                    headerStyle: {
                        backgroundColor: 'red', // Change this to your desired background color
                    },
                    headerTintColor: 'white', // Change text color of header titles if needed
                }}
                name="Home" component={MyHome} />
            <stack.Screen
                options={{
                    headerStyle: {
                        backgroundColor: 'red', // Change this to your desired background color
                    },
                    headerTintColor: 'white', // Change text color of header titles if needed
                }}
                name="HomeDetails" component={HomeDetails} />
        </stack.Navigator>



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

export default Home;
