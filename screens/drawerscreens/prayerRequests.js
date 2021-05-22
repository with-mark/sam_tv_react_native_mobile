import { firebase } from '@react-native-firebase/storage';
import React, { useEffect, useState } from 'react'
import { SafeAreaView, ActivityIndicator,View,TouchableOpacity,Text,TextInput,Dimensions,StyleSheet, Alert, ScrollView} from 'react-native'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const blue = "rgb(0,122,255)"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Get } from '../../components/async';

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    search:{
       position:'relative', height:50,borderBottomWidth:1,borderColor:"gainsboro",justifyContent:'center',alignItems:'center',flexDirection:'row'
      },
    header:{
        width:'100%',
        borderBottomWidth:1,
        borderBottomColor:'gainsboro',
        height:'auto',
        justifyContent:'center',
        padding:15,
        alignItems:'flex-start'

        
    },
    body:{
        flexDirection:'column',
       justifyContent:'space-evenly',
       alignItems:'flex-start' ,
       padding:15,
       height:'auto',
       borderBottomWidth:1,
       borderColor:"gainsboro",
       
       paddingLeft:10
    },
    form:{
        padding:15,
      
    },
    scrollView: {
   
        marginHorizontal: 0,
        height:'88%'
      },
})
const PrayerRequest=({navigation})=>{
    const [name,setName]=useState('');
    const [request,setRequest]=useState('')
   
    useEffect(()=>{
        const getUser=async()=>{
            const user=await Get('user');
            const correctUser=JSON.parse(user)
            console.log(correctUser)
            if(user.displayName===null){
                setName(correctUser.email)
                return
            }
            setName(correctUser.displayName)

        }
        getUser()
    },[])
    return(
        <SafeAreaView style={styles.container}>
      <View style={styles.search}>
        <View>
        {/* <TextInput onChangeText={(e)=>{setSearch(e),setCancel(true)}} value={search} placeholderTextColor="white" placeholder="Search Videos" style={{fontSize:15,paddingLeft:30,width:screenWidth*0.80,borderRadius:50,borderColor:"rgb(0,122,255)",height:screenHeight*0.055,backgroundColor:"gainsboro"}}  /> */}
        <Text style={{fontSize:18,}}>Send a Prayer Request</Text>
        </View>
        <TouchableOpacity style={{position:'absolute',left:10,top:10}} onPress={()=>{navigation.toggleDrawer()}}>
        <Text >
        <MaterialCommunityIcons name="menu" color="grey" size={30} />
        </Text>
        </TouchableOpacity>
        </View>
       <ScrollView>
       <View style={{...styles.form,borderTopColor:'gainsboro',borderTopWidth:1,paddingTop:20}}>
        <Text style={{marginBottom:8,fontSize:19,color:blue}}>Enter your request</Text>
        <Text style={{color:'black',marginBottom:20,fontSize:16,color:'grey'}}>You may be mentioned during the next live session</Text>
        <TextInput value={request} onChangeText={e=>setRequest(e)}  style={{borderWidth:1,fontSize:16,borderColor:'gainsboro',borderRadius:10,height:200,padding:10}} placeholder="Enter Request" multiline={true} numberOfLines={5} />
    </View>
    <View style={styles.form}>
        
        <TouchableOpacity onPress={()=>{
          
            console.log(name);
            console.log(request)
            if(request===''){
                return
            }
            const date=firebase.firestore.Timestamp.now()
            firebase.firestore().collection('prayer request').doc(name).set({
                request:request,
                date:date
            }).then(()=>{
                Alert.alert('Your request has been sent')
            })
            


        }} style={{backgroundColor:blue,borderRadius:10,height:screenHeight*0.07,justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'white',fontSize:17}}>SEND</Text>  
                </TouchableOpacity>
    </View>
       </ScrollView>
        </SafeAreaView>
    )
}

export default PrayerRequest;