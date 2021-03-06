import React,{useState,useEffect} from 'react';
import { View, KeyboardAvoidingView, TextInput, TouchableOpacity,StyleSheet, Text,Dimensions } from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
import {Get} from '../../api'
import { WebView } from 'react-native-webview';
import YouTube from 'react-native-youtube';

function CreateWord({navigation}) {

const [token,setToken] = useState('')
const [count,setCount] = useState(0)
const [state,setState]=useState({
  isReady:false,
  status:'',
  quality:'',
  error:''
})
const blue = "rgb(0,122,255)"

const check = async() =>{
  const url= "youtube"
  const tokens = await Get(url);
  const id=tokens.link.slice(32)
  setToken(id)

}






useEffect(()=>{
check();

return()=>{
  console.log('Done Checking')
}
},[count])

// eU4992Yo2_s
  return (
   
    <View style={styles.container}>
      <View style={{height:80,backgroundColor:"white",justifyContent:"flex-end",padding:10}}> 
      <TouchableOpacity onPress={()=>navigation.goBack()}><Text style={{color:"blue"}}>Go Back </Text></TouchableOpacity>
      </View>
        {
          token?
          // <WebView source={{ uri: token}} />
          <YouTube
            videoId={token} // The YouTube video ID
            play // control playback of video with true/false
            fullscreen // control whether the video should play in fullscreen or inline
            //loop // control whether the video should loop when ended
            onReady={e => setState({ isReady: true })}
            onChangeState={e => setState({ status: e.state })}
            
            onChangeQuality={e => setState({ quality: e.quality })}
            onError={e => setState({ error: e.error })}
            style={{ alignSelf: 'stretch', height: screenHeight*0.88 ,backgroundColor:'black'}}
          />
        
        :
        null
        } 
        </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position:'relative'
   
  },
  inner: {
    padding: 4,
  
    justifyContent: "space-around",
    height:screenHeight*0.4,
    alignItems:'center'
  },
  header: {
    fontSize: 20,
    margin:40,
    backgroundColor:"rgb(0,122,255)",
    color:"white",
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight:10,
    paddingLeft:10,
    borderRadius:40
   
  },
  textInput: {
    height: 180,
    borderColor: "gainsboro",
    borderBottomWidth: 1,
    marginBottom: 36,
    width:screenWidth-1
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
    marginBottom:15
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    width:screenWidth*0.2,
    height:10,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonx: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width:screenWidth*0.3
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize:25,
    paddingTop:15,
    paddingLeft:15
    
  },
  backgroundVideo: {
  height:screenHeight
  },
});

export default CreateWord;