

import React, { useEffect, useState, useRef, createContext, useContext } from 'react';

import {

  Text,
  useColorScheme,
  Linking,

} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

import { NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';



const NAVIGATION_IDS = ['Login', 'Home', 'HomeDetails', 'Profile'
];
const AuthContext = createContext();
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [initialDeepLink, setInitialDeepLink] = useState(null);
  const [notifcationData, setNotificationData] = useState(null);

  function buildDeepLinkFromNotificationData(data) {

    const navigationId = data?.navigationId;
    if (!NAVIGATION_IDS.includes(navigationId)) {
      console.warn('Unverified navigationId', navigationId)
      return null;

    }
    const chatId = data?.chatId;

    if (!isAuthenticated) {

      setInitialDeepLink(`myapp://HomeDetails/${chatId}`)
      return 'myapp://Login';

    }
    else {
      if (navigationId === 'HomeDetails') {
        navigationRef.current?.navigate(navigationId, { data: data })
        setInitialDeepLink(null)
        //  return `myapp://HomeDetails/${chatId}`;
      }
      if (navigationId === 'Profile') {
        navigationRef.current?.navigate(navigationId, { data: data })
        setInitialDeepLink(null)
        //  return `myapp://HomeDetails/${chatId}`;
      }
      //   if (navigationId === 'Login') {
      //     return 'myapp://Login';
      //  }
    }

    // console.warn('Missing postId')
    // return null
  }

  const linking = {
    prefixes: ["myapp://"],
    config: {
      screens: {
        Login: 'Login',


        Home: {
          screens: {
            HomeStack: {
              screens: {
                HomeDetails: 'HomeDetails/:id',
              }
            }
          }
        },

        Home: {
          screens: {

            Profile: 'Profile/:id',
          }
        

      },
    },
  },

    async getInitialURL() {
      const url = await Linking.getInitialURL();
      if (typeof url === 'string') {
        return url;
      }
      //getInitialNotification: When the application is opened from a quit state.
      const message = await messaging().getInitialNotification();
      console.log("messafe", message);
      setNotificationData(message)
      if (isAuthenticated && initialDeepLink != null) {
        navigationRef.current?.navigate(message.data.navigationId, { data: message })
        setInitialDeepLink(null)

      }
      const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);

      if (typeof deeplinkURL === 'string') {

        return deeplinkURL;
      }
    },

      subscribe(listener) {
    const onReceiveURL = ({ url }) => listener(url);

    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

    //onNotificationOpenedApp: When the application is running, but in the background.
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      console.log("message====", remoteMessage);
      setNotificationData(remoteMessage)
      if (isAuthenticated && initialDeepLink != null) {
        navigationRef.current?.navigate(remoteMessage.data.navigationId, { data: remoteMessage })
        setInitialDeepLink(null)

      }
      const url = buildDeepLinkFromNotificationData(remoteMessage?.data)

      if (typeof url === 'string') {
        listener(url)
      }
    });

    return () => {
      linkingSubscription.remove();
      unsubscribe();
    };
  },
}

const navigationRef = useRef();
const Stack = createStackNavigator();
const isDarkMode = useColorScheme() === 'dark';


messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
});

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}
const getToken = async () => {
  const token = await messaging().getToken();

  console.log("token", token);
};


async function GetAuthState() {
  let userToken = await AsyncStorage.getItem('userToken');
  console.log("userToken", userToken);
  if (userToken !== null) {
    setIsAuthenticated(true)

  } else {
    setIsAuthenticated(false)
  }
}

useEffect(() => {
  GetAuthState()
  requestUserPermission();
  getToken();
}, []);




// useEffect(() => {
//   // Assume a message-notification contains a "type" property in the data payload of the screen to open

//   messaging().onNotificationOpenedApp(remoteMessage => {
//     console.log(
//       'Notification caused app to open from background state:',
//       remoteMessage.notification,
//     );
//   //  navigationRef.current.navigate('Home')

//   });

//   // Check whether an initial notification is available
//   messaging()
//     .getInitialNotification()
//     .then(remoteMessage => {
//       if (remoteMessage) {
//         console.log(
//           'Notification caused app to open from quit state:',
//           remoteMessage.notification,
//         );

//       //  setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
//       }
//      // setLoading(false);
//     });
// }, []);



useEffect(() => {



  if (isAuthenticated && initialDeepLink != null) {
    navigationRef.current?.navigate(notifcationData.data.navigationId, { data: notifcationData })
    setInitialDeepLink(null)

  }



}, [isAuthenticated]);


// useEffect(() => {

// }, [initialDeepLink, isAuthenticated]);






return (
  <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
    <NavigationContainer
      ref={navigationRef}
      linking={linking}
      fallback={<Text>Loading...</Text>}>



      <Stack.Navigator>

        {!isAuthenticated ? <>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          // initialParams={{ deepLinkParams: 'myapp://HomeDetails/1234' }}
          />
        </> :
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Home"
              component={HomeScreen}
            // initialParams={{ deepLinkParams: initialDeepLink ? initialDeepLink : null }}

            />
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  </AuthContext.Provider>
);
}


export { AuthContext, useContext };
export default App;
