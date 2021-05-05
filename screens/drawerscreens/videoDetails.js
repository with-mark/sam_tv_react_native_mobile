import React from 'react';
import {Text,View,StyleSheet,Dimensions,TouchableOpacity, } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { VLCPlayer, VlCPlayerView } from 'react-native-vlc-media-player';

import Video from "react-native-video"
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const blue = "rgb(0,122,255)"

const styles=StyleSheet.create({
itemx:{
    height:screenHeight*0.85,
    borderBottomWidth:1,
    borderColor:"lightgrey",
    backgroundColor:'gainsboro',
    flexDirection:"column",
    justifyContent:"space-around",
    
    alignItems:"center"

},
header:{
    height:screenHeight*0.15,borderBottomWidth:1,borderColor:"gainsboro",justifyContent:'flex-end',alignItems:'flex-start',flexDirection:'column',
    padding:10
}
})

export const VideoDetails=({route,navigation})=>{
    return(
        <View style={{backgroundColor:'gainsboro',height:screenHeight}}>
        <View style={{...styles.header,display:'flex',backgroundColor:'white'}}>
        <TouchableOpacity style={{width:screenWidth*0.1,}} onPress={()=>{navigation.goBack()}}>
        <Text>
        <MaterialCommunityIcons name="close-circle-outline" color={'#b3454c'} size={30} />
        </Text>
        </TouchableOpacity>

        </View>
        <View  style={styles.itemx}>
          
         
          
          <View style={{flexDirection:"column",position:'relative',width:'100%',display:'flex',alignItems:'center',justifyContent:'flex-start',height:screenHeight*0.65,marginBottom:10}}>
          
                  {/* <VlCPlayerView
                 ref={ref => (this.vlcPlayer = ref)}
                 style={{width:screenWidth*0.95,height:screenHeight*0.4,borderTopLeftRadius:15,borderTopRightRadius:15,}}
                 videoAspectRatio="5:3"
                 url= {route.params.url}
                initPaused={true}
                 showControls={true}
                 showLeftButton={true}
                 seek={1}
                 
                 
                 
             />  */}
            <View style={{backgroundColor:'black',position:'absolute',zIndex:-1, width:screenWidth*0.95,height:screenHeight*0.4,borderTopRightRadius:15,borderTopLeftRadius:15 ,display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'white'}}>Loading..</Text>
            </View>
             <Video
                source={{ uri: route.params.url}}
                style={{ width:screenWidth*0.95,height:screenHeight*0.4,borderTopRightRadius:15,borderTopLeftRadius:15 }}
                controls={true}
                ref={(ref) => {
                this.player = ref
                }} />
             <View style={{width:screenWidth*0.95,padding:15,backgroundColor:'white',borderBottomLeftRadius:15,borderBottomRightRadius:15,}}>
             <Text style={{textAlign:'left',fontSize:15,color:'black',textTransform:'capitalize'}}>Theme: {route.params.title}</Text> 
             <View style={{flexDirection:"row"}}>
                 <Text style={{textAlign:'left',fontSize:13,color:'grey',paddingTop:10}}>Date Streamed: {route.params.date.slice(0,15)}</Text> 
            </View>
            <View style={{flexDirection:"row"}}>
                 <Text style={{textAlign:'left',fontSize:13,color:'grey',paddingTop:10}}>Time: {route.params.date.slice(16,21)} GMT</Text> 
            </View>
             </View>
             
            
          </View>
          <View style={{flexDirection:"row"}}>
                 <Text style={{...styles.title,fontSize:14,color:'#008cb4',fontStyle:'italic'}}>"You are too needed to be wasted"</Text> 
            </View>
          
        </View>
        </View>
      );
      
}