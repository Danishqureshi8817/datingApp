import { View, Text, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import OcticonsIcon from 'react-native-vector-icons/Octicons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import FoundationIcon from 'react-native-vector-icons/Foundation';

import {responsiveFontSize,responsiveHeight,responsiveWidth} from 'react-native-responsive-dimensions'
import colors from '../style/colors';
import { wHeight, wWidht } from '../style/Dimensions';
import NavigationString from '../constant/NavigationString';
import { Home,Chat,Profile,Like } from '../screens';
import imagePaths from '../constant/imagePaths';





const Tab = createBottomTabNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator screenOptions={{tabBarStyle:{height:wHeight*0.065,backgroundColor:colors.white,borderTopRightRadius:responsiveWidth(7),borderTopLeftRadius:responsiveWidth(7),},headerShown:false,
    tabBarShowLabel:false,contentStyle: {backgroundColor: 'red'},
    }} >


    <Tab.Screen name={NavigationString.Home} component={Home}
    options={{tabBarIcon:({focused})=>{return focused ? (<MIcon  name={"home-variant"} size={responsiveWidth(7)} color={colors.themeColor} />) : (<Image source={imagePaths.homeIcon} tintColor={colors.black} style={{resizeMode:'contain',width:responsiveWidth(8)}}/>)},  
    tabBarLabel: ({focused}) => {
    return focused ? <View><Text style={{color:colors.blackOpacity80,alignSelf:'center'}}>Home</Text>
    <View style={{backgroundColor:'#ffc134',width:responsiveWidth(15),height:3,borderTopRightRadius:responsiveWidth(1),borderTopLeftRadius:responsiveWidth(1),alignSelf:'center'}}></View></View> : <Text style={{color:colors.blackOpacity80,marginBottom:4}}>Home</Text>;
     }}} />


    <Tab.Screen name={NavigationString.Like} component={Like} 
    options={{tabBarIcon:({focused})=>(<Icon  name={focused?"heart":"heart-outline"} size={responsiveWidth(6)} color={focused?colors.themeColor:colors.black} />),
    tabBarLabel: ({focused}) => {
    return focused ? <View><Text style={{color:colors.blackOpacity80,alignSelf:'center'}}>Store</Text>
    <View style={{backgroundColor:'#ffc134',width:responsiveWidth(15),height:3,borderTopRightRadius:responsiveWidth(1),borderTopLeftRadius:responsiveWidth(1),alignSelf:'center'}}></View></View> : <Text style={{color:colors.blackOpacity80,marginBottom:4}}>Store</Text>;
    } }} />


    <Tab.Screen name={NavigationString.Chat} component={Chat} 
    options={{tabBarIcon:({focused})=>(<Image source={imagePaths.chatIcon} tintColor={focused?colors.themeColor:colors.black} style={{resizeMode:'contain',width:responsiveWidth(6)}}/>),
    tabBarLabel: ({focused}) => {
    return focused ? <View><Text style={{color:colors.blackOpacity80,alignSelf:'center'}}>Account</Text>
    <View style={{backgroundColor:'#ffc134',width:responsiveWidth(15),height:3,borderTopRightRadius:responsiveWidth(1),borderTopLeftRadius:responsiveWidth(1),alignSelf:'center'}}></View></View> : <Text style={{color:colors.blackOpacity80,marginBottom:4}}>Account</Text>;
     },headerShown:false }}
    />


    <Tab.Screen name={NavigationString.Profile} component={Profile} 
    options={{tabBarIcon:({focused})=>(<Icon  name={focused?"person":"person-outline"} size={responsiveWidth(6)} color={focused?colors.themeColor:colors.black} />),
    tabBarLabel: ({focused}) => {
    return focused ? <View><Text style={{color:colors.blackOpacity80,alignSelf:'center'}}>Wishlist</Text>
    <View style={{backgroundColor:'#ffc134',width:responsiveWidth(15),height:3,borderTopRightRadius:responsiveWidth(1),borderTopLeftRadius:responsiveWidth(1),alignSelf:'center'}}></View></View> : <Text style={{color:colors.blackOpacity80,marginBottom:4}}>Wishlist</Text>;
     },}} />


    
 
    </Tab.Navigator>
    )
}

export default TabStack