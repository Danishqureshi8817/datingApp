import { StyleSheet, Text, View,Modal,TouchableHighlight } from 'react-native'
import React from 'react'
import colors from '../style/colors'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { wHeight, wWidht } from '../style/Dimensions'
import fontsName from '../style/fontsName'

const ShowMe = ({visibleShowme,onPress=()=>{},interest}) => {


  return (
         <Modal transparent={true} visible={visibleShowme} >
        <View
          style={{
            backgroundColor: '#000000aa',
            flex: 1,
            alignItems: 'center',

            // padding: responsiveWidth(10),
            justifyContent:'center'

           
          }}  onTouchEnd={onPress}>
  
          <View
            style={{
              backgroundColor: colors.white,
              borderRadius: responsiveWidth(2),
              position: 'relative',
              width: wWidht * 0.8,
            //   marginTop: wHeight * 0.15,
            // paddingHorizontal:responsiveWidth(5)
            }}>
            <Text
              style={{
                marginBottom: responsiveWidth(2),
           
                color: colors.black,
                marginTop: responsiveHeight(1),
                fontSize:responsiveFontSize(2.1),
                fontFamily:fontsName.RobotoMedium,
                fontWeight:'800',
                paddingHorizontal:responsiveWidth(5)
              }}>
           Show Me
            </Text>
      
           <TouchableHighlight 
        //    activeOpacity={0.6}
           underlayColor={colors.blackOpacity15} style={styles.buttonWrapper} onPress={()=>{interest('men')}}>
               <Text style={styles.buttonText} >Men</Text>
           </TouchableHighlight>
           
           <View style={styles.divider} ></View>
           
           <TouchableHighlight 
            // activeOpacity={0.6}
           underlayColor={colors.blackOpacity15} style={styles.buttonWrapper}  onPress={()=>{interest('women')}} >
               <Text  style={styles.buttonText}>Women</Text>
           </TouchableHighlight>


            
          </View>
       
        </View>

      </Modal>
  )
}

export default React.memo(ShowMe) 

const styles = StyleSheet.create({

    buttonWrapper:{
        paddingVertical:responsiveHeight(1.5)
    },
    buttonText:{
         fontSize:responsiveFontSize(2),
         color:colors.black,
         fontFamily:fontsName.RobotoRegular,
         fontWeight:'600',
         paddingHorizontal:responsiveWidth(5)
    },
    divider:{
        borderBottomWidth:1,
        borderBottomColor:colors.blackOpacity15,
        marginHorizontal:responsiveWidth(5)
        
    }
})