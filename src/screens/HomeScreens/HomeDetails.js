
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './../../../App';
import { useSelector } from 'react-redux';
import { selectUserData } from './../../../userSlice';
const HomeDetails = (props) => {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [item, setItemData] = useState(null);
    console.log("props?.route?.params?", props?.route?.params);
    const itemIdFromNotification = props?.route?.params?.chatId;
    const userData = useSelector(selectUserData);
    useEffect(() => {
        fetchItemData(itemIdFromNotification);
        console.log("userData",userData);
    }, [])


    const fetchItemData = async (itemId) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${itemId}`);
            const data = await response.json();
            setItemData(data);
        } catch (error) {
            console.error('Error fetching item data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem('userToken');
        setIsAuthenticated(false);
        props.navigation.navigate('Login');
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{userData?.name}</Text>
            <Text style={styles.title}>Welcome New Member </Text>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.text}>Name: {item.name}</Text>
            <Text style={styles.text}>Username: {item.username}</Text>
            <Text style={styles.text}>Email: {item.email}</Text>
            <Text style={styles.text}>Phone: {item.phone}</Text>
            <Text style={styles.text}>Website: {item.website}</Text>
            <Text style={styles.text}>Address:</Text>
            <Text style={styles.text}>  Street: {item.address.street}</Text>
            <Text style={styles.text}>  Suite: {item.address.suite}</Text>
            <Text style={styles.text}>  City: {item.address.city}</Text>
            <Text style={styles.text}>  Zipcode: {item.address.zipcode}</Text>
            <Text style={styles.text}>Company:</Text>
            <Text style={styles.text}>  Name: {item.company.name}</Text>
            <Text style={styles.text}>  Catch Phrase: {item.company.catchPhrase}</Text>
            <Text style={styles.text}>  BS: {item.company.bs}</Text>


            {/* <Text style={styles.title}>ID from notification: {itemIdFromNotification}</Text> */}

            <TouchableOpacity onPress={handleLogout} style={styles.button}>
                <Text style={styles.buttonText}>Logout</Text>
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
    button: {
        backgroundColor: '#2D3142',
        width: 150,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        marginTop: 20,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
    },
});

export default HomeDetails;
