import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { wHeight, wWidht } from '../style/Dimensions'
import colors from '../style/colors'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

const Loader = ({visible}) => {
  return (
  <Modal visible={visible} transparent >
     <View style={styles.modealView} >
        <View style={styles.mainView} >
            <ActivityIndicator size={'large'} />
        </View>
     </View>
  </Modal>
  )
}

export default Loader

const styles = StyleSheet.create({

    modealView:{
           width:wWidht,
           height:wHeight,
           backgroundColor:colors.blackOpacity50,
           justifyContent:'center',
           alignItems:'center',
    }, 
    mainView:{

          width:responsiveWidth(15),
          height:responsiveHeight(7.5),
          borderRadius:responsiveWidth(7.5),
          backgroundColor:colors.white,
          justifyContent:'center',
          alignItems:'center'

    }
})