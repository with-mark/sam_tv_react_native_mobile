import React, { useState,useEffect } from 'react';
import { View,Text,StyleSheet,Dimensions,ScrollView,SafeAreaView,TouchableOpacity} from 'react-native';
import { LivePlayer ,LivePlayer2,LivePlayer1} from "../../../components/livePlayer";
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
import * as Store from "../../../components/async";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      position:'relative'
    },
    live:{
      marginTop:0,
      marginBottom:40,
      height:"auto",
         margin:0,
          borderWidth:0,
          borderColor:"gainsboro",
          borderRadius:15,
          flexDirection:"row",
          shadowColor: "gainsboro",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

    },
    scrollView: {
      
        marginHorizontal: 0,
        height:screenHeight,
        marginLeft:10
        
      },
    liveComp:{
        borderWidth:1,
        height:'100%',
        width:0.5*screenWidth
      
    },
    words:{
       // flex: 0.7, justifyContent: 'center', alignItems: 'center' ,
       
        borderBottomWidth:1.5,
        borderColor:"gainsboro",
        height:'auto',
        overflow:'hidden'
    }
  });
  















export const Home = ({navigation}) => {

  const [count,setCount] = useState(0)
  const [user,setUser] = useState({})
  const [token,setToken] = useState("")


  


  const check = async()=>{
    const use = await Store.Get("user")
    const u = JSON.parse(use)
   
    setUser(u)
  }

 
 
useEffect(
() => {
   // getWord();
    check();
  
  }, [count]
);




  return(
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={()=>navigation.toggleDrawer()} style={{marginLeft:15}}>
     <MaterialCommunityIcons color="grey" name="menu"  size={35}/>  
     </TouchableOpacity>
    <ScrollView horizontal={true} style={styles.scrollView}>
      <View>
      <View style={{width:screenWidth,justifyContent:"flex-start"}}>
        <Text style={{fontSize:30,fontWeight:"bold",color:"grey",margin:30}}>
          Weekly Live Streams
        </Text>
      </View>
       <View elevation={5} style={styles.live}>
 <TouchableOpacity style={{padding:10,width:screenWidth,justifyContent:"center",alignItems:"center",width:screenWidth,height:screenHeight*0.45}} onPress={()=>{navigation.navigate('Live');}}>
         <LivePlayer/>
    </TouchableOpacity>
       
      
    </View>
    <View style={{borderWidth:0,padding:30,width:screenWidth}}> 
      <Text style={{fontSize:20,padding:10}}>
      Watch SAM TV weekly


      </Text>
      <Text style={{padding:10,color:"grey"}}>
     

      SAMTV weekly is our Prophetic channel to bring healing, deliverance, life and many other blessings into the lives of children of God Worldwide
      </Text>
     
    </View>
      </View>


      <View>
      <View style={{width:screenWidth,justifyContent:"flex-start"}}>
        <Text style={{fontSize:30,fontWeight:"bold",color:"grey",margin:30}}>
          Friday Live Streams
        </Text>
      </View>
       <View elevation={5} style={styles.live}>
 <TouchableOpacity style={{padding:10,width:screenWidth,justifyContent:"center",alignItems:"center",width:screenWidth,height:screenHeight*0.45}} onPress={()=>{navigation.navigate('Create');}}>
         <LivePlayer1/>
    </TouchableOpacity>
       
      
    </View>
    <View style={{borderWidth:0,padding:30,width:screenWidth}}> 
      <Text style={{fontSize:20,padding:10}}>
      Watch SAM TV on friday
      </Text>
      <Text style={{padding:10,color:"grey"}}>
     

      Don't just watch but watch with expectation and God is surely gona meet you at the point of your needs.
      </Text>
     
    </View>
      </View>
     
      <View>
      <View style={{width:screenWidth,justifyContent:"flex-start"}}>
        <Text style={{fontSize:30,fontWeight:"bold",color:"grey",margin:30}}>
          Sunday Live Service
        </Text>
      </View>
       <View elevation={5} style={styles.live}>
 <TouchableOpacity style={{padding:10,width:screenWidth,justifyContent:"center",alignItems:"center",width:screenWidth,height:screenHeight*0.45}} onPress={()=>{navigation.navigate('Create');}}>
         <LivePlayer2/>
    </TouchableOpacity>
       
      
    </View>
    <View style={{borderWidth:0,padding:30,width:screenWidth}}> 
      <Text style={{fontSize:20,padding:10}}>
      Sunday Live Service


      </Text>
      <Text style={{padding:10,color:"grey"}}>
     

      Don't just watch but watch with expectation and God is surely gona meet you at the point of your needs.
      </Text>
     
    </View>
    
      </View>

    <View >
     
     
    </View>



    
    <View
style={{
  borderBottomColor: 'gainsboro',
  borderBottomWidth: 0,
}}
/>

  

  <View style={{justifyContent:"center",alignItems:"center",height:100}}>
   
 
   
   
               
 
 
    
  </View>
  
    

 
 </ScrollView>


 </SafeAreaView>

   
  )
};


