import React,{useState,useEffect} from 'react';
import { Text,View,StyleSheet,ImageBackground,ActionSheetIOS,ScrollView,Dimensions,TouchableOpacity,SafeAreaView ,TextInput, Alert} from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
import * as Store  from "../../components/async";
import auth from '@react-native-firebase/auth'
import storage from '@react-native-firebase/storage'
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Snackbar from 'react-native-snackbar';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import profile from './../images/profilepic.png'
import { firebase } from '@react-native-firebase/firestore';

const blue = "rgb(0,122,255)";


const styles = StyleSheet.create({
    container: {
      flex: 1,
      position:'relative'
     
    },
    search:{
      height:80,borderBottomWidth:1,borderColor:"gainsboro",justifyContent:'space-around',alignItems:'center',flexDirection:'row'
    },
    scrollView: {
        alignItems:'stretch',
        marginHorizontal: 0,
        height:'75%',
        width:screenWidth
      },
      item:{
          borderBottomColor:"gainsboro",
          borderBottomWidth:1,
          width:screenWidth,
          height:40,
          display:'flex',
          backgroundColor:'#ff3319',
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center'


          //justifyContent:"fl"
      },
      error:{
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
        marginTop:20,
        borderRadius:10,
        backgroundColor:"#F8F8F8",
        height:50
    },
    inputtwo:{
      borderWidth:1,
      borderColor:"gainsboro",
      width:screenWidth*0.9,
      margin:10,
     height:50,
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
        color:"white"
      },
      header:{
        width:screenWidth,
        height:100,
        backgroundColor:blue,
        justifyContent:"flex-start",
        alignItems:"center",
        paddingTop:30,
        paddingRight:5
       
      },
      scrollView: {
     
        marginHorizontal: 0,

      },
      form:{
        height:"auto",
        width:"100%",
        position:"relative",
        zIndex:0,
        alignItems:"center"
        
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
    
      textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
      },

  });

export const Settings = ({navigation}) => {
 const [username,setUsername]=useState('')
  const [count,setount]=useState(0)
  const [uid,setUID]=useState('')
  const [emailError,setEmailError]=useState("")
  const [email,setEmail]=useState('')
  const [full, setFull] = useState({});
const [photoUrl,setPhotoUrl]=useState('')
  // const [image, setImage] = useState("https://reactjs.org/logo-og.png");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);


  const selectImage = () => {
    const options = {
      maxWidth: 300,
      maxHeight: 300,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log(source);
        setImage(source);
      }
    });
  };
  const snapImage = () => {
    const options = {
      maxWidth: 300,
      maxHeight: 300,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log(source);
        setImage(source);
      }
    });
  };
  
const getU = async() =>{
  const user= await Store.Get("user")
  const prof=await Store.Get("profile")
  
  console.log(user)
   const userObj=JSON.parse(user)
   const profile=JSON.parse(prof)
   setUsername(userObj.displayName)
   setEmail(userObj.email)
   setImage(profile)
   setUID(userObj.uid)

  console.log('This is in the function',user)
}


useEffect(()=>{
  getU();
 
  // let uss=await user;


  },[])

  const uploadImage = async () => {
    const { uri } = image;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const saved=Store.Store('profile',JSON.stringify(image))
    setUploading(true);
   const storageRef=storage()
   .ref(uid+'/profile/'+filename)
    const task = storageRef.putFile(uploadUri);
  
  
    try {
      await task;
      var dUrl=await storageRef.getDownloadURL()
      console.log('url',dUrl)
      firebase.firestore().collection('profileImages').doc(uid).set({
        user:uid,
        profile:dUrl
      })
      
    } catch (e) {
      console.error(e);
    }
  
    setUploading(false);
  
    Alert.alert(
      'Photo uploaded!',
      'Your photo has been uploaded to Firebase Cloud Storage!'
    );
  
  };
  
  

 


