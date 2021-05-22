import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Appearance, Dimensions, ScrollView, SafeAreaView, TouchableOpacity, TextInput, Alert, ActivityIndicator, Image, ImageBackground } from 'react-native';
import { LivePlayer, LivePlayer2, LivePlayer1 } from "../../../components/livePlayer";
import SegmentedControl from '@react-native-community/segmented-control';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
import * as Store from "../../../components/async";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
const blue = "rgb(0,122,255)"
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative'
  },
  live: {
    marginTop: 0,
    marginBottom: 40,
    height: "auto",
    margin: 0,
    borderWidth: 0,
    borderColor: "gainsboro",
    borderRadius: 15,
    flexDirection: "row",
    shadowColor: "gainsboro",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

  },
  scrollView: {

    marginHorizontal: 0,
    height: screenHeight,
    marginLeft: 10

  },
  liveComp: {
    borderWidth: 1,
    height: '100%',
    width: 0.5 * screenWidth

  },
  words: {
    // flex: 0.7, justifyContent: 'center', alignItems: 'center' ,

    borderBottomWidth: 1.5,
    borderColor: "gainsboro",
    height: 'auto',
    overflow: 'hidden'
  }
});








const Greetings = ({ dark }) => {
  const [wod,setWod]=useState('')
  useEffect(()=>{
    firestore().collection('word of the day').doc("today's word").onSnapshot(
      snapshot => {
        let status = snapshot ? snapshot.data() : null
        if (status === null) {

        } else {
          setWod(status.word)
          console.log(status.word)
        }

      }
    )
  },[])
  return (

    dark ?
      <View style={GreetingDarkStyles.cover}>
        <View style={GreetingDarkStyles.inner}>
          <Text style={{ fontSize: 30, marginBottom: 18, fontWeight: 'bold', color: '#adbac7' }}>Good Night</Text>
          <Text style={{ marginBottom: 10, color: 'lightblue' }}><MaterialCommunityIcons color='lightblue' name="book" size={15} /> Word of the Day</Text>
          <Text style={{ fontSize: 16, marginBottom: 10, color: '#adbac7' }}>{wod}</Text>
          <View style={{ position: 'absolute', top: 20, right: 20 }}>
            <MaterialCommunityIcons size={35} color="#F4F4F4" name="weather-night" />
          </View>
        </View>
      </View>
      :

      <View style={GreetingStyles.cover}>
        <View style={GreetingStyles.inner}>
          <Text style={{ fontSize: 30, marginBottom: 18, fontWeight: 'bold', color: 'darkgrey' }}>Good Day</Text>
          <Text style={{ marginBottom: 10, color: blue }}><MaterialCommunityIcons color={blue} name="book" size={15} /> Word of the Day</Text>
          <Text style={{ fontSize: 16, marginBottom: 10, color: 'grey' }}>{wod}</Text>
          <View style={{ position: 'absolute', top: 20, right: 20 }}>
            <MaterialCommunityIcons size={30} color="#FFC700" name="white-balance-sunny" />
          </View>
        </View>
      </View>
  );


}

const LiveCard = ({ live,navigation }) => {
  return (
    live==="online"?
    <View style={LiveStylesTrue.cover}>

    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>SamTV is online</Text>
    <TouchableOpacity onPress={() => { navigation.navigate('Live') }} style={{ backgroundColor: 'white', padding: 10, borderRadius: 10 }}>
      <Text style={{ color: '#f44336' }}>Join Live</Text>

    </TouchableOpacity>
  </View>
    :
    <View style={LiveStyles.cover}>

      <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>SamTV is offline</Text>
      <TouchableOpacity onPress={() => { navigation.navigate('Videos') }} style={{ backgroundColor: 'white', padding: 10, borderRadius: 10 }}>
        <Text style={{ color: blue }}>Watch Past Sermons</Text>

      </TouchableOpacity>
    </View>
  );



}

