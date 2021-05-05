import React, { Component,useState,useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StartStream from './drawerscreens/startStream';
import StartLive from './drawerscreens/startLive';




const Root = createStackNavigator();



 const GoLive = ({navigation}) => {
     
      


    return (
      
        <Root.Navigator headerMode={false} initialRouteName="StartStream" mode={'modal'} >
              <Root.Screen name="StartStream" component={StartStream} />
             <Root.Screen  name="StartLive" component={StartLive} />
        </Root.Navigator>
      
    
    );
};

;

export default GoLive;