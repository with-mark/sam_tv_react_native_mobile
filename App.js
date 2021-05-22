import React,{useEffect} from 'react';
import {
  Dimensions,

} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const blue = "rgb(0,122,255)";
const fontColor = "white";
import Stack from './screens/stack/stack'
import NotificatonService from './NotificationService'
import requestUserPermission from './googleNotification';
import { Store } from './components/async';

const App = ()  => {
  
useEffect(()=>{
    const visited=Store('visited',JSON.stringify(false))
    const run =async()=>{
      await requestUserPermission().then(
        ()=>{
          console.log('Show')
        }
      ).catch((error)=>{
          console.log(error.message)
      })
    }
    run()

    return ()=>{
      console.log('Ended')
    }

},[])
  return (
    <NavigationContainer>
      <Stack />
    </NavigationContainer>
 
  );
};


export default App;