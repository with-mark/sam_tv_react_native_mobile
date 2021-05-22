

import React, {Component} from 'react'
import {Alert, ScrollView, Text, TouchableOpacity, View,TextInput,Dimensions,SafeAreaView,FlatList,BackHandler,Animated,KeyboardAvoidingView} from 'react-native'
// Import the RtcEngine class and view rendering components into your project.
import RtcEngine, { RtcRemoteView, VideoRenderMode, ChannelProfile,ClientRole,} from 'react-native-agora'
// Import the UI styles.
import styles from './Livestyle'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Get} from '../api';
//import FloatingHearts from 'react-native-floating-hearts'
import * as Store from '../../components/async'
import firestore from '@react-native-firebase/firestore';





  const Item = ({ ch }) =>

  (
        <View style={styles.item}>
        <Text style={styles.titlex}>@{ch.username}</Text>
        <Text style={styles.title}>{ch.message}</Text>
      </View>
    
)

// Define a Props interface.
interface Props {
}
interface joinData{

}
interface chatMessages{
    message: string,
    username:string
}

// Define a State interface.
interface State {
    appId: string,
    live:string,
    channelName: string,
    token: string,
    joinSucceed: boolean,
    peerIds: number[],
    userUID:string,
    message: string,
    chatMessages: chatMessages[],
    username:string,
    room:number,
    mounted:boolean,
    joinData:joinData,
    count:number,
    showLoad:boolean

}

// Create an App component, which extends the properties of the Pros and State interfaces.
export default class Livex extends Component<Props, State> {
    _engine?: RtcEngine

    // Add a constructor，and initialize this.state. You need:
    // Replace yourAppId with the App ID of your Agora project.
    // Replace yourChannel with the channel name that you want to join.
    // Replace yourToken with the token that you generated using the App ID and channel name above.
    constructor(props) {

         
        
        super(props)
       
        this.state = {
            appId: 'c40594061e1f4580aae3b2af1963d01e',
            channelName: 'casa',
            token: "",
            joinSucceed: false,
            peerIds: [],
            username:"",
            room:1,
            joinData:{},
            message:"",
            chatMessages:[],
            count:0,
            live:"offline",
            userUID:"",
            mounted:false,
            showLoad:false,
            
          
            
        }
    }


   

   
   // Mount the App component into the DOM.
componentDidMount() {
    this.init()
    this.setState({
        mounted:true,
    })
    if(this.state.username && this.state.message ) {
        const username = this.state.username
        const message =  this.state.message
    }
    
    let x =this.receive.bind(this);
    x();



    let xx =this.receiveHeart.bind(this);
    xx();

        let v= this.getLiveStatus.bind(this)
        v();

        let y =this.getToken.bind(this);
        y();
        
        let yy =this.getUser.bind(this);
        yy();
        let yyy =this.quitOnLive.bind(this);
        yyy();

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}

componentWillUnmount(){
    this.setState(
        {
            mounted:false
        }
    )
}




handleBackButtonClick =()=> {
    this.props.navigation.goBack(null);
    this.endCall
   return true
}

getToken = async()=>{
    const url = "token"
    const s = await Get(url)
    console.log('gotem')
    this.setState({
       token:s.token
    })
}

getLiveStatus=()=>{
    firestore().collection('live').doc('M6zPN7Af72tKczD7i41E').onSnapshot(
        snapshot=>{
            if(snapshot!=null){
            let status=snapshot.data()
            console.log('changing')
            this.setState({
                live: status.live,
            })
        }
        }
    )
}

quitOnLive=()=>{
    firestore().collection('live').doc('M6zPN7Af72tKczD7i41E').onSnapshot(
        snapshot=>{
            if(snapshot!=null){
            let status=snapshot.data()
            if (status.live==="offline"){
                this.endCall()
            }
        }
    }
    )
}

getUser = async()=>{
   
    let s = await Store.Get("user")
    s =JSON.parse(s)
    let finame;
    if (s.displayName){
        finame=s.displayName
    }
    else{
        finame=s.email
    }
  this.setState({
       username:finame,
       userUID:s.uid,
    }) 
    console.log(finame)
}

   receive=()=> { 
    const collection=firestore().collection('Coments').orderBy('date','asc');
    collection
    .onSnapshot(
      snapshot=>{
        if(snapshot!=null){
        const fetchedPosts = [];
        snapshot.docs.forEach(post => {
          const fetchedPost = {
            id: post.id,
            ...post.data(),
          };
          fetchedPosts.push(fetchedPost);
        });
        // setMessages(snapshot.docs)
        
          this.setState({
            chatMessages:fetchedPosts
          })
      }
      }
    )
}


