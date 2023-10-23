import { StyleSheet, Text, View,StatusBar, Image, ImageBackground, TouchableOpacity, ScrollView ,PermissionsAndroid, ActivityIndicator} from 'react-native'
import React,{useState,useCallback,useEffect} from 'react'
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
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import { getUserDetails } from '../../utiles/services'
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/Loader'

const Profile = ({navigation}) => {
 
  let userData = 'll';
  const [visibleShowme, setVisibleShowme] = useState(false);
  const [interested, setinterested] = useState('Select Inerest')
  const [imageData, setImageData] = useState(null)
  const [userInfo, setUserInfo] = useState('')
  const [userInfoFirestore, setUserInfoFirestore] = useState('')
  
  const [imgLoad, setImgLoad] = useState(false)

  const [VisibleLoader, setVisibleLoader] = useState(false)

  const [refresh, setRefresh] = useState(false)

  const [kms,setKms]=useState(0)

  const [imageSelected, setImageSelected] = useState(false)


  const getUsers = async() => {
    // let tempData = []
    let ress = await getUserDetails()
     userData = await JSON.parse(ress)
    console.log("Profile Screen Data",userData);
    setUserInfo(userData)
    // firestore().collection("users").where("email","!=",userData?.email).get().then(res=>{
    //   if(res.docs != []){
    //   // console.log(res.docs);
    // res.docs.map(item => {
    //   tempData.push(item.data())
    // })
    // setUsersF(tempData)}
    // })
  }

//   useEffect(() => {
//     getUsers()
//  }, [])


 useEffect(() => {
  getProfileData()
}, [refresh])


//    const showInterest = useCallback(
//     () => {
//       console.log({interested});
//     },
//     [interested],
//   )
  
// showInterest()

const requestCameraPermission = async () => {
  // console.log({imgUri});

  try {

    const granted = await PermissionsAndroid.request( PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Dating App Camera Permission',
        message:
          'Dating App needs access to your Camera ' +
          'so you can take awesome picture.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log({granted});

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      
      // downloadFile(imgUri)
    } else {

    }
  } catch (err) {
    console.warn(err);
  }
}
const getProfileData = async () => {
   setVisibleLoader(true)
  let ress = await getUserDetails()
  userData = await JSON.parse(ress)
 console.log("Profile prodata Data",userData);

  firestore().collection('users').doc(userData.userid).get().then(
    datauser => {
      console.log('user Data by id exists',datauser.exists);

      if (datauser.exists) {
        console.log('user Data by id',datauser.data());
        // setUserInfoFirestore()
        setUserInfo(datauser.data())
        setVisibleLoader(false)
      }
    }
  ).catch(err=>{
    console.log('prodata',err);
    setVisibleLoader(false)
  })
}

 const selectImage = async () => {
    // await requestCameraPermission()


 
  // ImagePicker.openPicker({
  //   width: 300,
  //   height: 400,
  //   cropping: true
  // }).then(imageR => {
  //   console.log(imageR);
  //   setImageData(imageR)
  // }).catch(err => {
  //   console.log({err});
  // })


  const result = await launchImageLibrary({mediaType:'photo'})
  console.log("Picke img",result.assets[0]);
  setImageData(result.assets[0])
  
   setImageSelected(true)
  // console.log({imgRes});
 }


 const uploadImage = async() =>{
  setVisibleLoader(true)
console.log('upled IMAGE',imageData.uri);

    const reference = storage().ref(imageData.fileName)
    const pathToFile = imageData.uri

    //upload file
    await reference.putFile(pathToFile)

    const url = await storage().ref(imageData.fileName).getDownloadURL();
    console.log({url});

    firestore().collection('users').doc(userInfo.userid).update({
      profile:url
    }).then(()=>{
      console.log('profile updated');
    }).catch(err=>{
      console.log({err});
    })
    setRefresh(!refresh)
    setImageSelected(false)

    setVisibleLoader(false)
 }



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
 
  const getLocation = () => {
    // var url = `https://ipinfo.io/json?token=86c87b9d4c0e3c`

    // fetch(url).then(ress => ress.json()).then(res => console.log('Location GET',res) ).catch(err => console.log('location Errpr',err))
  }


  // console.log('marked',value);

  return (
    <View style={styles.mainContainer} >

    <StatusBar translucent={true} backgroundColor={'transparent'} />
        
        <ImageBackground source={imagePaths.profileBg} style={styles.profilebg} >

           <View style={styles.header} >

           
           <TouchableOpacity onPress={()=>{navigation.goBack()}} >
            <Image source={  imagePaths.arrowleft} style={styles.arrowleft} />
            </TouchableOpacity>
        
              
              <Text style={styles.headerText} >Profile</Text>
           </View>

          
          <View style={styles.userAvtarWrapper} >

   
              
           <TouchableOpacity disabled={true} button onPress={()=>{selectImage()}} style={{zIndex:1,position:'absolute',marginLeft:responsiveWidth(55),marginTop:responsiveHeight(5)}} >
           <Image source={imagePaths.penciIcon} style={styles.penciIcon} />
           </TouchableOpacity>
          

          {/* {
            imageData==null && userInfo?.profile=='' ? 
            <Image  source={imagePaths.dummyUserIcon} style={styles.userImg} />:imageData!=null ?
            <Image  source={{uri:imageData?.uri}} style={styles.userImg} /> :
            <View style={{position:'relative',}} >

           
            <Image 
                 onLoadStart={()=>{setImgLoad(true)}}
               onLoadEnd={()=>{setImgLoad(false)}}
             source={{uri:userInfo?.profile}} style={styles.userImg} />
            <ActivityIndicator animating={imgLoad}  size={'large'} style={{position:'absolute',marginTop:responsiveHeight(11),alignSelf:'center'}} />
            </View>
          } */}
            {/* <Image  source={{uri:userInfo?.profile}} style={styles.userImg} /> */}
     

            <Image  source={imagePaths.dummyUserIcon} style={styles.userImg} />
         
           {
            imageSelected ?
           
           <TouchableOpacity onPress={()=>{uploadImage()}} style={styles.buttonWrapperUpload} >
              <Text style={[styles.buttonUploadText,{color:colors.themeColor,}]} >Upload Image</Text>
           </TouchableOpacity> :

          <Text style={{color:colors.white,fontFamily:fontsName.RobotoMedium,fontSize:responsiveFontSize(1.9),textAlign:'center',marginTop:responsiveHeight(1.5)}} >Jenny, 22</Text>
        }
           </View>

           </ImageBackground>
    

        <View style={styles.accountTextWrapper}>
           <Text style={styles.accountText} >Account Settings</Text>
           
           <TouchableOpacity  onPress={()=>{navigation.navigate(NavigationString.AccountSetting)} }>
           <Text style={styles.accountEdit} >Edit</Text>
           </TouchableOpacity>
           
        </View>

        <ScrollView style={{marginHorizontal:responsiveWidth(6),marginTop:responsiveHeight(1.5)}} showsVerticalScrollIndicator={false} >

           <UserDataBox fieldName={'Name'}  fieldText={userInfo.name} />

           <UserDataBox fieldName={'Phone Number'}  fieldText={`+91 ${userInfo.mobile}`} />

           <UserDataBox fieldName={'Date of Birth'}  fieldText={`${userInfo.dob}`} />

           <UserDataBox fieldName={'Email'}  fieldText={`${userInfo.email}`} />

           <Text style={[styles.accountText,{marginBottom:responsiveHeight(1)}]} >Plan Settings</Text>

           <UserDataBox fieldName={'Current Plan'} onPress={()=>{getLocation()}}  fieldText={'Free'} fieldTextColor={colors.edit} />

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
        <Loader visible={VisibleLoader}  />
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
    resizeMode:'cover',
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
  },
  buttonWrapperUpload:{
    backgroundColor:colors.white,
    borderColor:colors.whiteOpacity20,
    borderWidth:1,
    paddingVertical:responsiveHeight(1.3),
    paddingHorizontal:responsiveWidth(3),
    borderRadius:responsiveWidth(1),
    marginTop:responsiveHeight(2),
    alignSelf:'center',
    elevation:5

  }

})