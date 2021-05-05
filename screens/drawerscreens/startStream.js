import React, { useEffect,useState } from 'react'
import {Dimensions,StyleSheet, TouchableOpacity,Text, View} from 'react-native'
// import {RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole} from 'agora-access-token'
import { Store } from '../../components/async';
import { REACT_APP_API_URL } from '../api';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


const blue = "rgb(0,122,255)"
const styles = StyleSheet.create({
    container:{
        width:screenWidth,
        height:screenHeight,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'

    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#0093E9',
        borderRadius: 25,
    },
    text:{
        color:'#fff'
    }
})

const StartStream=({navigation})=>{
    const [token,setToken]=useState(null)
    useEffect(()=>{
        createToken()
    },[])
    return(
        <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('StartLive',{token})}}>
                    <Text style={styles.text}>Start Stream</Text>
                </TouchableOpacity>
        </View>
    )
}

export default StartStream


// const createToken = () =>{
//     const appID = 'c40594061e1f4580aae3b2af1963d01e';
//     const appCertificate = '3fc30bdae6174ab9be11d72f2ddb43a7';
//     const channelName = 'casa'
//     const uid = "0";
//     //const account = "2882341273";
//     const role = RtcRole.PUBLISHER;
    
//     const expirationTimeInSeconds = 86300
    
//     const currentTimestamp = Math.floor(Date.now() / 1000)
    
//     const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds
    
//     // IMPORTANT! Build token with either the uid or with the user account. Comment out the option you do not want to use below.
    
//     // Build token with uid
//     const tokenA = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, role, privilegeExpiredTs);
//     const saveToken = async() =>{ 
//       let bod={
//         token:tokenA
//       }
//       Store("pastortoken",tokenA);
//       let body=JSON.stringify(bod)
//       await fetch(`${REACT_APP_API_URL}/api/token/`, {
//         method: 'PUT',
//         headers: {
             
//             'Content-Type': 'application/json',
//         },
//        body:body
//       }).then((response)=>{
//         console.log('succeeded',response)
//       }).catch((error)=>{
//         console.log('failed',error.message)
//       })
//     }
//     saveToken()
//     console.log('yh',tokenA)
//     setToke(tokenA)
//     const c = async()=> {await send(tokenA)}
//     c();
  
//   }
