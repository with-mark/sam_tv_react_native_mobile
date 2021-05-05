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
        height:'12%',borderBottomWidth:1,borderColor:"gainsboro",justifyContent:'space-around',alignItems:'center',flexDirection:'row'
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
          let status=snapshot.data()
          setVids(status.allVideos)
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
        <Text style={{fontSize:20,width:screenWidth*0.75,}}>Recorded Sermons</Text>
        </View>
        <TouchableOpacity onPress={()=>{navigation.navigate('Home')}}>
        <Text>
        <MaterialCommunityIcons name="arrow-left" color={"rgb(0,122,255)"} size={30} />
        </Text>
        </TouchableOpacity>
        </View>
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
      </SafeAreaView>
     
  )
};
;