   receiveHeart=()=> { 
    
    firestore().collection('likes').doc('s8THsrRFqBHssW6MaDag')
    .onSnapshot(
      snapshot=>{
            if(snapshot!=null){
            this.setState({
            count:snapshot.data().count,
          })
          
      }
      }
    )
}
 


 onJoinSuccess =(data)=> {
  this.setState({
    JoinData:data,
    username:data.userData.username,
    room:data.userData.room,
   
  }) 
}

 handleChange = (e) => {
    this.setState({
        message:e.target.value})
  }
  
   handleClick = (e) => {
    this.sendMessage(this.state.message).bind(this);
  }
  
    sendMessage =  (message) => {
      
        const username = this.state.username
      if(this.state.message === ""){
          return;
      }


      firestore()
        .collection('Coments')
        .add({
            message: this.state.message,
            username: this.state.username,
            date:firestore.Timestamp.fromDate(new Date()),

        })
        .then(() => {
            console.log('Scentttt!');
        });
      this.setState({
          message:""
      })
         
  }

   deleteLikes = () =>{
   
    firestore()
    .collection('likes')
    .doc('s8THsrRFqBHssW6MaDag')
    .set({
        count: 0,
  
    })
    .then(() => {
        console.log('Scentttt!');
    });
  }

// Pass in your App ID through this.state, create and initialize an RtcEngine object.
init = async () => {
    const {appId} = this.state
    this._engine = await RtcEngine.create(appId)
    console.log('Created')
    // Enable the video module.
    await this._engine.enableVideo()
    // Enable the local video preview.
    await this._engine.startPreview()
    // Set the channel profile as live streaming.
    await this._engine.setChannelProfile(ChannelProfile.LiveBroadcasting)
    // Set the usr role as host.
    await this._engine.setClientRole(ClientRole.Audience)

    // Listen for the UserJoined callback.
    // This callback occurs when the remote user successfully joins the channel.
    this._engine.addListener('UserJoined', (uid, elapsed) => {
        //console.log('UserJoined', uid, elapsed)
        const {peerIds} = this.state
        //console.log(peerIds)
        if (peerIds.indexOf(uid) === -1) {
            this.setState({
                peerIds: [...peerIds, uid]
            })
        }
      
    })

    // Listen for the UserOffline callback.
    // This callback occurs when the remote user leaves the channel or drops offline.
    this._engine.addListener('UserOffline', (uid, reason) => {
        //console.log('UserOffline', uid, reason)
        const {peerIds} = this.state
        this.setState({
            // Remove peer ID from state array
            peerIds: peerIds.filter(id => id !== uid)
        })
    })

    // Listen for the JoinChannelSuccess callback.
    // This callback occurs when the local user successfully joins the channel.
    this._engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
        console.log('JoinChannelSuccess', channel, uid, elapsed)
        if (channel==='casa'){
            this.setState({
                joinSucceed: true
            })
        }
        else{
            Alert.alert("Pastor is yet to go live")
        }
       
    })
}

// Pass in your token and channel name through this.state.token and this.state.channelName.
// Set the ID of the local user, which is an integer and should be unique. If you set uid as 0,
// the SDK assigns a user ID for the local user and returns it in the JoinChannelSuccess callback.

startCall = async () => {
 const online=await Store.Get('live')
    if(online==="online"){
        this.setState({
            showLoad:true
        })
        console.log(this.state.token)
        await this._engine.joinChannel(this.state.token, this.state.channelName, null, 0).then(()=>{
            console.log('suceeded')
        }).catch((error)=>{
                console.log(error.message)
        })
    }else{
         Alert.alert('No Stream Available', `Watch Past Sermons`, [
            {
                text: 'Go Back',
                onPress: ()=>{
                    this.props.navigation.navigate('Home');
                },
            },
            {
              text: 'Watch',
              onPress: ()=>{
                  this.props.navigation.navigate('Videos');
              },
              
            },
            
          ]);
    }
  
}


 sendHeart = ()=>{
    
    firestore()
        .collection('likes')
        .doc('s8THsrRFqBHssW6MaDag')
        .update({
            count: this.state.count+1

        })
        .then(() => {
            console.log('Scentttt!');
        });
  
 }



