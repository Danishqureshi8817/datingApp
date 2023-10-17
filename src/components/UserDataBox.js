import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../style/colors'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import fontsName from '../style/fontsName'

const UserDataBox = ({fieldName,fieldText,fieldTextColor,onPress=()=>{},}) => {
  return (
    <View style={styles.container} >

      <Text style={styles.fieldName} >{fieldName}</Text>

      <TouchableOpacity disabled={fieldTextColor==null?true:false} onPress={onPress} >
        <Text style={[styles.fieldText,{color:fieldTextColor==null?colors.blackOpacity30:fieldTextColor,}]}>{fieldText}</Text>

      </TouchableOpacity>
      
      
    </View>
  )
}

export default UserDataBox

const styles = StyleSheet.create({

    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        borderColor:colors.blackOpacity15,
        borderWidth:1,
        paddingVertical:responsiveHeight(1.5),
        paddingHorizontal:responsiveWidth(3),
        borderRadius:responsiveWidth(1),
        marginBottom:responsiveHeight(2)
    },
    fieldName:{
        color:colors.black,
        fontSize:responsiveFontSize(1.9),
        fontFamily:fontsName.RobotoRegular,
      

    },
    fieldText:{
        
        fontSize:responsiveFontSize(1.9),
        fontFamily:fontsName.RobotoRegular,
        textTransform:'capitalize'
        
    }
    
})