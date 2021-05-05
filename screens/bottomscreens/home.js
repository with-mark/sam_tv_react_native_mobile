import React, { Component,useState,useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../stackscreens/signup';
import CreateWord from '../bottomscreens/homestack/create';
import {ViewPostScreen} from '../bottomscreens/homestack/view';
import {ViewProfileScreen} from '../bottomscreens/homestack/viewProfile';
import {Home} from '../bottomscreens/homestack/home';
import {Store,Get} from '../../components/async'
import { View } from 'react-native';
import Snackbar from 'react-native-snackbar';
import firestore from '@react-native-firebase/firestore';


const Root = createStackNavigator();



 const HomeInBottomNav = ({navigation}) => {
     
      
    useEffect(()=>{
        Snackbar.show({
            text: 'Click to update your settings',
            duration: Snackbar.LENGTH_LONG,
            action: {
                text: 'UPDATE',
                textColor: 'green',
                onPress: () => { navigation.navigate('Settings')},
              },
          });
    },[])
    useEffect(()=>{
        firestore().collection('live').doc('M6zPN7Af72tKczD7i41E').onSnapshot(
            snapshot=>{
                let status=snapshot.data()
                console.log('changing')
                    Store('live',status.live)
                    console.log(status.live)
                
            }
        )
    },[])

    return (
      
        <Root.Navigator headerMode={false} initialRouteName="HomeInBottomNav" mode={'modal'} >
              <Root.Screen name="HomeInBottomNav" component={Home} />
             <Root.Screen  name="Create" component={CreateWord} />
                {/* <Root.Screen name="View" component={ViewPostScreen} />
                <Root.Screen name="Profile" component={ViewProfileScreen} /> */}
        </Root.Navigator>
      
    
    );
};

;

export default HomeInBottomNav;