const logout = async() =>{
  const signout = await Store.Remove("token")
  const signoutuser = await Store.Remove("user")
  const profileTakeaway = await Store.Remove("profile")
  auth().signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
  navigation.navigate("Login")
}




const edit = async() =>{
  //setModalVisible(true)
  if(username===''){
    Snackbar.show({
      text: 'Username cannot be empty',
      duration: Snackbar.LENGTH_LONG,
    });
    return
  }

  uploadImage()
  var user = auth().currentUser;
 
user.updateProfile({
  displayName: username, 
}).then(function() {
  console.log('Update successful')
  Snackbar.show({
    text: 'Updated Successfully',
    duration: Snackbar.LENGTH_LONG,
  });
  const getValue=Store.Store("user",JSON.stringify(user))

}).catch(function(error) {
  // An error happened.
})
 
 }


const onPress=()=>{
  ActionSheetIOS.showActionSheetWithOptions(
    {
      options: ["Cancel", "Open Camera", "Open Photo Library"],
    
      cancelButtonIndex: 0,
      userInterfaceStyle: 'light'
    },
    buttonIndex => {
      if (buttonIndex === 0) {
        // cancel action
      } else if (buttonIndex === 1) {
        snapImage()
      } else if (buttonIndex === 2) {
        selectImage()
      }
    }
  );
}
  return(
      <SafeAreaView style={styles.container}>
        <View style={styles.search}>
        <View>
        {/* <TextInput onChangeText={(e)=>{setSearch(e),setCancel(true)}} value={search} placeholderTextColor="white" placeholder="Search Videos" style={{fontSize:15,paddingLeft:30,width:screenWidth*0.80,borderRadius:50,borderColor:"rgb(0,122,255)",height:screenHeight*0.055,backgroundColor:"gainsboro"}}  /> */}
        <Text style={{fontSize:20,width:screenWidth*0.75,}}>Edit Profile</Text>
        </View>
        <TouchableOpacity onPress={()=>{navigation.navigate('Home')}}>
        <Text>
        <MaterialCommunityIcons name="arrow-left" color={"rgb(0,122,255)"} size={30} />
        </Text>
        </TouchableOpacity>
        </View>
         <ScrollView style={{position:'relative',height:screenHeight}}>

          <View style={styles.item}>
          <TouchableOpacity style={{width:screenWidth,height:40,display:'flex',justifyContent:'center'}} onPress={()=>logout()}>
                    <Text style={{color:'white',textAlign:'center',textAlignVertical:'center'}}>
                        Logout
                    </Text>
            </TouchableOpacity>
         </View>
          
          

         <View style={{width:screenWidth,height:150,paddingLeft:20,display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'row',borderColor:"gainsboro"}}>
         <TouchableOpacity onPress={()=>onPress()} >
            <View
              style={{
                height: 100,
                width: 100,
                backgroundColor:'#008cb4',
                borderRadius: 15,
                marginRight:20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
             <ImageBackground
             source={image}
             style={{height: 100, width: 100}}
                imageStyle={{borderRadius: 15}}
             >
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                     <MaterialCommunityIcons color="#fff" name="camera"  size={35}  
                     style={{
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 10,
                    }} /> 
                 
                </View>
                </ImageBackground>
            </View>
          </TouchableOpacity>
         
         </View>
         <View style={{paddingLeft:10}}>
          <TextInput  placeholderTextColor={"grey"} value={username} onChangeText={(e)=>{setUsername(e)}} style={styles.inputone}  placeholder="username "/>
          <TextInput value={email} placeholderTextColor={"grey"} onChangeText={(e)=>{setEmail(e)}} style={styles.input}   placeholder="email"/>
          
        <TouchableOpacity onPress={()=> edit()}><View style={styles.button}><Text style={styles.text} >Edit Profile</Text></View></TouchableOpacity>

        </View>
     
             </ScrollView>
      </SafeAreaView>
  )
};
