import { firebase } from '@react-native-firebase/storage';
import React, { useEffect, useState } from 'react'
import { SafeAreaView, ActivityIndicator,View,TouchableOpacity,Text,FlatList,TextInput,Dimensions,StyleSheet,Alert, ScrollView} from 'react-native'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const blue = "rgb(0,122,255)"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Get, Store } from '../../components/async';

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    search:{
        height:screenHeight*0.12,borderBottomWidth:1,borderColor:"gainsboro",justifyContent:'space-around',alignItems:'center',flexDirection:'row'
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
    announce:{
        padding:15,
        height:screenHeight*0.35,
        backgroundColor:'white',
        
    },
    events:{
        width:screenWidth,
        height:screenHeight*0.53,
        padding:15,
        

    }
})
const Events=({navigation})=>{
    const [events,setEvents]=useState([]);
    const [announcements,setAnnouncements]=useState([])
    const [uid,setUID]=useState('')
    const [fresh,setFresh]=useState(false)

    useEffect(()=>{
        const getUser=async()=>{
            const user=await Get('user');
            const correctUser=JSON.parse(user)
            console.log(correctUser)
            setUID(correctUser.uid)

        }
        getUser()
    },[])
    useEffect(()=>{
        const funcForAll= async ()=>{
            const allEvents= await  firebase.firestore().collection('Events').onSnapshot(
                snapshot=>{
                    let everyEvent=[];
                    snapshot.docs.map((s,index)=>{
                        
                        console.log(s.id,s.data())
                        let title=s.id;
                        let data=s.data()
                        everyEvent.push(data)
                        
                    
                    })
                    setEvents(everyEvent)
                    
                }

            )
            const allAnnounces= await  firebase.firestore().collection('announcements').onSnapshot(
                snapshot=>{
                    let everyAnnouncement=[];
                    snapshot.docs.map((s,index)=>{
                        
                        console.log(s.id,s.data())
                        const title=s.id;
                        let data=s.data()
                        everyAnnouncement.push(data)
                        

                        
                    
                    })
                    setAnnouncements(everyAnnouncement)
                    
                }

            )
        }
        funcForAll()
        
    },[])

    const JoinEvent=async (title,members)=>{
        const newMeme=members.push(uid)
        console.log(members)
        firebase.firestore().collection('Events').doc(title).update({
            members:members
        })
    }

const  renderAnnounceList = ({item}) => {
    console.log(item)
        return (
          
                  
                    <View   style={{backgroundColor:'#ff6251',position:'relative',margin:20,height:'auto',width:screenWidth*0.8,borderRadius:20,padding:10,marginBottom:10,display:'flex',flexDirection:'column',justifyContent:'flex-start'}}>
                        <View style={{position:'absolute',borderWidth:1,borderColor:'lightgrey',top:-18,left:'48%',height:32,display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',width:32,borderRadius:50,backgroundColor:'white',shadowColor:'lightgrey'}}>
                        
                        <MaterialCommunityIcons color='grey'  name="bullhorn"  size={22} /> 
                        </View>
                        <Text style={{color:'white',textTransform:'capitalize',fontWeight:'700',textAlign:'center',marginTop:10,fontSize:16}}>{item.title}</Text>
                        <Text style={{color:'white',textTransform:'capitalize',marginTop:10,fontSize:14,textAlign:'center'}}>{item.details}</Text>
                    </View>
        )    
            
        
}
const renderEventList = ({item}) => {
    const found=item.members.indexOf(uid)
    console.log(found)
    return(
               
                
                <View style={{ position:'relative',backgroundColor:'white',height:'auto',borderRadius:15,padding:15,marginBottom:15,width:'auto',display:'flex',flexDirection:'column',justifyContent:'space-around',alignItems:'flex-start'}}>
                    <MaterialCommunityIcons color='grey' name="calendar"  size={25} /> 
                    <View style={{position:'absolute',top:20,right:25,backgroundColor:'grey',padding:3,borderRadius:10,}}>
                        <Text style={{color:'white'}}>{item.members.length<1?'No members':item.members.length==1?'One Member':item.members.length+' '+'members'}</Text>
                    </View>
                    <Text style={{color:'black',textTransform:'capitalize',marginTop:10,fontSize:16}}>{item.title}</Text>
                    <Text style={{color:'grey',textTransform:'capitalize',marginTop:10,fontSize:15}}>Date: 27-08-19</Text>
                    <Text style={{color:'grey',textTransform:'capitalize',marginTop:10,fontSize:15}}>Time: 06:19</Text>
                    {
                        found>=0?
                        <TouchableOpacity disabled style={{alignSelf:'flex-end',padding:6,borderColor:'lightgreen',width:70,borderWidth:1,borderRadius:10}}>
                        <Text style={{textAlign:'center',color:'lightgreen'}}>Joined</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={()=>JoinEvent(item.title,item.members)} style={{alignSelf:'flex-end',padding:6,borderColor:blue,width:70,borderWidth:1,borderRadius:10}}>
                        <Text style={{textAlign:'center',color:blue}}>Join</Text>
                    </TouchableOpacity>
                    }
                    
                </View>
       )
     
}
    return(
        <SafeAreaView style={styles.container}>
             <View style={styles.search}>
                <View>
                {/* <TextInput onChangeText={(e)=>{setSearch(e),setCancel(true)}} value={search} placeholderTextColor="white" placeholder="Search Videos" style={{fontSize:15,paddingLeft:30,width:screenWidth*0.80,borderRadius:50,borderColor:"rgb(0,122,255)",height:screenHeight*0.055,backgroundColor:"gainsboro"}}  /> */}
                <Text style={{fontSize:20,width:screenWidth*0.75,}}>Events</Text>
                </View>
                <TouchableOpacity onPress={()=>{navigation.navigate('Home')}}>
                <Text>
                <MaterialCommunityIcons name="arrow-left" color={"rgb(0,122,255)"} size={30} />
                </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.announce}>
            <Text style={{fontSize:17,color:'grey',marginBottom:15}}>Announcements</Text>
            <FlatList
            horizontal
            data={announcements}
            renderItem={renderAnnounceList}
            keyExtractor={item => item.title}
        
         />
                
               
            </View>
            <View style={styles.events}>
            <Text style={{fontSize:17,color:'grey',marginBottom:15}}>Upcoming Events</Text>
            <FlatList
                style={{height:screenHeight*0.35}}
                data={events}
                renderItem={renderEventList}
                keyExtractor={item => item.title}
            
             />
            </View>



        </SafeAreaView>

    )
}

export default Events;