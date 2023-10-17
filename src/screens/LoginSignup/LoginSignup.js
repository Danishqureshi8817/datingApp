import { StyleSheet, Text, View ,SafeAreaView,ImageBackground,Image,TouchableOpacity,StatusBar} from 'react-native'
import React from 'react'
import imagePaths from '../../constant/imagePaths'
import { wHeight, wWidht } from '../../style/Dimensions'
import colors from '../../style/colors'
import fontsName from '../../style/fontsName'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import NavigationString from '../../constant/NavigationString'


const LoginSignup = ({navigation}) => {
  return (
    <SafeAreaView style={styles.mainContainer}  >
        <StatusBar translucent={true} backgroundColor={'transparent'} />

      <ImageBackground source={imagePaths.splashLogo} style={styles.splashLogo} >

      <Image source={imagePaths.logo} style={styles.logo} />
        
        <Text style={[styles.despText,{marginTop:responsiveHeight(15)}]} >By clicking Log In, you agree with our Terms.</Text>
        <Text style={styles.despText} >Learn how we process your data in our Privacy</Text>
        <Text style={styles.despText} >Policy and Cookies Policy.</Text>


        <TouchableOpacity onPress={()=>{navigation.navigate(NavigationString.TabStack)}} style={styles.buttonWrapper} >
            <View style={styles.buttonSubWrapper} >
                <Image source={imagePaths.gIcon} style={styles.gIcon} />
                <Text style={styles.buttonText} >Login With GOOGLE</Text>
            </View>
        </TouchableOpacity>


      </ImageBackground>
     
    </SafeAreaView>
  )
}

export default LoginSignup

const styles = StyleSheet.create({

    mainContainer:{
        flex:1,
        // backgroundColor:colors.themeColor

    },
    splashLogo:{
        resizeMode:'contain',
        width:wWidht,
        height:wHeight+responsiveHeight(5)
    },
    logo:{
        resizeMode:'contain',
        width:wWidht*0.3,
        height:wHeight*0.3,
        alignSelf:'center',
        marginTop:wHeight*0.12

    },
    despText:{
        color:colors.white,
        fontFamily:fontsName.RobotoRegular,
        fontSize:responsiveFontSize(1.6),
        textAlign:'center'
    },
    buttonWrapper:{
        // alignSelf:'center',
        backgroundColor:colors.white,
        // paddingHorizontal:responsiveWidth(10),
        paddingVertical:responsiveHeight(1.2),
        borderRadius:responsiveWidth(10),
        marginHorizontal:responsiveWidth(6),
        marginTop:responsiveHeight(6)
    },
    buttonSubWrapper:{
      flexDirection:'row',
      alignItems:'center',
      gap:responsiveWidth(14)
      
    },
    gIcon:{
        resizeMode:'contain',
        width:responsiveWidth(5),
        height:responsiveHeight(2.5),
        marginLeft:responsiveWidth(8)
        
    },
    buttonText:{
        color:colors.black,
        fontFamily:fontsName.RobotoMedium,
        fontSize:responsiveFontSize(1.6),
        fontWeight:'700',
        textTransform:'uppercase',
        textAlign:'center',
        alignSelf:'center'

    }
})