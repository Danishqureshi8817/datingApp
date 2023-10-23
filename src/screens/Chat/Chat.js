import { StyleSheet, Text, View,TouchableOpacity,Image,FlatList, TouchableHighlight, SafeAreaView, ImageBackground, ActivityIndicator } from 'react-native'
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

  const [imgLoad, setImgLoad] = useState(false)

  const getUsers = async() => {
    let tempData = []
    let ress = await getUserDetails()
    let userData = await JSON.parse(ress)
    id=userData?.userid
    console.log("Chat Screen DAta",userData.name);
    firestore().collection("users").where("email","!=",userData?.email).get().then(res=>{
      if(res.docs != []){
      // console.log(res.docs);
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
console.log({item});
  

    return (
      <TouchableHighlight underlayColor={colors.blackOpacity15}  onPress={()=>{navigation.navigate(NavigationString.ChatScreen,{user:item,id:id})}} style={styles.buttonWrapper} >
          <View style={styles.buttonContentWrapper} >

            <View style={{flexDirection:'row',alignItems:'center',gap:responsiveWidth(2)}} >

{/*             
            {
              item.profile==''?
              <Image 
        
              source={require('../../assets/images/user1.jpg')} style={styles.userPro}  /> :

                <View style={{  width:responsiveWidth(15),
    height:responsiveHeight(7.5),
    borderRadius:responsiveWidth(8),overflow:'hidden'}}>

                 
               <ImageBackground
               onLoadStart={()=>{setImgLoad(true)}}
               onLoadEnd={()=>{setImgLoad(false)}}
              source={{uri:item.profile}}  style={[styles.userPro,{justifyContent:'center',alignItems:'center'}]}  >
                  
                  <ActivityIndicator animating={imgLoad} size={'large'} />

              </ImageBackground>
              </View> 
            } */}


            <Image 
        
        source={imagePaths.dummyUserIcon} style={styles.userPro}  /> 


             {/* <Image 
               onLoadStart={()=>{setImgLoad(true)}}
               onLoadEnd={()=>{setImgLoad(false)}}
              source={item.profile==''?require('../../assets/images/user1.jpg'):{uri:'https://firebasestorage.googleapis.com/v0/b/dating-app-14182.appspot.com/o/1000027433.jpg?alt=media&token=e3739460-ecc4-44ac-a6d3-102419b1050e'}} style={styles.userPro}  /> */}

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
    <SafeAreaView style={styles.mainContainer} >
         <View style={styles.header} > 

           
<TouchableOpacity onPress={()=>{navigation.goBack()}} >
 <Image tintColor={colors.black} source={imagePaths.arrowleft} style={styles.arrowleft} />
 </TouchableOpacity>

   
   <Text style={styles.headerText} >Chat</Text>
</View>
  
  <FlatList
        data={usersF}
        renderItem={renderItem}
        keyExtractor={ item => item?.userid}
      />

    {imgLoad&&<Text>djfsj</Text>}

    </SafeAreaView>
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
    marginTop:responsiveHeight(4),
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
    borderRadius:responsiveWidth(8),
    
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