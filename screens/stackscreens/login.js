/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  ImageBackground,Image,
  KeyboardAvoidingView,
  Modal,ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import GroupImage from '../images/groupimage'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const blue = "rgb(0,122,255)";
const fontColor = "white";
import {Post} from '../api';
import {Store,Get} from '../../components/async'
import { firebase } from '@react-native-firebase/firestore';

const Login = ({navigation})  => {
  const [modalVisible, setModalVisible] = useState(false);
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const check = async() =>{
    const user = await Get('user');
    if (user) {
       // storeUser(user)
       navigation.navigate("Drawer")
      } else {
        navigation.navigate("Login")
       return
      }
}
 useEffect(()=>{
 
check();
 },[])

 const signin = async() =>{
  setModalVisible(true)

  try {
  auth().signInWithEmailAndPassword(username, password)
  .then((response) => {
    console.log('User account created & signed in!');
    Alert.alert('Welcome to SamTV Live')

    firebase.firestore().collection('profileImages').doc(response.user.uid)
    .onSnapshot(
      snapshot=>{
      if(snapshot.data()){ 
       const src={uri:snapshot.data().profile}
       const getValue = Store("profile",JSON.stringify(src))
      }
      else{
        console.log('Ive got nothing')
      }
      }
    
    )
    const getValue = Store("user",JSON.stringify(response.user))
    setModalVisible(false) 
    navigation.navigate("Drawer")
  })
  .catch(error => {
    
    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
      Alert.alert(error.code)
    }

    Alert.alert(error.message)
  });
    
  } catch (error) {

   }  
 
   setModalVisible(false) 

 
 }

 const signup = () =>{
    navigation.navigate("SignUp")
   }

  return (
    <>
      <StatusBar barStyle="dark-content" />
     
     <ImageBackground blurRadius={1.3} source={require('../images/edwin.jpg')} style={styles.container}>
     <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
         
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{justifyContent:"center",height:screenHeight*0.08,backgroundColor:"white",width:screenWidth*0.6,borderRadius:10,opacity:1}}>
           <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
           <ActivityIndicator size="large" color={blue} />
            <Text style={styles.modalText}>Loading</Text>
           </View>
          
          
            </View>
        
           
          </View>
        </View>
      </Modal>
      <Image resizeMode={"contain"} style={{width:100,height:100,padding:0,borderWidth:0,borderColor:"white",marginBottom:20}}  source={require('../images/sam-5.png')} />
      
        <TextInput value={username}  onChangeText={(e)=>{setUsername(e)}} style={styles.input}  placeholder="email"  placeholderTextColor={"grey"}/>
        <TextInput value={password} onChangeText={(e)=>{setPassword(e)}} style={styles.input} secureTextEntry={true}  placeholder="password" placeholderTextColor={"grey"} />
        <TouchableOpacity onPress={()=> signin()}><View style={styles.button}><Text style={styles.text} >Login</Text></View></TouchableOpacity>

        <View>
          <TouchableOpacity onPress={()=> signup()}>
          <Text style={{color:"white"}}>
            Don't have an account, sign up here
          </Text>
          </TouchableOpacity>
         
        </View>
     </ImageBackground>
    
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lighter,
    justifyContent:"center",
    alignItems:"center",
    height:screenHeight,
    width:screenWidth,
    paddingBottom:70
  },
  input:{
      borderWidth:1,
      borderColor:"gainsboro",
      width:screenWidth*0.8,
      margin:5,
      textAlign:"left",
      paddingLeft:10,
      borderRadius:10,
      backgroundColor:"white",
      height:50
     
  },
  button:{
    borderWidth:1,
   
    width:screenWidth*0.8,
    height:50,//screenHeight*0.06,
    margin:10,
    marginTop:30,
    textAlign:"center",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:blue,
    borderRadius:10,
    
   

  },
  text:{
    color:fontColor
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
 width:screenWidth,
    height:screenHeight,
    margin: 20,
    marginBottom:90,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
    elevation: 5,
    justifyContent:"center",
  
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
    fontSize:15,
    paddingTop:15,
    paddingLeft:15
    
  }
  
  
});

export default Login;
