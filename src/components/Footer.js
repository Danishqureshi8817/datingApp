import { View } from 'react-native'
import React from 'react'
import Button from './Button'
import colors from '../style/colors'
import { wHeight } from '../style/Dimensions'
import { responsiveWidth } from 'react-native-responsive-dimensions'

const COLORS = {
  like: colors.themeColor,
  nope: colors.redCross,
  star: '#07A6FF'
}

const Footer = ({ handleChoice }) => {
  return (
    <View style={{
      position: 'absolute', bottom: wHeight*0.02, width: responsiveWidth(63),
      flexDirection: 'row', alignItems: 'center',
      justifyContent: 'space-between', zIndex: -99999}}>
      <Button
        name="close-outline"
        size={responsiveWidth(6)}
        color={COLORS.nope}
        onPress={() => handleChoice(-1)}/>  
      {/* <Button
        name="star"
        size={24}
        color={COLORS.star}
        style={{ height: 40, width: 40 }}/> */}
      <Button
        name="heart"
        size={responsiveWidth(6)}
        color={COLORS.like}
        onPress={() => handleChoice(1)}/>
    </View>
  )
}

export default Footer