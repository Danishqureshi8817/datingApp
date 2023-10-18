import { StyleSheet, Text, View ,SafeAreaView,ImageBackground,Image,TouchableOpacity,StatusBar} from 'react-native'
import React,{useState,useEffect} from 'react'
import imagePaths from '../../constant/imagePaths'
import { wHeight, wWidht } from '../../style/Dimensions'
import colors from '../../style/colors'
import fontsName from '../../style/fontsName'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import NavigationString from '../../constant/NavigationString'
import Loader from '../../components/Loader'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import Toast from 'react-native-simple-toast';


const LoginSignup = ({navigation}) => {


    const [Visible, setVisible] = useState(false)

    const [googleIn, setgoogleIn] = useState(true)
    
    const [userInfo, setUserInfo] = useState(null)


    useEffect(() => {
     

        GoogleSignin.configure({
            webClientId:"271100159197-0r7i8421rq7e09a50a1r8upafh9v3fpt.apps.googleusercontent.com",
        });

    }, [])

        //Toast MSG
 const showToast = (msg) =>{
    Toast.show(msg);
 }
    

    // In this Step we provide the  google SignIn to user Method with help of firebase

console.log("google data",userInfo?.user?.name)
//Google SignIn
const signIn = async () => {

    try {
        //  setActivity(true)
        await GoogleSignin.signOut()


      await GoogleSignin.hasPlayServices();
      const userData = await GoogleSignin.signIn();
    //   await setUserInfo(userData);
      // await storeData(userInfo)
      console.log("user dat",userData?.user)

      //when google SignIn method return the user details then we store the info in Asyncstorage for checkinh some vailidations
     
    //   await AsyncStorage.setItem('userDetails', JSON.stringify(userData?.user));
       showToast('SignIn successfully')
        //  setActivity(false)
       //after user succesfully login the jump to home screen 
    //   navigation.replace(navigationStrings.Scanner)

    } catch (error) {
        console.log({error});
      //In this step handelinh the login Erros
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };



  return (
    <SafeAreaView style={styles.mainContainer}  >
        <StatusBar translucent={true} backgroundColor={'transparent'} />

      <ImageBackground source={imagePaths.splashLogo} style={styles.splashLogo} >

      <Image source={imagePaths.logo} style={styles.logo} />
        
        <Text style={[styles.despText,{marginTop:responsiveHeight(15)}]} >By clicking Log In, you agree with our Terms.</Text>
        <Text style={styles.despText} >Learn how we process your data in our Privacy</Text>
        <Text style={styles.despText} >Policy and Cookies Policy.</Text>


        <TouchableOpacity onPress={()=>{signIn()}} style={styles.buttonWrapper} >
            <View style={styles.buttonSubWrapper} >
                <Image source={imagePaths.gIcon} style={styles.gIcon} />
                <Text style={styles.buttonText} >Login With GOOGLE</Text>
            </View>
        </TouchableOpacity>

      <Loader visible={Visible} />
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