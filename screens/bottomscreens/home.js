import React, { Component, useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../stackscreens/signup';
import { ViewPostScreen } from '../bottomscreens/homestack/view';
import { ViewProfileScreen } from '../bottomscreens/homestack/viewProfile';
import { Home } from '../bottomscreens/homestack/home';
import { Store, Get } from '../../components/async'
import { View } from 'react-native';
import Snackbar from 'react-native-snackbar';
import Live from '../drawerscreens/live'



const Root = createStackNavigator();



const HomeInBottomNav = ({ navigation }) => {


    useEffect(() => {
        Snackbar.show({
            text: 'Click to update your settings',
            duration: Snackbar.LENGTH_LONG,
            action: {
                text: 'UPDATE',
                textColor: 'green',
                onPress: () => { navigation.navigate('Settings') },
            },
        });
    }, [])

    return (

        <Root.Navigator headerMode={false} initialRouteName="HomeInBottomNav"  >
            <Root.Screen name="HomeInBottomNav" component={Home} />
            
            <Root.Screen name="Live" component={Live} />
        </Root.Navigator>


    );
};

;

export default HomeInBottomNav;