const Motivate = ({ userUID, details, indexKey, allIds }) => {
  const [liked, setLiked] = useState(false)
  let thisId = allIds[indexKey]
  useEffect(() => {
    const found = details.likes.indexOf(userUID)
    if (found > -1) {
      setLiked(true)
    }

  }, [])
  const handleLike = () => {
    setLiked(true)
    const newly = details.likes.push(userUID);
    const things = details.likes;
    firestore().collection('posts').doc(thisId).update({
      likes: details.likes,
    }).then(() => {
      console.log('likeddd')
    })
  }
  const handleDislike = () => {
    setLiked(false)
    let newArr = details.likes.filter(det => det != userUID)
    firestore().collection('posts').doc(thisId).update({
      likes: newArr,
    }).then(() => {
      console.log('dislikeddd')
    })
  }
  return (
    <View style={MotivateStyles.cover}>

      <View style={MotivateStyles.inner}>
        <View style={{ position: 'absolute', bottom: 10, right: 30 }}>
          {
            liked ?
              <TouchableOpacity onPress={handleDislike}>
                <Text style={{ fontSize: 18, color: blue }}><MaterialCommunityIcons size={20} color={blue} name='thumb-up' />&nbsp;{details.likes.length}</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={handleLike}>
                <Text style={{ fontSize: 16, color: 'grey' }}><MaterialCommunityIcons size={20} color={blue} name='thumb-up-outline' />&nbsp;{details.likes.length}</Text>
              </TouchableOpacity>
          }
        </View>
        <View style={{ height: 40, width: 40, marginBottom: 15, backgroundColor: 'green', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 50 }}>
          <MaterialCommunityIcons color='white' size={25} name='chart-timeline-variant' />
        </View>
        <Text style={{ textAlign: 'center', marginBottom: 15, fontSize: 16, color: 'white', }}>
          {details.post}
        </Text>
        <Text style={{ color: '#ffffff80', }}>{details.user}</Text>

      </View>
    </View>
  );

}
const Testimony = ({ userUID, details, indexKey, allIds }) => {
  const [liked, setLiked] = useState(false)
  let thisId = allIds[indexKey]
  useEffect(() => {
    const found = details.likes.indexOf(userUID)
    if (found > -1) {
      setLiked(true)
    }

  }, [])
  const handleLike = () => {
    setLiked(true)
    const newly = details.likes.push(userUID);
    const things = details.likes;
    firestore().collection('posts').doc(thisId).update({
      likes: details.likes,
    }).then(() => {
      console.log('likeddd')
    })
  }
  const handleDislike = () => {
    setLiked(false)
    let newArr = details.likes.filter(det => det != userUID)
    firestore().collection('posts').doc(thisId).update({
      likes: newArr,
    }).then(() => {
      console.log('dislikeddd')
    })
  }
  return (

    <ImageBackground source={require('../../images/prophetSam.jpg')} style={{
      alignItems: 'center',
      justifyContent: 'center',
      overflow: "hidden",
      width: screenWidth,
      marginBottom:1
    }}>
      <View style={TestimonyStyles.cover}>

        <View style={TestimonyStyles.inner}>
          {/* <View style={{height:40,width:40,backgroundColor:'green',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:50}}>
                <MaterialCommunityIcons color='white' size={25} name='chart-timeline-variant' />
            </View> */}
          <View style={{ position: 'absolute', bottom: 10, right: 30 }}>
            {
              liked ?
                <TouchableOpacity onPress={handleDislike}>
                  <Text style={{ fontSize: 18, color: blue }}><MaterialCommunityIcons size={20} color={blue} name='thumb-up' />&nbsp;{details.likes.length}</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={handleLike}>
                  <Text style={{ fontSize: 18, color: 'grey' }}><MaterialCommunityIcons size={20} color={blue} name='thumb-up-outline' />&nbsp;{details.likes.length}</Text>
                </TouchableOpacity>
            }
          </View>
          <Text style={{ textAlign: 'center', fontSize: 20, color: 'white', marginBottom: 15 }}>Testimony</Text>
          <Text style={{ textAlign: 'center', fontSize: 16, color: 'white', marginBottom: 15 }}>
            {details.post}
          </Text>
          <Text style={{ color: '#ffffff80',}}>{details.user}</Text>

        </View>
      </View>
    </ImageBackground>
  );

}
const WordForThought = ({ userUID, details, indexKey, allIds }) => {
  const [liked, setLiked] = useState(false)
  let thisId = allIds[indexKey]
  useEffect(() => {
    const found = details.likes.indexOf(userUID)
    if (found > -1) {
      setLiked(true)
    }

  }, [])
  const handleLike = () => {
    setLiked(true)
    const newly = details.likes.push(userUID);
    const things = details.likes;
    firestore().collection('posts').doc(thisId).update({
      likes: details.likes,
    }).then(() => {
      console.log('likeddd')
    })
  }
  const handleDislike = () => {
    setLiked(false)
    let newArr = details.likes.filter(det => det != userUID)
    firestore().collection('posts').doc(thisId).update({
      likes: newArr,
    }).then(() => {
      console.log('dislikeddd')
    })
  }
  return (
    <View style={WftStyles.cover}>
      <View style={WftStyles.inner}>
        <View style={{ position: 'absolute', bottom: 10, right: 30 }}>
          {
            liked ?
              <TouchableOpacity onPress={handleDislike}>
                <Text style={{ fontSize: 18, color: blue }}><MaterialCommunityIcons size={20} color={blue} name='thumb-up' />&nbsp;{details.likes.length}</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={handleLike}>
                <Text style={{ fontSize: 18, color: 'grey' }}><MaterialCommunityIcons size={20} color={blue} name='thumb-up-outline' />&nbsp;{details.likes.length}</Text>
              </TouchableOpacity>
          }

        </View>
        <View style={{ marginBottom: 15, height: 40, width: 40, backgroundColor: blue, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 50 }}>
          <MaterialCommunityIcons color='white' size={25} name='thought-bubble-outline' />
        </View>
        <Text style={{ marginBottom: 15, textAlign: 'center', fontSize: 16, color: '#00000099', }}>
          {details.post}
        </Text>
        <Text style={{ color: '#00000040' }}>{details.user}</Text>

      </View>
    </View>
  );

}
const SendPost = () => {
  const [type, setType] = useState('')
  const [post, setPost] = useState('')
  const [user, setUser] = useState('')
  const [loading, setLoading] = useState(false)




  const check = async () => {
    const use = await Store.Get("user")

    const u = JSON.parse(use)
    if (u.displayName === null) {
      setUser(u.email)
    } else {
      setUser(u.displayName)

    }

  }

  useEffect(() => {
    check();
  }, [])
  const handleSend = () => {
    if (post.length === 0) {
      Alert.alert('Please enter post text')
    } else if (type.length === 0) {
      Alert.alert('You must select a post category')
    } else {
      setLoading(true)
      const date = firestore.Timestamp.now()
      firestore().collection('posts').add({
        post: post,
        date: date,
        user: user,
        type: type,
        likes: [],

      }).then(() => {
        Alert.alert('Your post has been sent')
        setLoading(false)
        setPost('')
        setType('')
      })

    }
  }

  return (<View style={PostStyles.cover}>
    {loading && <ActivityIndicator
      style={{ position: 'absolute', top: 15, right: 15 }}
    />}
    <Text style={{ fontSize: 17, color: 'grey', fontWeight: '500' }}>Let Your Voice be heard</Text>
    <View style={{ height: 45, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ScrollView horizontal>
        <TouchableOpacity onPress={() => { type === 'testimony' ? setType('') : setType('testimony') }} style={{ backgroundColor: type === 'testimony' ? 'lightblue' : 'lightgrey', height: 30, padding: 8, borderRadius: 10, marginLeft: 10 }}>
          <Text style={{ color: type === 'testimony' ? blue : 'grey' }}>Testimony</Text>

        </TouchableOpacity>
        <TouchableOpacity onPress={() => { type === 'thought' ? setType('') : setType('thought') }} style={{ backgroundColor: type === 'thought' ? 'lightblue' : 'lightgrey', padding: 8, height: 30, borderRadius: 10, marginLeft: 10 }}>
          <Text style={{ color: type === 'thought' ? blue : 'grey' }}>Words For Thought</Text>

        </TouchableOpacity>
        <TouchableOpacity onPress={() => { type === 'motivation' ? setType('') : setType('motivation') }} style={{ backgroundColor: type === 'motivation' ? 'lightblue' : 'lightgrey', padding: 8, height: 30, borderRadius: 10, marginLeft: 10 }}>
          <Text style={{ color: type === 'motivation' ? blue : 'grey' }}>Motivation</Text>

        </TouchableOpacity>
      </ScrollView>
    </View>
    <View style={{ display: 'flex', flexDirection: 'row', }} >
    {/* <TextInput  value={post} onChangeText={(e) => { setPost(e) }}   style={{borderWidth:1,fontSize:16,borderColor:'gainsboro',borderRadius:10,height:200,padding:10}} placeholder="Enter Request" multiline={true} numberOfLines={5} /> */}
      
      <TextInput value={post} onChangeText={(e) => { setPost(e) }} style={{ fontSize:16,borderWidth: 1,width: 300, borderColor: 'gainsboro',height:50, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, padding: 10 }} placeholder="Share with the community"  placeholderTextColor = "lightgrey" />
      <TouchableOpacity onPress={handleSend} style={{ backgroundColor: blue, padding: 13, borderBottomRightRadius: 10, borderTopRightRadius: 10 }}>
        <MaterialCommunityIcons size={18} color='white' name="send" />
      </TouchableOpacity>
    </View>

  </View>);

}








export const Home = ({ navigation }) => {

  const [count, setCount] = useState(0)
  const [user, setUser] = useState({})
  const [dark, setDark] = useState(false)
  const [announce, setAnnounce] = useState(false)
  const [profile,setProfile]=useState()
  const [live, setLive] = useState("offline")
  const [allPosts, setAllPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [allIds, setAllIds] = useState([])
  

  const [selectedIndex, setSelectedIndex] = useState(0)

  const getAllPosts = () => {
    firestore().collection('posts').orderBy('date','desc').onSnapshot(
      snapshot => {
        if (snapshot != null) {

          let everyPost = [];
          let everyId = []
          snapshot.docs.map((s, index) => {
            let data = s.data()
            everyPost.push(data)
            everyId.push(s.id)
          })
          setAllPosts(everyPost)

          setAllIds(everyId)
          setFilteredPosts(everyPost)

        }

      }
    )
  }



  const check = async () => {
    const use = await Store.Get("user")
  
    const u = JSON.parse(use)

    setUser(u)

  }



  useEffect(
    () => {
      
      check();
      firestore().collection('live').doc('M6zPN7Af72tKczD7i41E').onSnapshot(
        snapshot => {
          let status = snapshot ? snapshot.data() : null
          if (status === null) {

          } else {
            setLive(status.live)
            console.log(status.live)
          }

        }
      )

    }, [count]
  );
  useEffect(() => {
    getAllPosts();

    return () => {                                                               // second, we return an anonymous clean up function
      setAllPosts([]);
    };
  }, [])

  useEffect(() => {
    const visit=async()=>{
      const visit = await Store.Get("visited")
      const visited=JSON.parse(visit)
      setAnnounce(!visited)
    }
    visit()
    const profileGet=async()=>{
      let pro=await Store.Get('profile');
      if(pro!=null){
      let proObj=JSON.parse(pro)
      setProfile(proObj)
      }
    }
    profileGet()
    const interval = setInterval(() => {
      visit()
      profileGet()
      const now = new Date().getHours()
      
      if (now >= 5 && now < 18) {
        console.log('Day Time')
        setDark(false)
      } else {
        console.log('Night Time')
        setDark(true)
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);



  return (
    <SafeAreaView style={styles.container}>
      <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',padding:10,alignItems:'center'}}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()} >
        <MaterialCommunityIcons color="grey" name="menu" size={27} />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{navigation.navigate('Events');setAnnounce(false);const seen=Store.Store('visited',JSON.stringify(true))}} style={{padding:5,backgroundColor:'#e8f5e9',borderRadius:5}}>
            <View style={{display:'flex',justifyContent:'center',alignItems:'center',position:'relative'}}> 
          {announce &&<View style={{height:7,width:7,backgroundColor:'red',borderRadius:50,position:'absolute',top:-7}}></View>}
              
              <View style={{ transform: [{ rotate: "-25deg" }]}}><MaterialCommunityIcons  color='grey' size={18} name='bullhorn' /></View>
              
            </View>
     </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Settings')} >
        {/* <MaterialCommunityIcons color="grey" name="account" size={30} /> */}
        {
          profile!=null?
          <Image style={{height:40,width:40,borderRadius:50}} source={profile}   />
          :
          <Image style={{height:40,width:40}} source={require('../../images/profilepic.png')}  />

          }
      </TouchableOpacity>
      </View>
      <ScrollView stickyHeaderIndices={[1,3]}>
        <Greetings dark={dark} />
        
          <LiveCard live={live} navigation={navigation} />
          <SendPost />
       
          <View style={{ padding: 10, backgroundColor: 'white',height:70, }}>
            <SegmentedControl
            style={{marginTop:10}}
              values={['All', 'Motivation', 'Testimony', 'Thought']}
              appearance='light'
              selectedIndex={selectedIndex}
              onChange={(event) => {
                setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
                let index = event.nativeEvent.selectedSegmentIndex;

                if (index === 0) {
                  setFilteredPosts(allPosts)
                }
                else if (index === 1) {
                  let newAll = allPosts.filter(post => post.type === 'motivation')

                  setFilteredPosts(newAll)


                }
                else if (index === 2) {
                  let newAll = allPosts.filter(post => post.type === 'testimony')

                  setFilteredPosts(newAll)


                }
                else if (index === 3) {
                  let newAll = allPosts.filter(post => post.type === 'thought')

                  setFilteredPosts(newAll)



                }


              }}
            />
          </View>
  
        {
          filteredPosts.length > 0 ?
            filteredPosts.map((post, index) => {
              let show;
              if (post.type === 'testimony') {
                show = <Testimony userUID={user.uid} key={index} indexKey={index} details={post} allIds={allIds} />

              } else if (post.type === 'motivation') {
                show = <Motivate userUID={user.uid} key={index} indexKey={index} details={post} allIds={allIds} />

              } else {
                show = <WordForThought userUID={user.uid} key={index} indexKey={index} details={post} allIds={allIds} />

              }
              return (
                show
              )
            })
            :
            <View style={{ width: screenWidth, height: 150, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <MaterialCommunityIcons color='grey' size={40} name="timer-sand-empty" />
              <Text style={{ marginTop: 10, color: 'grey' }}>No Posts Here</Text>
            </View>
        }
        {/* <WordForThought/>
        <Motivate/>
        <Testimony/> */}
        <View style={{ width: screenWidth, height: 'auto',backgroundColor:'#FF9C64' ,padding:15,display:'flex',justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity onPress={()=>{navigation.navigate('PrayerRequest')}} style={{padding:8,backgroundColor:'white',borderRadius:8}}><Text style={{color:'#EA5D0E'}}>Send A Prayer Request</Text></TouchableOpacity>
        </View>
      </ScrollView>



    </SafeAreaView>


  )
};


const GreetingStyles = StyleSheet.create({
  cover: {
    width: screenWidth,
    height: 250,
    backgroundColor: 'whitesmoke',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  },
  inner: {
    backgroundColor: 'white',
    width: '95%',
    height: 'auto',
    borderRadius: 15,
    padding: 20,
    position: 'relative'
  }
});

const GreetingDarkStyles = StyleSheet.create({
  cover: {
    width: screenWidth,
    height: 250,
    backgroundColor: '#22272e',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inner: {
    backgroundColor: '#545d68',
    width: '95%',
    height: 'auto',
    borderRadius: 15,
    padding: 20,
    position: 'relative'
  }
});





const LiveStyles = StyleSheet.create({
  cover: {
    width: screenWidth,
    height: 70,
    backgroundColor: blue,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  // inner:{
  //   backgroundColor:'white',
  //   width:'90%',
  //   height:'80%',
  //   borderRadius:15,
  //   padding:20,
  //   position:'relative'
  // }
});

const LiveStylesTrue = StyleSheet.create({
  cover: {
    width: screenWidth,
    height: 70,
    backgroundColor: '#f44336',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  // inner:{
  //   backgroundColor:'white',
  //   width:'90%',
  //   height:'80%',
  //   borderRadius:15,
  //   padding:20,
  //   position:'relative'
  // }
});

const PostStyles = StyleSheet.create({
  cover: {
    width: screenWidth,
    height: 170,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: 'gainsboro',
    borderBottomWidth: 1,
    position: 'relative'
  },

});

const WftStyles = StyleSheet.create({
  cover: {
    width: screenWidth,
    height: 'auto',
    minHeight: 200,
    backgroundColor: 'whitesmoke',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:2,


  },
  inner: {
    backgroundColor: 'white',
    width: '90%',
    height: 'auto',
    borderRadius: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative'

  }
});

const MotivateStyles = StyleSheet.create({
  cover: {
    width: screenWidth,
    minHeight: 200,
    height: 'auto',
    backgroundColor: '#e8f5e9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:2

  },
  inner: {
    backgroundColor: '#66bb6a',
    width: '90%',
    height: 'auto',
    borderRadius: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',

  }
});
const TestimonyStyles = StyleSheet.create({
  cover: {
    width: screenWidth,
    minHeight: 200,
    height: 'auto',
    backgroundColor: '#00000090',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  

  },
  inner: {
    backgroundColor: '#173F5F90',
    width: '95%',
    height: 'auto',
    borderRadius: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative'

  }
});







