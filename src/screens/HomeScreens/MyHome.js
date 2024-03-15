// HomeScreen.js
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';

const MyHome = ({ navigation }) => {
   
    const handleLogout = async () => {
        navigation.navigate('HomeDetails');
    };


    return (

        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Home Screen</Text>

            <TouchableOpacity onPress={handleLogout} style={{ backgroundColor: 'red', width: 180, borderRadius: 20, alignItems: 'center', justifyContent: 'center', paddingVertical: 10 }} >
                
                <Text style={{ color: '#ffff', fontSize: 16 }}>Go to detail Screen</Text>
          
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

export default MyHome;
