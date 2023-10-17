import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import colors from '../../style/colors'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import imagePaths from '../../constant/imagePaths'
import fontsName from '../../style/fontsName'

const ChatScreen = ({navigation,route}) => {
    console.log({route});


  return (
    <View style={styles.mainContainer} >
         <View style={styles.header} > 

           
<TouchableOpacity onPress={()=>{navigation.goBack()}} >
 <Image tintColor={colors.black} source={imagePaths.arrowleft} style={styles.arrowleft} />
 </TouchableOpacity>

   <View style={{flexDirection:'row',alignItems:'center',marginLeft:responsiveWidth(4)}} > 
   <Image source={route?.params?.pro} style={styles.userIcon} />
   <Text style={styles.headerText} >{route?.params?.name}</Text>
   </View>
   
</View>
  




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
        marginTop:responsiveHeight(6),
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




