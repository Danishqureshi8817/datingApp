import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../style/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

const COLORS = {
    like: '#00eda6',
    nope: '#ff006f'
}

const Choice = ({ type,color,size })=>{

    // const color= COLORS[type];
    return (
        // <View style={{
        //     borderWidth: 7,
        //     paddingHorizontal: 15,
        //     borderRadius: 15,
        //     backgroundColor: 'rgba(0,0,0,0.2)',
        //     borderColor: color
        // }}>
        //     <Text style={{
        //         fontSize: 48,
        //         fontWeight: 'bold',
        //         textTransform: 'uppercase',
        //         letterSpacing: 4,
        //         color: color
        //     }}>{type}</Text>
        // </View>

        <TouchableOpacity>
                     <View style={{
            height: responsiveHeight(7.5), width: responsiveWidth(15),
            backgroundColor: color,
            elevation: 5, borderRadius: responsiveWidth(8),
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: color,
            borderWidth: 1.2,
            marginTop:responsiveHeight(6),
            // marginLeft:(type=='heart') ? responsiveWidth(24):0,
            // marginRight:(type!='heart') ? responsiveWidth(24):0,
            alignSelf:'center'
            // Apply the animated scale transformation
            // transform: [{ scale }], 
            // ...style
        }}> 
           {  (type=='heart') ? <FontAwesome name={type} size={size} color={colors.white}/> : <Icon name={type} size={size} color={colors.white}/> }  
        </View>
        </TouchableOpacity>
    )
}

export default Choice