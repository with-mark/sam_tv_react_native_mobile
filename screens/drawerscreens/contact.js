import React from 'react';
import {SafeAreaView,ScrollView, Text,View,StyleSheet,Dimensions,TextInput,Button,Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const blue = "rgb(0,122,255)"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { callNumber } from '../utils/callNumber';


const allContacts=[
    '+1(704)879-3040',
    '+233212063656',
    '+233201496197'
]
const styles = StyleSheet.create({
    container: {
        flex:1
    },
    search:{
        height:'12%',borderBottomWidth:1,borderColor:"gainsboro",justifyContent:'space-around',alignItems:'center',flexDirection:'row'
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
    body:{
        flexDirection:'column',
       justifyContent:'space-evenly',
       alignItems:'flex-start' ,
       padding:15,
       height:'auto',
       borderBottomWidth:1,
       borderColor:"gainsboro",
       
       paddingLeft:10
    },
    form:{
        padding:15,
      
    },
    scrollView: {
   
        marginHorizontal: 0,
        height:'88%'
      },
})
export const Contact = ({navigation}) => {


    renderList = () => {
        return allContacts.map((contact,index) => {
            return (
                    <View key={index}>
                        {
                        index===0?
                        
                        <Text style={{marginBottom:5,color:'grey'}}>USA</Text>
                        :
                        index===1?
                        <Text style={{marginBottom:5,color:'grey'}}>Ghana</Text>
                        :
                        null
                        
                        }
                    <TouchableOpacity key={index} onPress={()=>callNumber(contact)} style={{backgroundColor:blue,borderRadius:5,padding:10,marginBottom:index===0?15:7,width:200,display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                        <MaterialCommunityIcons color='white' name="phone"  size={20} /> 
                        <Text style={{color:'white',fontSize:16}}>{contact}</Text>
                    </TouchableOpacity>
                    </View>
            )
        })
}
    



  return(
      <SafeAreaView style={styles.container}>
             <View style={styles.search}>
        <View>
        {/* <TextInput onChangeText={(e)=>{setSearch(e),setCancel(true)}} value={search} placeholderTextColor="white" placeholder="Search Videos" style={{fontSize:15,paddingLeft:30,width:screenWidth*0.80,borderRadius:50,borderColor:"rgb(0,122,255)",height:screenHeight*0.055,backgroundColor:"gainsboro"}}  /> */}
        <Text style={{fontSize:20,width:screenWidth*0.75,}}>Know the Ministry</Text>
        </View>
        <TouchableOpacity onPress={()=>{navigation.navigate('Home')}}>
        <Text>
        <MaterialCommunityIcons name="arrow-left" color={"rgb(0,122,255)"} size={30} />
        </Text>
        </TouchableOpacity>
        </View>
          <ScrollView style={styles.scrollview}>
          <View style={styles.header}>
          <Text style={{fontSize:15,color:'grey',lineHeight:25,paddingTop:10}}>
          Get in touch to know us and we'll get back to you as soon as we can.  We look forward to hearing from you!
          </Text>
       </View>
       <View style={styles.body}>
           <View style={{borderColor:'gainsboro',paddingBottom:30}}>

            
           <Text style={{color:'#00000095',fontSize:18,lineHeight:25,paddingTop:10}}>
               Phone Numbers:{'\n'}
            </Text>
            <View>
            {
                renderList()
            }
            </View>
           </View>
          
           
           
           {/* <Text style={{color:blue,lineHeight:25}}>
               Address:{'\n'}  <Text style={{color:'black',textAlign:'left'}}>House Of Miracle Ministries {"\n"}  P.O.Box MD2155 Madina {"\n "} Accra Ghana</Text>
           </Text> */}
       </View>
       <View>
           <View style={{borderColor:'gainsboro',paddingBottom:30}}>

            
           <Text style={{color:'#00000095',fontSize:18,lineHeight:25,paddingTop:10,marginLeft:10}}>
               About The Ministry:{'\n'}
            </Text>
            <TouchableOpacity onPress={()=>handleClick('https://sampsonamoateng.net/about-us/')} style={{display:'flex',padding:5,flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:blue,height:50}}>
                  <Text style={{fontSize:15,color:'white'}}>
                      About Sampson Amoateng Ministries
                  </Text>
                  
                        <Text>
                            <MaterialCommunityIcons name="chevron-right" color={"white"} size={30} />
                        </Text>
                  
              </TouchableOpacity>
           </View>
          
           
           
           {/* <Text style={{color:blue,lineHeight:25}}>
               Address:{'\n'}  <Text style={{color:'black',textAlign:'left'}}>House Of Miracle Ministries {"\n"}  P.O.Box MD2155 Madina {"\n "} Accra Ghana</Text>
           </Text> */}
       </View>

       </ScrollView>
      </SafeAreaView>
     
  )
};
