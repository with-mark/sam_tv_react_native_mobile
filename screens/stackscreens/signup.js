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
  Touchable
  ,ImageBackground,
  Alert,Modal,ActivityIndicator,
  Pressable,KeyboardAvoidingView
} from 'react-native';
import {AvatarSignUp} from '../../components/avatar';
import auth from '@react-native-firebase/auth';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const blue = "rgb(0,122,255)";
const fontColor = "white";
import axios from 'axios';
import FormData from 'form-data';
import {Store} from '../../components/async'
import {PostWithImage,Get,Post,REACT_APP_API_URL} from './../api';
//import PushNotificationIOS from '@react-native-community/push-notification-ios';

const SignUp = ({navigation})  => {

  // const [username,setUsername]=useState("")
  // const [usernameError,setUsernameError]=useState("")
  const [password,setPassword]=useState("")
  const [confirmPassword,setConfirmPassword]=useState("")
  const [confirmPasswordError,setConfirmPasswordError]=useState("")
  const [passwordError,setPasswordError]=useState("")
  // const [profileImage,setProfileImage]=useState({})
  // const [headerImage,setHeaderImage]=useState({})
  const [emailError,setEmailError]=useState("")
  const [email,setEmail]=useState("")
  // const [role,setRole]=useState("")
  // const [description,setDescription]=useState("")
  const [modalVisible, setModalVisible] = useState(false);
  // const [disabled, setDisabled] = useState(false);

  function password_validate(pass) {
    var re = {
        'capital' : /[A-Z]/,
        'digit'   : /[0-9]/,
        'symbol'   : /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
        'full'    : /[A-Za-z0-9]{7,13}$/
    };
    return re.capital .test(pass) && 
           re.digit   .test(pass) && 
           re.symbol  .test(pass) && 
           re.full    .test(pass);
}



  // const getUserEmail = async(keyword) => {
  //   const url = `users?email=${keyword}`
  //   const find = await Get(url)
  //   console.log(find[0])
  //   if (find[0] !== undefined){
  //       setEmailError("email already exists")
  //   }else{
  //     setEmailError("")
  //   }

  // }
 


  // useEffect(()=>{
  //   const d = getUserEmail(email)
    
  
  // },[email])



  useEffect(()=>{
    const d = password_validate(password)
   if(!d && password!==""){
     setPasswordError("weak password")
   }else{
     setPasswordError("")
   }
  },[password])

  
  useEffect(()=>{
    const d = password_validate(password)
   if(password !== confirmPassword){
     setConfirmPasswordError("confirm password is different from password")
   }else{
     setConfirmPasswordError("")
   }
  },[confirmPassword])


 const signup = async() =>{
  setModalVisible(true)
  if(emailError || !email ||!password  ||confirmPasswordError ){
   if(!password || !email  ){
     Alert.alert('Missing email or password')
   }else if (emailError){
      Alert.alert(emailError)
   }else if (confirmPasswordError){
    Alert.alert(confirmPasswordError)
 }
    setModalVisible(false)
    return
  }

  try {
    //   const log = await Post(url,body)
    //   const saveValue = await Store("token",log.jwt)
    //   const getValue = await Store("user",JSON.stringify(log.user))
    auth().createUserWithEmailAndPassword(email, password)
    .then((response) => {
      console.log('User account created & signed in!');
      const getValue = Store("user",JSON.stringify(response.user))
      const updated=Store("updated",JSON.stringify(false))
      setModalVisible(false)
      navigation.navigate("Drawer")
      

    })
    .catch(error => {
      
      if (error.code === 'auth/invalid-email') {
        Alert.alert('That email address is invalid!');
      }
      setModalVisible(false)
      console.error(error);
    });
      
    } catch (error) {
    //   Alert.alert("Login Error","Wrong credentials")
    //   setModalVisible(false)
     }  
   
//   console.log(username)
//   const url = "auth/local/register";
//   const body ={
//       username,
//       password,
//       email,
//       roles:role,
//       description,
     

//   }

//   var formData = new FormData();
 
//  // formData.append('profile_picture',  {uri: profileImage.path, name:`username${profileImage.modificationDate}`, type: 'image/jpg'});
//  // formData.append('header_picture',  {uri: headerImage.path, name:`username${headerImage.modificationDate}`, type: 'image/jpg'});
//   formData.append('email', email);
//   formData.append('username', username);
//   formData.append('password', password);
//   formData.append('roles', role);
//   formData.append('description', description);
  

//   axios.post(`${REACT_APP_API_URL}/auth/local/register`, formData)

//   .then(res => {
     
//       return res
//   })
//   .then(refId =>{
//     const Do = async() =>{
//       const saveValue = await Storage.Store("token",refId.data.jwt)
//       const getValue = await Storage.Store("user",JSON.stringify(refId.data.user))
//     }
//    Do();
//     const data = new FormData();
//     data.append('files', { uri:profileImage.path, name: 'image.jpg', type: 'image/jpeg' },)
//   data.append('ref', 'user') // optional, you need it if you want to link the image to an entry
//   data.append('refId', refId.data.user.id) // optional, you need it if you want to link the image to an entry
//   data.append('field', 'profilePicture')
//   //For amazon: data.append('field', 'profile_picture') // optional, you need it if you want to link the image to an entry
//   data.append('source', 'users-permissions');
 
//     const res =   axios.post(`${REACT_APP_API_URL}/upload`, data, {headers: {'Content-Type': 'multipart/form-data',Authorization: `Bearer ${refId.data.jwt}`}}) 
 
//  return refId
        
// })
// .then(refId =>{
 

//   const formData = new FormData();
//   formData.append('files', { uri:headerImage.path, name: 'image.jpg', type: 'image/jpeg' },)
// formData.append('ref', 'user') // optional, you need it if you want to link the image to an entry
// formData.append('refId', refId.data.user.id) // optional, you need it if you want to link the image to an entry

// formData.append('field', 'headerPicture') 
// //For amazon: formData.append('field', 'header_picture') // optional, you need it if you want to link the image to an entry
// formData.append('source', 'users-permissions');

//   const rest =   axios.post(`${REACT_APP_API_URL}/upload`, formData, {headers: {'Content-Type': 'multipart/form-data',Authorization: `Bearer ${refId.data.jwt}`}}) 

//   Alert.alert("registered successfully")
//   setModalVisible(false)
//   navigation.navigate("Drawer")
      
// })
// .catch(error =>{
//     console.log(error);
// })    

//  /*            
//   }) */
  
  
  
 
 }

 







 const signin = () =>{
 navigation.navigate("Login")
 }

  return (
    <>
     
      <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
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
            <View style={{justifyContent:"center",height:screenHeight*0.1,backgroundColor:"white",width:screenWidth*0.8}}>
           <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
           <ActivityIndicator size="large" color={blue} />
            <Text style={styles.modalText}>Loading</Text>
           </View>
          
          
            </View>
        
           
          </View>
        </View>
      </Modal>
        <ScrollView style={styles.scrollView}>
       <View style={styles.form}>
         <View style={styles.back} >
          <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Text style={{color:blue,paddingLeft:10}}>
              Go Back
           </Text>
            </TouchableOpacity> 
         </View>
        
         <TouchableOpacity  >

          
          
          </TouchableOpacity>
        
    
         <Text style={{marginTop:screenHeight*0.05,color:"grey"}}>
           Enter your details below to get started
         </Text>
        {/* <Text style={{width:'100%', textAlign:'left',padding:10}}>FullName</Text> */}
           {/* <TextInput placeholderTextColor={"grey"} onChangeText={(e)=>{setUsername(e)}}  style={styles.inputone}  placeholder="Enter Your Full Name "/>  */}
           {/* {usernameError?<Text style={styles.error}>{usernameError}</Text> :<Text></Text>}  */}
           <Text style={{width:'100%', textAlign:'left',padding:10}}>Email</Text>
          <TextInput placeholderTextColor={"grey"} onChangeText={(e)=>{setEmail(e)}} style={styles.input}   placeholder="Enter your Email"/>
          {emailError?<Text style={styles.error}>{emailError}</Text> :<Text></Text>}
          <Text style={{width:'100%', textAlign:'left',padding:10}}>Password</Text>
        <TextInput placeholderTextColor={"grey"} onChangeText={(e)=>{setPassword(e)}} style={styles.input} secureTextEntry={true}  placeholder="Enter Password"/>
        {passwordError?<Text style={styles.error}>{passwordError}</Text> :<Text></Text>}
        <Text style={{width:'100%', textAlign:'left',padding:10}}>Confirm Password</Text>
        <TextInput placeholderTextColor={"grey"} style={styles.input} secureTextEntry={true}  onChangeText={(e)=>{setConfirmPassword(e)}} placeholder="Confirm Password"/>
        {confirmPasswordError?<Text style={styles.error}>{confirmPasswordError}</Text> :<Text></Text>}
        
        {/* <TextInput placeholderTextColor={"grey"} onChangeText={(e)=>{setRole(e)}} style={styles.input}  placeholder="role (optional)"/> */}
        {/* <Text></Text> */}
        {/* <TextInput placeholderTextColor={"grey"}  onChangeText={(e)=>{setDescription(e)}} style={styles.inputtwo} multiline={true} numberOfLines={5}   placeholder="description about you (optional)"/> */}
        {/* <Text></Text> */}
        <TouchableOpacity onPress={()=> signup()}><View style={styles.button}><Text style={styles.text} >Sign Up</Text></View></TouchableOpacity>

     
       
       
   
        

        
       

       </View>
    
      
   
  
        </ScrollView>
       
    
      </KeyboardAvoidingView >
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "white",
   
  },error:{
    width:screenWidth*0.8,
    textAlign:"left",
    color:"red"
  },
  back:{
    height:screenHeight*0.05,
    justifyContent:"center",
    alignItems:"flex-start",
     width:"100%",
     marginTop:50
  },
  input:{
      borderWidth:1,
      borderColor:"gainsboro",
      width:screenWidth*0.9,
      margin:10,
      textAlign:"left",
      paddingLeft:10,
      borderRadius:10,
      backgroundColor:"#F8F8F8",
      height:50
  },
  inputone:{
    borderWidth:1,
    borderColor:"gainsboro",
    width:screenWidth*0.9,
    margin:10,
    textAlign:"left",
    paddingLeft:10,
    
    borderRadius:10,
    backgroundColor:"#F8F8F8",
    height:50
},
inputtwo:{
  borderWidth:1,
  borderColor:"gainsboro",
  width:screenWidth*0.9,
  margin:10,
 height:screenHeight*0.1,
  borderRadius:10,
  backgroundColor:"#F8F8F8",
  padding:10
},
  button:{
    borderWidth:1,
    borderColor:"gainsboro",
    width:screenWidth*0.9,
    height:50,//screenHeight*0.06,
    margin:10,
    textAlign:"center",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:blue,
    borderRadius:10
   

  },
  text:{
    color:fontColor
  },
  header:{
    width:screenWidth,
    height:screenHeight*0.2,
    backgroundColor:blue,
    justifyContent:"flex-start",
    alignItems:"center",
    paddingTop:30,
    paddingRight:5
   
  },
  scrollView: {
 
    marginHorizontal: 0,
    height:'100%',
    width:"100%"
  },
  form:{
    height:"auto",
    width:"100%",
    position:"relative",
    zIndex:0,
    alignItems:"center"
    
  },
  avatar:{
    position:"absolute",
    top:screenWidth*0.42,
    left:0,
    borderBottomColor:"gainsboro",
    width:screenWidth,
    justifyContent:"center",
    alignItems:"center"
 
   

  }
  ,
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
    
  }
  
});

export default SignUp;
