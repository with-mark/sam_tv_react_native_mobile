
import React, { Component, useEffect } from 'react';
import { View,Text ,TouchableOpacity,Alert} from 'react-native';

import { createDrawerNavigator, DrawerContentScrollView ,DrawerItemList,DrawerItem} from '@react-navigation/drawer';

import { Contact } from '../drawerscreens/contact';
import { About } from '../drawerscreens/about';
import { Settings } from "../drawerscreens/settings";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator } from '@react-navigation/stack';
import Live from '../drawerscreens/live'
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeInBottomNav  from '../bottomscreens/home';
import Vid from '../drawerscreens/videoStack'
import { Remove,Get,Store } from '../../components/async';
import auth from '@react-native-firebase/auth';
import GoLive from '../goliveStack';
import PrayerRequest from '../drawerscreens/prayerRequests';
import Events from '../drawerscreens/events';
const blue = "rgb(0,122,255)"
function CustomDrawerContent({  ...rest }) {
 
  const logout = async() =>{
    const signout = await Remove("token")
    const signoutuser = await Remove("user")

  }

  

    return (
      <DrawerContentScrollView {...rest}>
        <View style={styles.header}>
          
        </View>
     
          <DrawerItemList {...rest} />

          <View style={{height:80,marginTop:60,borderRadius:10,paddingLeft:15,paddingRight:15,flexDirection:"row",justifyContent:"center",paddingTop:10}}>
          <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:blue,width:'100%',borderRadius:10,padding:15}}>
            <Text style={{color:'white',fontSize:14,textAlign:'center',fontStyle:'italic',fontWeight:'500'}}>You are too needed to be wasted</Text>
          </View>
        </View>
        
      </DrawerContentScrollView>
    );
  }
  const styles={
    header:{
      flex:1,
      height:100,
      justifyContent:"center",
      alignItems:"center",
     
      marginBottom:50
  
    }
    
  }
  const Drawer = createDrawerNavigator();
  

  
  
  export default function DrawerScreen({navigation}) {

    
    return (
    
          
      
  
        <Drawer.Navigator 
        drawerContent={
          props => <CustomDrawerContent {...props} />
        }
         drawerStyle={{paddingTop:10, backgroundColor: 'white'}} initialRouteName="Home">
   
     
    
         <Drawer.Screen
           name="Home" 
      component={HomeInBottomNav } 
           options={{
            title: 'Home',
            edgeWidth: 10,
             drawerIcon: ({color, focused, size }) => (
            <MaterialCommunityIcons color={color} name="home"  size={size} /> 
               )

           }}
           />


          <Drawer.Screen
           name="Live" 
           component={Live}
           options={{
            title: 'Watch Live',
             drawerIcon: ({ color,focused, size }) => (
              <MaterialCommunityIcons color={color} name="television"  size={size} />
               )
           }}
           />
        <Drawer.Screen
           name="PrayerRequest" 
           component={PrayerRequest}
           options={{
            title: 'Prayer Request',
             drawerIcon: ({ color,focused, size }) => (
              <MaterialCommunityIcons color={color} name="send-clock"  size={size} />
               )
           }}
           /> 
           <Drawer.Screen
           name="Events" 
           component={Events}
           options={{
            title: 'Events',
             drawerIcon: ({ color,focused, size }) => (
              <MaterialCommunityIcons color={color} name="calendar"  size={size} />
               )
           }}
           /> 
           <Drawer.Screen
           name="Videos" 
           component={Vid}
           options={{
            title: 'Sermons',
             drawerIcon: ({ color,focused, size }) => (
              <MaterialCommunityIcons color={color} name="play-circle-outline"  size={size} />
               )
           }}
           />

          


          <Drawer.Screen
           name="Contact" 
           component={Contact}
           options={{
            title: 'The Ministry',
             drawerIcon: ({ color,focused, size }) => (
              <MaterialCommunityIcons color={color} name="information-variant"  size={size} />
               )
           }}
           />


          {/* <Drawer.Screen
           name="About" 
           component={About}
           options={{
            title: 'About',
             drawerIcon: ({ color,focused, size }) => (
              <MaterialCommunityIcons color={color} name="information-variant"  size={size} />
               )
           }}
           /> */}
          <Drawer.Screen
           name="Settings" 
           component={Settings} 
           options={{
            title: 'Settings',
             drawerIcon: ({ color,focused, size }) => (
              <MaterialCommunityIcons color={color} name="cog"  size={size} />
               )
           }}
           />
           
          
          
        </Drawer.Navigator>
      
        
  
    
    );
  }

 