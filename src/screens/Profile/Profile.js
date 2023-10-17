import { StyleSheet, Text, View,StatusBar, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import React,{useState,useCallback} from 'react'
import colors from '../../style/colors'
import imagePaths from '../../constant/imagePaths'
import { wHeight, wWidht } from '../../style/Dimensions'
import LinearGradient from 'react-native-linear-gradient'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import fontsName from '../../style/fontsName'
import UserDataBox from '../../components/UserDataBox'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import NavigationString from '../../constant/NavigationString'
import ShowMe from '../../components/ShowMe'


const Profile = ({navigation}) => {
 
    
  const [visibleShowme, setVisibleShowme] = useState(false);
  const [interested, setinterested] = useState('Select Inerest')

  const [kms,setKms]=useState(0)


//    const showInterest = useCallback(
//     () => {
//       console.log({interested});
//     },
//     [interested],
//   )
  
// showInterest()



  const handleShowMe = (val) => {
    setinterested(val)
    setVisibleShowme(false)
    // console.log(value);
  }



  const multiSliderValuesChange = (values) => {
    setKms(
        values
    );
  }

  // console.log('marked',value);

  return (
    <View style={styles.mainContainer} >

    <StatusBar translucent={true} backgroundColor={'transparent'} />
        
        <ImageBackground source={imagePaths.profileBg} style={styles.profilebg} >

           <View style={styles.header} >

           
           <TouchableOpacity onPress={()=>{navigation.goBack()}} >
            <Image source={imagePaths.arrowleft} style={styles.arrowleft} />
            </TouchableOpacity>
        
              
              <Text style={styles.headerText} >Profile</Text>
           </View>

          
          <View style={styles.userAvtarWrapper} >

   

           <TouchableOpacity onPress={()=>{console.log('Profile click')}} style={{zIndex:1,position:'absolute',marginLeft:responsiveWidth(55),marginTop:responsiveHeight(5)}} >
           <Image source={imagePaths.penciIcon} style={styles.penciIcon} />
           </TouchableOpacity>

           <Image source={imagePaths.user} style={styles.userImg} />

          <Text style={{color:colors.white,fontFamily:fontsName.RobotoMedium,fontSize:responsiveFontSize(1.9),textAlign:'center',marginTop:responsiveHeight(1.5)}} >Jenny, 22</Text>

           </View>

           </ImageBackground>
    

        <View style={styles.accountTextWrapper}>
           <Text style={styles.accountText} >Account Settings</Text>
           
           <TouchableOpacity  onPress={()=>{navigation.navigate(NavigationString.AccountSetting)} }>
           <Text style={styles.accountEdit} >Edit</Text>
           </TouchableOpacity>
           
        </View>

        <ScrollView style={{marginHorizontal:responsiveWidth(6),marginTop:responsiveHeight(1.5)}} showsVerticalScrollIndicator={false} >

           <UserDataBox fieldName={'Name'}  fieldText={'Jenny'} />

           <UserDataBox fieldName={'Phone Number'}  fieldText={'+91 9876543210'} />

           <UserDataBox fieldName={'Date of birth'}  fieldText={'02-05-1997'} />

           <UserDataBox fieldName={'Email'}  fieldText={'abcqwertyu@gmail.com'} />

           <Text style={[styles.accountText,{marginBottom:responsiveHeight(1)}]} >Plan Settings</Text>

           <UserDataBox fieldName={'Current Plan'}  fieldText={'Free'} fieldTextColor={colors.edit} />

           <Text style={[styles.accountText,{marginBottom:responsiveHeight(1)}]} >Discovery Settings</Text>

           <UserDataBox fieldName={'Location'}  fieldText={'My Current Location'} fieldTextColor={colors.edit} />

           <UserDataBox fieldName={'Show Me'} onPress={()=>{setVisibleShowme(true)}}  fieldText={interested} fieldTextColor={colors.edit} />


           <View style={styles.distanceWrapper} >
              <View style={styles.distanceTextWrapper} >
                  <Text style={styles.distanceFieldName} >Maximum Distance</Text>
                  <Text style={styles.distanceFieldText} >{kms} Km</Text>
              </View>
               
              <MultiSlider
               values={[kms]}
               sliderLength={responsiveWidth(70)}
               selectedStyle={{backgroundColor:colors.themeColor,}}
               containerStyle={{alignSelf:'center'}}
               onValuesChange={multiSliderValuesChange}
               markerStyle={{
               ...Platform.select({
               android: {
           height: responsiveHeight(1.6),
           width: responsiveWidth(3.3),
           borderRadius: responsiveWidth(4),
           backgroundColor:colors.themeColor
         }
       })
     }}
     customLabel={(e)=>{
      console.log({e})
      return(
        <View>
<Text>55</Text>
</View>
      )
     
     }}

     min={0}
     max={100}
     step={1}
     
     />

              





           </View>


           <TouchableOpacity style={[styles.buttonWrapper,{marginTop:responsiveHeight(2)}]} >
              <Text style={[styles.buttonText,{color:colors.black}]} >Logout</Text>
           </TouchableOpacity>

           <TouchableOpacity style={styles.buttonWrapper} >
              <Text style={[styles.buttonText,{color:colors.delete,}]} >Delete Account</Text>
           </TouchableOpacity>

        
          <ShowMe visibleShowme={visibleShowme} onPress={()=>{setVisibleShowme(false)}} interest={(vl)=>setinterested(vl)}/>

           


        </ScrollView>
  
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({

  mainContainer:{
    flex:1,
    backgroundColor:colors.white,
    
  },
  profilebg:{
    resizeMode:'contain',
    width:wWidht,
    height:wHeight*0.4,
    position:'relative'
    // justifyContent:'center'
  },
  userImg:{
    resizeMode:'contain',
    width:responsiveWidth(30),
    height:responsiveHeight(15),
    alignSelf:'center',
    borderRadius:responsiveWidth(30),
    marginTop:responsiveHeight(6),
    overflow:'hidden',
    position:'relative'
  },
  userAvtarWrapper:{
    
  },
  header:{
   flexDirection:'row',
   marginHorizontal:responsiveWidth(4),
   marginTop:responsiveHeight(6),
   alignItems:'center',

  },
  arrowleft:{
    width:responsiveWidth(7),
    height:responsiveHeight(2)
  },
  headerText:{
    color:colors.white,
    fontSize:responsiveFontSize(2.5),
    fontFamily:fontsName.RobotoMedium,
    marginLeft:responsiveWidth(32)
  },
  penciIcon:{
    
      // alignSelf:'center',
      width:responsiveWidth(10),
      height:responsiveHeight(5),
      resizeMode:'contain'


      
  },
  accountTextWrapper:{
    flexDirection:'row',
    marginHorizontal:responsiveWidth(6),
    marginTop:responsiveHeight(2),
    justifyContent:'space-between'
  },
  accountText:{
    color:colors.black,
    fontSize:responsiveFontSize(2.1),
    fontFamily:fontsName.RobotoMedium,
    fontWeight:'700'

  },
  accountEdit:{
    color:colors.edit,
    fontSize:responsiveFontSize(1.8),
    fontFamily:fontsName.RobotoRegular,


  },
  buttonWrapper:{
    borderColor:colors.blackOpacity15,
    borderWidth:1,
    paddingVertical:responsiveHeight(1.5),
    paddingHorizontal:responsiveWidth(3),
    borderRadius:responsiveWidth(1),
    marginBottom:responsiveHeight(2)
  },
  buttonText:{
    textAlign:'center',

    fontSize:responsiveFontSize(2.1),
    fontWeight:'500'
  },
  distanceWrapper:{


    borderColor:colors.blackOpacity15,
    borderWidth:1,
    paddingVertical:responsiveHeight(1.5),
    paddingHorizontal:responsiveWidth(3),
    borderRadius:responsiveWidth(1),
    marginBottom:responsiveHeight(2)
  },
  distanceTextWrapper:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  distanceFieldName:{
    color:colors.black,
    fontSize:responsiveFontSize(1.9),
    fontFamily:fontsName.RobotoRegular,
  },
  distanceFieldText:{
    color:colors.black,
    fontSize:responsiveFontSize(1.9),
    fontFamily:fontsName.RobotoRegular,
    fontWeight:'800'
  }

})