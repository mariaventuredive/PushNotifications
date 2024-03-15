// HomeScreen.js
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './../../../App';

const HomeDetails = (props) => {

    console.log("props========>", props.route.params);

    const handleLogout = async () => {

        await AsyncStorage.removeItem('userToken');
        setIsAuthenticated(false)


        props.navigation.navigate('Login');
    };
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Details Screen</Text>
            <Text style={styles.title}>ID from notification:{props?.route?.params?.data?.data?.chatId} </Text>


            <TouchableOpacity onPress={handleLogout} style={{ backgroundColor: '#2D3142', width: 150, borderRadius: 20, alignItems: 'center', justifyContent: 'center', paddingVertical: 10 }} >
                <Text style={{ color: '#ffff', fontSize: 16 }}>Logout</Text>
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

export default HomeDetails;
