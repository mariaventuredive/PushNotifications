import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

async function GetFCMToken  (){
let fcmToken = AsyncStorage.getItem('fcmtoken')
if(!fcmToken){
    
    try {
        let fcmToken = messaging().getToken()
        if(fcmToken){
            console.log("fcm token", fcmToken)
            await AsyncStorage.setItem('fcmtoken', fcmToken)
        }
    } catch (error) {
        console.log('error', error)
    }
}
}