_renderVideos = () => {
    const renderItem = ({ item }) => (
        <Item ch={item} />
      );
      const {peerIds} = this.state
     
    const {joinSucceed} = this.state
    return joinSucceed ?
        
        <View style={{...styles.fullView,position:'relative'}}>
              {peerIds.map((value, index, array) => { return(
              
            <RtcRemoteView.SurfaceView
                style={styles.maxs}
                uid={value}
                channelId={this.state.channelName}
                renderMode={VideoRenderMode.Hidden}/>
                
                )})}

                <KeyboardAvoidingView  keyboardVerticalOffset={70} behavior={"padding"} style={{ position : "absolute",flexDirection:"row",justifyContent:"space-around",alignItems:"flex-end",width:screenWidth,backgroundColor:"transparent",bottom:screenHeight*0.08,left:0,right:0,height:screenHeight*0.5,elevation:1,zIndex:1}} >
                    <TextInput style={{color:"white",borderColor:"white",borderWidth:1,width:screenWidth*0.77,borderRadius:30,paddingLeft:20,height:50,zIndex:13,}} placeholderTextColor="white" placeholder="Comment here"  autoCorrect={false}
                        value={this.state.message}
                        onSubmitEditing={() => this.sendMessage(this.state.message)}
                        onChangeText={message => {
                            this.setState({message});
                        }} />
          
       
                    <TouchableOpacity style={{marginBottom:10,zIndex:13,elevation:13}} onPress={() => this.sendMessage(this.state.message)}><MaterialCommunityIcons  color={"white"} name="send-outline" size={30}/></TouchableOpacity>

      {/* <View style={{borderColor:"white",borderWidth:0,left:screenWidth*0.65, position : "absolute",top:screenHeight*0.34,flexDirection:"row",justifyContent:"space-around",alignItems:"center",width:screenWidth*0.5,height:screenHeight*0.55}}> 
      <FloatingHearts 
          count={this.state.count} 
        color={"rgb(0,122,255)"}
        />
      </View> */}
                </KeyboardAvoidingView>

            


                <TouchableOpacity onPress={()=>{this.endCall()}} style={{ position : "absolute",top:screenHeight*0.04,left:screenWidth*0.9,borderColor:"white",borderWidth:1,width:25,height:25,borderRadius:40,justifyContent:"center",alignItems:"center",paddingBottom:5,elevation:18,zIndex:18}}>
               <Text style={{color:"white"}}>x</Text> 
                </TouchableOpacity>
                <KeyboardAvoidingView  keyboardVerticalOffset={130} behavior={"padding"} style={{borderColor:"white",borderWidth:0,right:screenWidth*0.5, position : "absolute",top:screenHeight*0.34,flexDirection:"row",justifyContent:"space-around",alignItems:"center",width:screenWidth*0.5,height:screenHeight*0.35,zIndex:2,elevation:2}}>
                   
                <FlatList
               
        data={this.state.chatMessages}
        renderItem={renderItem}
        
        ref="flatList"
        onContentSizeChange={()=> this.refs.flatList.scrollToEnd()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
       
      />
                </KeyboardAvoidingView>
        </View>
        
  :null
}

_renderButton = () => {
    const {joinSucceed,showLoad} = this.state
    return joinSucceed ? null :(
        showLoad? 
        <View style={styles.buttonHolder}>
         <Text style={{fontSize:16,color:'#0093E9'}}>Joining Live</Text>       
        </View>
        :  
        <View style={styles.buttonHolder}>
        <TouchableOpacity
            onPress={this.startCall}
            style={styles.button}>
            <Text style={styles.buttonText}> Stream Service </Text>
        </TouchableOpacity>
        </View>

        
        
    )
}



_renderRemoteVideos = () => {
    const {peerIds} = this.state
    const {joinSucceed} = this.state

    return joinSucceed ? 
     (
        <ScrollView
          style={styles.fullView}
            contentContainerStyle={{paddingHorizontal: 2.5}}
            horizontal={true}>
            {peerIds.map((value, index, array) => {
                return (
                    // Set the rendering mode of the video view as Hidden, 
                    // which uniformly scales the video until it fills the visible boundaries.
                    <RtcRemoteView.SurfaceView
                        style={ styles.maxs}
                        uid={value}
                        key={index}
                        channelId={this.state.channelName}
                        renderMode={VideoRenderMode.Hidden}
                        zOrderMediaOverlay={true}/>
                )
            })}
        </ScrollView>
    ):null
}


endCall = async () => {

    await this._engine?.leaveChannel()
    this.setState({peerIds: [], joinSucceed: false, chatMessages:[]})
    this.getToken();
    this.props.navigation.goBack();
    this.setState({
        showLoad:false
    })
   
}


render() {

   

    return (
     
            <SafeAreaView style={styles.max}>
             { !this.state.joinSucceed &&  <View style={{...styles.header,display:'flex',zIndex:-1,backgroundColor:'white',position:'relative'}}>
        <View style={{position:'absolute',top:20,left:15}}>
        <TouchableOpacity style={{width:screenWidth*0.1,}} onPress={()=>{this.props.navigation.goBack()}}>

        <MaterialCommunityIcons name="chevron-left" color='grey' size={35} />
       
        </TouchableOpacity>
        </View>
        <Text style={{textTransform:'capitalize',fontSize:18}}>Join Stream</Text>
        </View>}
               
                {this._renderButton()}
                {this._renderVideos()}
              
               
        
            </SafeAreaView>
           
        
    )
}
}