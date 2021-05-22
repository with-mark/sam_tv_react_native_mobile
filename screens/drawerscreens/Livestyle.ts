import {Dimensions, StyleSheet} from 'react-native'

const dimensions = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}

export default StyleSheet.create({
    item: {
        backgroundColor: 'gainsboro',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius:20,
        zIndex:1,
        elevation:2
      },
      title: {
        fontSize: 12,
        color:"black"
      },
      titlex: {
        fontSize: 11,
        color:"grey"
      },
    max: {
        flex: 1,
    },
    maxs: {
        flex: 1,
        position:"relative",
       backgroundColor:"white"
    },
    buttonHolder: {
        height: '50%',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        borderWidth:1,
        borderColor:'white'
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#0093E9',
        borderRadius: 25,
    },
    buttonText: {
        color: '#fff',
    },
    fullView: {
        width: dimensions.width,
        height: dimensions.height,
        zIndex:2,
    },
    remoteContainer: {
        width: '100%',
        height: 550,
        position: 'absolute',
        top: 0
    },
    remote: {
        width: 350,
        height: 550,
        marginHorizontal: 2.5
    },
    noUserText: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        color: '#0093E9',
    },
    header:{
        height:dimensions.height*0.08, display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'row',
        padding:10,
    }
})