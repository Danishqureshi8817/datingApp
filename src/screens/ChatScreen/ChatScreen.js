import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import React,{useCallback,useState,useEffect} from 'react'
import colors from '../../style/colors'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import imagePaths from '../../constant/imagePaths'
import fontsName from '../../style/fontsName'
import { Bubble, GiftedChat } from 'react-native-gifted-chat'
import firestore from '@react-native-firebase/firestore'
import uuid from 'react-native-uuid';

const ChatScreen = ({navigation,route}) => {
    console.log("props",route);

    const [messageList, setMessageList] = useState([])

    useEffect(() => {
      const querySnapshot = firestore().collection('chats').doc(route.params.id+route.params.user.userid).collection("messages").orderBy("createdAt","desc");

      querySnapshot.onSnapshot(snapShot=> {
        // console.log(snapShot.docs);
        const allMessages = snapShot.docs.map(snap => {
          console.log(snap.data());
          return {...snap.data(),createdAt:snap.data().createdAt}
        })
        setMessageList(allMessages)
      })
    }, [])
  
    const onSend = messageArray   => {
      console.log({messageArray});
      const msg = messageArray[0]

      const myMsg = {
        ...msg,senderId:route.params.id,recieverId:route.params.user.userid,createdAt:Date.parse(msg.createdAt)
      }

     setMessageList(previousMessages => 
      GiftedChat.append(previousMessages,myMsg),
      )

      firestore().collection("chats").doc(route.params.id+route.params.user.userid).collection('messages').add({...myMsg})
      firestore().collection("chats").doc(route.params.user.userid+route.params.id).collection('messages').add({...myMsg})
    }


  return (
    <View style={styles.mainContainer} >
         {/* <View style={styles.header} > 

           
<TouchableOpacity onPress={()=>{navigation.goBack()}} >
 <Image tintColor={colors.black} source={imagePaths.arrowleft} style={styles.arrowleft} />
 </TouchableOpacity>

   <View style={{flexDirection:'row',alignItems:'center',marginLeft:responsiveWidth(4)}} > 
   <Image source={route?.params?.pro} style={styles.userIcon} />
   <Text style={styles.headerText} >{route?.params?.user.name}</Text>
   </View>
   
</View> */}
  
<GiftedChat
      messages={messageList}
      onSend={messages => onSend(messages)}
      user={{
        _id: route.params.id,
      }}
      renderBubble={props =>{
           return(
            <Bubble 
            {...props}
            wrapperStyle={{
              right:{
                backgroundColor:colors.themeColor
              }
            }} />
           )
      }}
    />



    </View>
  )
}

export default ChatScreen

const styles = StyleSheet.create({

    mainContainer:{
        flex:1,
        backgroundColor:colors.white
      },
      header:{
        flexDirection:'row',
        // marginHorizontal:responsiveWidth(4),
        marginTop:responsiveHeight(2),
        alignItems:'center',
        marginBottom:responsiveHeight(2),
        borderBottomWidth:1,
        borderBottomColor:colors.blackOpacity15,
        paddingBottom:responsiveHeight(1),
        paddingHorizontal:responsiveWidth(4),
     
       },
       arrowleft:{
         width:responsiveWidth(7),
         height:responsiveHeight(2)
       },
       headerText:{
         color:colors.black,
         fontSize:responsiveFontSize(2.5),
         fontFamily:fontsName.RobotoMedium,
         marginLeft:responsiveWidth(2)
       },
       userIcon:{
        resizeMode:'contain',
        width:responsiveWidth(10),
        height:responsiveHeight(5)
       }
})




