
// AppNavigator.js
import React, { useEffect } from 'react';
import { View, Text, StatusBar, Image, Linking } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useRoute } from '@react-navigation/native';

import Home from './HomeScreens/Home';
import ProfileScreen from './Profile';
const Tab = createBottomTabNavigator();

import inAppMessaging from '@react-native-firebase/in-app-messaging';


const HomeScreen = ({ navigation }) => {
    useEffect(() => {
     
        console.log(inAppMessaging().isMessagesDisplaySuppressed)
inAppMessaging().setMessagesDisplaySuppressed(false)
      
        return () => {
          // Cleanup code here
        };
      }, []);

    return (
        <>
            <StatusBar
        animated={true}
        backgroundColor="red"
        barStyle={'light-content'}
      
      />

        <Tab.Navigator

            initialRouteName='HomeStack'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconSource;

                    if (route.name === 'HomeStack') {
                        iconSource = require('../assets/home.png');
                    } else if (route.name === 'Profile') {
                        iconSource = require('../assets/settings.png');
                    }

                    return (
                        <Image
                            source={iconSource}
                            style={{ width: size, height: size, tintColor: focused ? 'red' : color, }}
                        />
                    );
                },
                tabBarLabelStyle: {
                    color: 'red', // Set the text color of the tab names
                },
            })}

        >
            <Tab.Screen name="HomeStack" options={{ headerShown: false }} component={Home} />
            <Tab.Screen name="Profile"
                options={{
                    headerStyle: {
                        backgroundColor: 'red', // Change this to your desired background color
                    },
                    headerTintColor: 'white', // Change text color of header titles if needed
                }}
                component={ProfileScreen} />
        </Tab.Navigator>
        </>

    );
};

export default HomeScreen;
