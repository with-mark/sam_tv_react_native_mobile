import React, { Component,useState,useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../stackscreens/signup';

import {ActivityIndicator, Alert ,DeviceEventEmitter,Dimensions,ImageBackground,View} from 'react-native';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Login from '../stackscreens/login';
import DrawerScreen from '../drawernavigator/drawer';
import {Store,Get} from '../../components/async'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const Root = createStackNavigator();


let devicetoken
 const Stack = (params) => {
    const [initialRouteName,setinitialRouteName]=useState("")
    // const [initialRouteName,setinitialRouteName]=useState("")
        const check = async() =>{
            const user = await Get('user');
            if (user) {
               // storeUser(user)
                setinitialRouteName('Drawer')
              } else {
    
                setinitialRouteName('Login');
              }
        }
     useEffect(()=>{
         
        check();
     })
    //  Notification Things
      


    return (
      initialRouteName===''?
        <View style={{height:screenHeight,backgroundColor:'white',width:screenWidth,display:'flex',alignItems:'center',justifyContent:'center'}}>
           <ImageBackground style={{width:170,height:170}} source={require('../images/sam5.png')}/>
        </View>
      :
        <Root.Navigator headerMode={false} initialRouteName={initialRouteName}>
             <Root.Screen  name="Login" component={Login} />
             <Root.Screen name="SignUp" component={SignUp} />
             <Root.Screen name="Drawer" component={DrawerScreen} options={ { 
        gestureEnabled: false,
    }}/>
        </Root.Navigator>
      
    
    );
};

;

export default Stack;