import { StyleSheet, Text, View,TouchableOpacity,Image,FlatList, TouchableHighlight } from 'react-native'
import React from 'react'
import colors from '../../style/colors'
import imagePaths from '../../constant/imagePaths'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import fontsName from '../../style/fontsName'
import { chatUser } from '../../utiles/data'
import NavigationString from '../../constant/NavigationString'

const Chat = ({navigation}) => {

  const renderItem = ({item,index}) => {
    // const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    // const color = item.id === selectedId ? 'white' : 'black';

    return (
      <TouchableHighlight  underlayColor={colors.blackOpacity15}  onPress={()=>{navigation.navigate(NavigationString.ChatScreen,{name:item.name,pro:item.img})}} style={styles.buttonWrapper} >
          <View style={styles.buttonContentWrapper} >

            <View style={{flexDirection:'row',alignItems:'center',gap:responsiveWidth(2)}} >

            
             <Image source={item.img} style={styles.userPro}  />

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
        data={chatUser}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
    marginTop:responsiveHeight(6),
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
    height:responsiveHeight(7)
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