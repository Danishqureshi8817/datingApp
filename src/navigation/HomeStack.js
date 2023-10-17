import { View, Text,StyleSheet } from 'react-native'
import React,{useContext,useState,useEffect} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import {responsiveFontSize,responsiveHeight,responsiveWidth} from 'react-native-responsive-dimensions'
import { AccountSetting, ChatScreen, LoginSignup, Splash  } from '../screens';
import NavigationString from '../constant/NavigationString';
import TabStack from './TabStack';





const Stack = createNativeStackNavigator();


const HomeStack = () => {

//   const {userData,setUserData} = useContext(AuthContext)
  const [splashShow, setSplashShow] = useState(true)
  const [login, setlogin] = useState(true)


   const splashStatus = async() => {
   await setSplashShow(false)
   }

//    const load = async() => {
//     Services.getUserAuth().then( resp => {
//       console.log("mmmain",resp)
//       if(resp){
//         setUserData(resp)
//         console.log("DAT...")
//         setlogin(false)
        
//       }
//       else{
//         setUserData(null)
//       }
//     })
//    }

  useEffect(() => {
    
//    load()

    setTimeout( async () => {
      await splashStatus()
   }, 2000);



  }, [])


  return (
    <Stack.Navigator screenOptions={{headerShown:false,}} >
     {splashShow?<Stack.Screen name={NavigationString.Splash} component={Splash}/>:null}
    
     {/* <Stack.Screen name='Tabs' component={TabStack}  /> */}
     {/* <Stack.Screen name={navigationStrings.Menu} component={Menu} options={{headerShown:true,}} /> */}
     {/* <Stack.Screen name={navigationStrings.Login} component={Login} />
     <Stack.Screen name={navigationStrings.Otp} component={Otp} /> */}
     <Stack.Screen name={NavigationString.LoginSignup} component={LoginSignup} />
     <Stack.Screen name={NavigationString.TabStack} component={TabStack} />
     <Stack.Screen name={NavigationString.AccountSetting} component={AccountSetting} />
     <Stack.Screen name={NavigationString.ChatScreen} component={ChatScreen} />
     {/* <Stack.Screen name={NavigationString.Home} component={Home} /> */}

    

     
 


  </Stack.Navigator>
  )
}

export default HomeStack

const styles = StyleSheet.create({

})