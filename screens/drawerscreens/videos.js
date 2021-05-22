import React,{useState,useEffect} from 'react';
import {SafeAreaView, Text,View,StyleSheet,Dimensions,TouchableOpacity ,FlatList, } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const blue = "rgb(0,122,255)"
const styles = StyleSheet.create({
    container: {
        flex:1
    },
    itemx: {
        height:370,
        borderBottomWidth:1,
        borderColor:"lightgrey",
        backgroundColor:'gainsboro',
        flexDirection:"column",
        justifyContent:"space-around",
        
        alignItems:"center"
    
    
      },
      title: {
        fontSize: 18,
        paddingBottom:10,
        fontWeight:'500',
        textAlign:'center',
        textTransform:'capitalize',
      display:'flex',
      flex:1,
      flexDirection:'column',
      color:'#232323'
       
      },
      buttonGroup:{
        width:screenWidth,
      },
      message: {
        fontSize: 14,
        paddingLeft:10,
        color:"grey"
       
      },
      search:{
        position:'relative', height:50,borderBottomWidth:1,borderColor:"gainsboro",justifyContent:'center',alignItems:'center',flexDirection:'row'
       },
    header:{
        width:'100%',
        borderBottomWidth:1,
        borderBottomColor:'gainsboro',
        height:screenHeight*0.08,
        justifyContent:'center',
        alignItems:'flex-start'

        
    },
    body:{
        flexDirection:'column',
       justifyContent:'space-evenly',
       alignItems:'flex-start' ,
       height:screenHeight*0.5,
       paddingLeft:10
    },
    form:{
        padding:10,
        paddingLeft:20,
        paddingRight:20
    },
    scrollView: {
   
        marginHorizontal: 0,
        height:'88%'
      },
      vidListItem:{
        display:'flex',
        flexDirection:'row',
        padding:10,
        height:100,
        borderBottomWidth:1,
        borderBottomColor:'gainsboro'

      },
})

  
const VideoListItem=({ navigation,title,url,date}) =>{

  return(
    <TouchableOpacity style={styles.vidListItem} onPress={()=>{navigation.navigate('VideoDetails',{title,url,date})}}>
      <View style={{backgroundColor:'#008cb4',width:screenWidth*0.2,margin:10,height:60,borderRadius:5,display:'flex',justifyContent:'center',alignItems:'center'}}>
      <MaterialCommunityIcons color={"white"} name="play-circle-outline"  size={35} />
      </View>
    < View style={{width:screenWidth*0.8,height:'100%',padding:15}}>
      <Text style={{fontSize:16,paddingBottom:5,textTransform:'capitalize'}}>{title}</Text>
      <Text style={{fontSize:13,color:'grey'}}>{date.slice(0,15)}</Text>
    </View>
    </TouchableOpacity>
  );
}

export const Videos = ({navigation}) => {
    const [search,setSearch]= useState("")
    const [cancel,setCancel]= useState(false)
    const [done,setDone] = useState("")
    const [vids,setVids]=useState([])
    const [play,setPlay]=useState(true)
    const [pause,setPause]=useState(true)
    const [stop,setStop]=useState(true)
    const [fresh,setFresh]=useState(false)


    useEffect(()=>{
    getVideos();
    },[])

  

    getVideos =()=>{
    firestore().collection('videos').doc('cbHueVBOVEk3ioR5AYwA').onSnapshot(
      snapshot=>{
          let status=snapshot?snapshot.data():null
          if(status===null){

          }else{
          setVids(status.allVideos)
          setFresh(false)
          }
      }
    )
    
  }

    const renderItem = ({ item }) => {
      var format = new Date(item.date).toString();
      return(
        <VideoListItem navigation={navigation} title={item.title} url={item.url}  date={format} />
       
      );}
  return(
      <SafeAreaView style={styles.container}>
         <View style={styles.search}>
        <View>
        {/* <TextInput onChangeText={(e)=>{setSearch(e),setCancel(true)}} value={search} placeholderTextColor="white" placeholder="Search Videos" style={{fontSize:15,paddingLeft:30,width:screenWidth*0.80,borderRadius:50,borderColor:"rgb(0,122,255)",height:screenHeight*0.055,backgroundColor:"gainsboro"}}  /> */}
        <Text style={{fontSize:18,}}>Recorded Sermons</Text>
        </View>
        <TouchableOpacity style={{position:'absolute',left:10,top:10}} onPress={()=>{navigation.toggleDrawer()}}>
        <Text >
        <MaterialCommunityIcons name="menu" color='grey' size={30} />
        </Text>
        </TouchableOpacity>
        </View>
        
        {
          vids.length!=0?
          <FlatList
          data={vids}
          renderItem={renderItem}
          keyExtractor={item => item.title}
          onRefresh={()=>{
             setFresh(true)
             getVideos();
        
        }}
        
        refreshing={fresh}
    />
          :
          <View style={{width:screenWidth,height:screenHeight*0.4,display:'flex',justifyContent:'center',alignItems:'center'}}>

            <View style={{ width: screenWidth, height: 150, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <MaterialCommunityIcons color='grey' size={40} name="timer-sand-empty" />
              <Text style={{ marginTop: 10, color: 'grey' }}>No Videos</Text>
            </View>

          </View>


        }

        <View style={{width:screenWidth,height:95,backgroundColor:'#ffebee'}}>
          <TouchableOpacity onPress={()=>{navigation.navigate('Create')}} style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
          <View style={{width:'90%',height:'80%',backgroundColor:'#d32f2f',borderRadius:20,display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
              <Text style={{color:'white',fontWeight:'bold',}}>Watch The Recent Youtube Live</Text>
              <View style={{width:60,height:50,backgroundColor:'white',borderRadius:10,display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <MaterialCommunityIcons size={25} name='play' color='#d32f2f' />
              </View>
              
          </View>
          </TouchableOpacity>

        </View>
        
      </SafeAreaView>
     
  )
};
;