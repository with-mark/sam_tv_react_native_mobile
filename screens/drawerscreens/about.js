import React from 'react';
import {ImageBackground,SafeAreaView,Linking,ScrollView, Text,View,StyleSheet,Dimensions,TextInput,Button, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const blue = "rgb(0,122,255)"
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'white'
    },
    header:{
        width:'100%',
        borderBottomWidth:1,
        borderBottomColor:'gainsboro',
        height:'auto',
        padding:15,
        justifyContent:'center',
        alignItems:'flex-start'

        
    },
    search:{
        height:'12%',borderBottomWidth:1,borderColor:"gainsboro",justifyContent:'space-around',alignItems:'center',flexDirection:'row'
      },
    body:{
        flexDirection:'column',
       justifyContent:'space-evenly',
       alignItems:'flex-start' ,
       height:'auto',
       width:screenWidth,
       paddingTop:20,
    },
    form:{
        padding:10,
        width:screenWidth,
        borderColor:'red',
        //borderWidth:1,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row'

    },
    scrollView: {
        width:screenWidth
      },
})
export const About = ({navigation}) => {

    handleClick = (url) => {
        Linking.canOpenURL(url).then(supported => {
          if (supported) {
            Linking.openURL(url);
          } else {
            console.log("Don't know how to open URI: " + this.props.url);
          }
        });
      };
  return(
      <SafeAreaView style={styles.container}>
           <View style={styles.search}>
        <View>
        {/* <TextInput onChangeText={(e)=>{setSearch(e),setCancel(true)}} value={search} placeholderTextColor="white" placeholder="Search Videos" style={{fontSize:15,paddingLeft:30,width:screenWidth*0.80,borderRadius:50,borderColor:"rgb(0,122,255)",height:screenHeight*0.055,backgroundColor:"gainsboro"}}  /> */}
        <Text style={{fontSize:20,width:screenWidth*0.75,}}>About the Ministries</Text>
        </View>
        <TouchableOpacity onPress={()=>{navigation.navigate('Home')}}>
        <Text>
        <MaterialCommunityIcons name="arrow-left" color={"rgb(0,122,255)"} size={30} />
        </Text>
        </TouchableOpacity>
        </View>
          <View style={styles.scrollview}>
              <TouchableOpacity onPress={()=>handleClick('https://sampsonamoateng.net/about-us/')} style={{display:'flex',padding:5,flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:blue,height:50}}>
                  <Text style={{fontSize:15,color:'white'}}>
                      About Sampson Amoateng Ministries
                  </Text>
                  
                        <Text>
                            <MaterialCommunityIcons name="chevron-right" color={"white"} size={30} />
                        </Text>
                  
              </TouchableOpacity>

          </View>
      </SafeAreaView>
     
  )
};
;