import { StyleSheet, Text, View,Image,ImageBackground,SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import imagePaths from '../../constant/imagePaths'
import { wHeight, wWidht } from '../../style/Dimensions'
import colors from '../../style/colors'
import { responsiveHeight } from 'react-native-responsive-dimensions'


const Splash = () => {
  return (
    <SafeAreaView style={styles.mainContainer} >
          <StatusBar translucent={true} backgroundColor={'transparent'} />

     <ImageBackground source={imagePaths.splashLogo} style={styles.splashLogo} >

        <Image source={imagePaths.logo} style={styles.logo} />
     </ImageBackground>
       
    </SafeAreaView>
  )
}

export default Splash

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

    }
})