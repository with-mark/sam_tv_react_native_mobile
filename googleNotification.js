import messaging from '@react-native-firebase/messaging';
export default async function requestUserPermission () {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    getFcmToken() //<---- Add this
  }
}

getFcmToken = async () => {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    console.log('subscribing')
   subscribe(fcmToken)
  } else {
   console.log("Failed", "No token received");
  }
}


subscribe= async (fcmToken)=>{
  let booo={
    token:fcmToken
  }

  let body=JSON.stringify(booo)
  const me= await fetch(`https://us-central1-samtv-7b912.cloudfunctions.net/subscribe`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
   body:body
  }).then((response)=>{
   //success
   console.log('subscribed to topic')
  }).catch((error)=>{
    //error
  })
}