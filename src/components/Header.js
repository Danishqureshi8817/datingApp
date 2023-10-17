import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import imagePaths from '../constant/imagePaths'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

const Header = () => {
  return (
    <View style={styles.mainWrapper} >
        <Image source={imagePaths.homeLogo} style={styles.homeLogo} />

        <TouchableOpacity>
        <Image source={imagePaths.filterIcon} style={styles.filterIcon} /> 

        </TouchableOpacity>
     
    </View>
  )
}

export default Header

const styles = StyleSheet.create({

    mainWrapper:{
        flexDirection:'row',
        marginVertical:responsiveHeight(3),
        alignItems:'center',
        alignSelf:'flex-end'
    },
    homeLogo:{
        resizeMode:'contain',
        width:responsiveWidth(30),
        height:responsiveHeight(10),
        marginRight:responsiveWidth(20)
    },
    filterIcon:{

        resizeMode:'contain',
        width:responsiveWidth(6),
        height:responsiveHeight(3),
        marginRight:responsiveWidth(8)


    }
})