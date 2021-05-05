import RtcEngine,{ ChannelProfile,RtcLocalView,ClientRole, RtcRemoteView  } from "react-native-agora";
import React, { useEffect,useState, useRef } from "react";
import { PermissionsAndroid,Platform ,View,Text,ActivityIndicator,StyleSheet ,Dimensions} from "react-native";
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
    loadingText: {
        fontSize: 18,
        color: '#222',
      },
      fullscreen: {
        width: screenWidth,
        height: screenHeight,
      },
})
async function requestCameraAndAudioPermission() {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
      if (
        granted["android.permission.RECORD_AUDIO"] === PermissionsAndroid.RESULTS.GRANTED &&
        granted["android.permission.CAMERA"] === PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log("You can use the cameras & mic");
      } else {
        console.log("Permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }
export default function StartLive(props) {
    const [joined, setJoined] = useState(false);
    const AgoraEngine = useRef();
  
    const init = async () => {
      AgoraEngine.current = await RtcEngine.create("c40594061e1f4580aae3b2af1963d01e").then(()=>console.log('yipeee'));
      console.log('created')
      AgoraEngine.current.enableVideo();
      AgoraEngine.current.setChannelProfile(ChannelProfile.LiveBroadcasting);
      AgoraEngine.current.setClientRole(ClientRole.Broadcaster);
      
      AgoraEngine.current.addListener("JoinChannelSuccess", (channel, uid, elapsed) =>{
        console.log("JoinChannelSuccess", channel, uid, elapsed);
        setJoined(true);
      });
      console.log(AgoraEngine.current);
    };
  
    useEffect(() => {
        const runit= async ()=>{
            if (Platform.OS === 'android') await requestCameraAndAudioPermission();
            console.log('Irun maybe')
            init().then(() => AgoraEngine.current.joinChannel(null, "casa", null, 1)).catch(()=>console.log('Failed'));   
        }
        runit()
        
        return () => {
          AgoraEngine.current.destroy();
        };
      }, []);
  
      return (
        <View style={styles.container}>
          {!joined ? (
            <>
            <View style={{width:screenWidth,height:screenHeight,display:'flex',justifyContent:'center',alignItems:'center'}}>
              <ActivityIndicator
                size={60}
                color="#222"
                style={styles.activityIndicator}
              />
              <Text style={styles.loadingText}>Starting Stream, Please Wait</Text>
            </View>

            </>
          ) : (
          <>
            <RtcLocalView.SurfaceView 
                style={styles.fullscreen} 
                channelId="casa" 
                />
          </>
          )}
        </View>
      );
  }