import { StyleSheet, Text, View,TouchableOpacity,Image,FlatList, TouchableHighlight } from 'react-native'
import React,{useState,useEffect} from 'react'
import colors from '../../style/colors'
import imagePaths from '../../constant/imagePaths'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import fontsName from '../../style/fontsName'
import { chatUser } from '../../utiles/data'
import NavigationString from '../../constant/NavigationString'
import firestore from '@react-native-firebase/firestore'
import { getUserDetails } from '../../utiles/services';

let id =''
const Chat = ({navigation}) => {

  const [usersF, setUsersF] = useState('')

  const getUsers = async() => {
    let tempData = []
    let ress = await getUserDetails()
    let userData = await JSON.parse(ress)
    id=userData?.userid
    console.log("Home DAta",userData.name);
    firestore().collection("users").where("email","!=",userData?.email).get().then(res=>{
      if(res.docs != []){
      console.log(res.docs);
    res.docs.map(item => {
      tempData.push(item.data())
    })
    setUsersF(tempData)}
    })
  }

console.log({id});

  useEffect(() => {
     getUsers()
  }, [])

  const renderItem = ({item,index}) => {
    // const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    // const color = item.id === selectedId ? 'white' : 'black';

  

    return (
      <TouchableHighlight  underlayColor={colors.blackOpacity15}  onPress={()=>{navigation.navigate(NavigationString.ChatScreen,{user:item,id:id})}} style={styles.buttonWrapper} >
          <View style={styles.buttonContentWrapper} >

            <View style={{flexDirection:'row',alignItems:'center',gap:responsiveWidth(2)}} >

            
             <Image source={require('../../assets/images/user1.jpg')} style={styles.userPro}  />

             <View style={styles.userNameWrapper}  >
              <Text style={styles.userName}  >{item.name}</Text>
              <Text style={styles.userMsgH}  >{item.msgH}</Text>
             </View>

             </View>

             <Text style={styles.userMsgH}  >{item.time}</Text>
          </View>
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.mainContainer} >
         <View style={styles.header} > 

           
<TouchableOpacity onPress={()=>{navigation.goBack()}} >
 <Image tintColor={colors.black} source={imagePaths.arrowleft} style={styles.arrowleft} />
 </TouchableOpacity>

   
   <Text style={styles.headerText} >Chat</Text>
</View>
  
  <FlatList
        data={usersF}
        renderItem={renderItem}
        keyExtractor={index => index}
      />



    </View>
  )
}

export default Chat

const styles = StyleSheet.create({

  mainContainer:{
    flex:1,
    backgroundColor:colors.white
  },
  header:{
    flexDirection:'row',
    marginHorizontal:responsiveWidth(4),
    marginTop:responsiveHeight(2),
    alignItems:'center',
    marginBottom:responsiveHeight(2)
 
   },
   arrowleft:{
     width:responsiveWidth(7),
     height:responsiveHeight(2)
   },
   headerText:{
     color:colors.black,
     fontSize:responsiveFontSize(2.5),
     fontFamily:fontsName.RobotoMedium,
     marginLeft:responsiveWidth(32)
   },
   buttonContentWrapper:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:responsiveWidth(2),
    paddingVertical:responsiveHeight(1),
    borderBottomWidth:1,
    borderBottomColor:colors.blackOpacity15
   },
   userPro:{
    resizeMode:'contain',
    width:responsiveWidth(15),
    height:responsiveHeight(7.5),
    borderRadius:responsiveWidth(8)
   },
   userName:{
    color:colors.black,
    fontFamily:fontsName.RobotoMedium,
    fontSize:responsiveFontSize(1.9)
   },
   userMsgH:{
    color:colors.black,
    fontFamily:fontsName.RobotoRegular,
    fontSize:responsiveFontSize(1.9)
   },
 
})