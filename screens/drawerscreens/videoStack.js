import React, { Component,useState,useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {Videos} from './videos';
import { VideoDetails } from './videoDetails';
import CreateWord from '../bottomscreens/homestack/create';




const Root = createStackNavigator();



 const Vid = ({navigation}) => {
     
      


    return (
      
        <Root.Navigator headerMode={false} initialRouteName="Videos" mode={'modal'} >
              <Root.Screen name="Videos" component={Videos} />
              <Root.Screen name="Create" component={CreateWord} />
             <Root.Screen  name="VideoDetails" component={VideoDetails} />
        </Root.Navigator>
      
    
    );
};

;

export default Vid;


