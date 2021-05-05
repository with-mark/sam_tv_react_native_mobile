import React from 'react';
import { Text,View,StyleSheet,ImageBackground,Dimensions,TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
    container: {
     borderRadius:40,
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      overflow:"hidden",
      width:screenWidth*0.9,
      
    }
  });
  


export const LivePlayer = (params) => {
  return(
    
      <ImageBackground  blurRadius={0.4}
      source={{uri: 'https://sampsonamoateng.net/wp-content/uploads/2018/08/prof8-458x416.jpg'}} style={styles.container}>
          <View style={{borderWidth:1,borderRadius:90,borderColor:"orange" ,width:80,height:80,position:'relative',justifyContent:"center",alignItems:"center"}}>
          <MaterialCommunityIcons  color={"orange"}  name="play-circle-outline"  size={65} />
                </View>
               
          
      </ImageBackground>
    
  )
};
;

export const LivePlayer1 = (params) => {
  return(
    
      <ImageBackground  blurRadius={0.4}
      source={{uri: 'https://i1.sndcdn.com/avatars-000215073342-2bmvrs-t500x500.jpg'}} style={styles.container}>
          <View style={{borderWidth:1,borderRadius:90,borderColor:"orange" ,width:80,height:80,position:'relative',justifyContent:"center",alignItems:"center"}}>
          <MaterialCommunityIcons  color={"orange"}  name="play-circle-outline"  size={65} />
                </View>
               
          
      </ImageBackground>
    
  )
};
;

export const LivePlayer2 = (params) => {
  return(
    
      <ImageBackground  blurRadius={0.4}
      source={{uri: 'https://pbs.twimg.com/profile_images/1226242216550686721/oSLG2VyM.jpg'}} style={styles.container}>
          <View style={{borderWidth:1,borderRadius:90,borderColor:"orange" ,width:80,height:80,position:'relative',justifyContent:"center",alignItems:"center"}}>
          <MaterialCommunityIcons  color={"orange"}  name="play-circle-outline"  size={65} />
                </View>
               
          
      </ImageBackground>
    
  )
};
;