import { StyleSheet, Text, View,Image,TouchableOpacity,TextInput,Pressable} from 'react-native'
import React,{useState} from 'react'
import colors from '../../style/colors'
import imagePaths from '../../constant/imagePaths'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import fontsName from '../../style/fontsName'
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import DateTimePickerModal from "react-native-modal-datetime-picker"; 
import Toast from 'react-native-simple-toast'

import { userFormSchema, userLoginSchema } from '../../utiles/yupValidation'
import Dropdown from '../../components/Dropdown'
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import Loader from '../../components/Loader'
import { getUserDetails, setUserDetails } from '../../utiles/services'
import NavigationString from '../../constant/NavigationString'

const SignUp = ({navigation}) => {

    const genders = [{id:1,name:'men'},{id:2,name:'women'}]

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [Dob, setDob] = useState('DD/MM/YYYY')

    const [signInStatus, setsignInStatus] = useState(false)

    const [selectedGender, setSelectedGender] = useState(null)
    const [hideP, setHideP] = useState(true)
    const [hideCP, setHideCP] = useState(true)
    const [Visible, setVisible] = useState(false)

    const onSelectGender = (item) => {
        setSelectedGender(item)
     }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
      const handleDateConfirm = async(date) => {
    
        // console.warn("A date has been picked:",date);
        // setDob(date)
        // console.log({Dob});
        const dt = new Date(date)
        const x = dt.toISOString().split('T');
        console.log({x});
        const x1 = x[0].split('-');
        console.log(x1[2] + '/' + x1[1] + '/'+ x1[0]);
        setDob(x1[2] + '-' + x1[1] + '-'+ x1[0])
    
    
        hideDatePicker();
      }

              //Toast MSG
 const showToast = (msg) =>{
    Toast.show(msg);
 }

     //login code
     const loginUser = async (email,pw) => {
        firestore().collection("users").where("email","==",email ).where("password","==",pw).get().then(res => {
  
          if(res.docs != []){
            console.log('save data Get',JSON.stringify(res.docs[0].data()))

           setUserDetails(res.docs[0]?.data())
            goToNext(res.docs[0].data())
          
          }else{
            setVisible(false)
            showToast('User not found,please Email/password..')
          }
         
        }).catch(err=>{
          console.log(err)
          setVisible(false)
          showToast('User not found,please Email/password..')
        })
      }

      const goToNext = async(data) => {
         let res =await setUserDetails(data)
         await showToast('Login Successfully')
         console.log('saved AsynStorage',res);
         navigation.navigate(NavigationString.TabStack)

        await setVisible(false)
      }


      const getDatauser = async() => {
            
        let res = await getUserDetails()
        let Fres = await JSON.parse(res)
        console.log("DAta",Fres.name);
      }



  return (
    <View style={styles.mainContainer} >
          <TouchableOpacity onPress={()=>{navigation.goBack()}} >
            <Image tintColor={'#8E8E8E'} source={imagePaths.arrowleft} style={styles.arrowleft} />
            </TouchableOpacity>

            <Text style={styles.signUpText} >{signInStatus ? "Sign Up" :"Sign In"}</Text>


           { signInStatus? 
           <KeyboardAwareScrollView showsVerticalScrollIndicator={false} bounces={false} >

           <Formik initialValues={{
        name:'',
        email:'',
        mobile:'',
        password:'',
        cpassword:'',
     
       
      }} validationSchema={userFormSchema} 
       
       onSubmit={(values,formikActions) => {
        setVisible(true)
        // console.log({values})
        if( Dob === 'DD/MM/YYYY' || Dob == null){
            showToast('Please select DOB field')
                
                // console.warn('Relation select')
             
            
        }if(selectedGender==null || selectedGender == 'Choose Gender'){
            showToast('Please select gender field')
        } else{
           var data={...values,dob:Dob,gender:selectedGender?.name}
            console.log({data})
           
         
        const userId= uuid.v4()
        firestore().collection("users").doc(userId).set({
          name:data.name,
          email:data.email.toLowerCase(),
          mobile:data.mobile,
          password:data.cpassword,
          gender:data.gender,
          dob:data.dob,
          userid:userId,
          profile:'',
          chatlist:[],
          interset:'',
          location:''
        }).then(res=>{
           setVisible(false)
            showToast("SignUp Successfully..")
            formikActions.resetForm()
            setDob('DD/MM/YYYY')
            setSelectedGender(null)
            setHideCP(true)
            setHideP(true)
            
          console.log("user Created...")
        }).catch(err=>{
          console.log(err)
        })
     

        }
        
        

        //  checkValidUser(values)
        }}
       >

      {({values,errors,touched,handleSubmit,handleChange,setFieldTouched,isValid,resetForm})=>(

        <>

         <TextInput
            placeholder='Enter Name'
            style={[styles.inputField,{marginBottom: touched.name && errors.name ? responsiveHeight(0):responsiveHeight(1.5) }]}
            placeholderTextColor={colors.blackOpacity15}
            value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={()=>{setFieldTouched('name')}}
         />
         { touched.name && errors.name && (<Text style={{color:'red',marginLeft:responsiveWidth(10),marginBottom:responsiveHeight(1),}}>{errors.name}</Text>)}


         <Dropdown value={selectedGender} data={genders} onSelect={onSelectGender} />
        
        <TextInput
            placeholder='Enter Mobile Number'
            style={[styles.inputField,{marginBottom: touched.mobile && errors.mobile ? responsiveHeight(0):responsiveHeight(1.5) }]}
            placeholderTextColor={colors.blackOpacity15}
            keyboardType='number-pad'
            value={values.mobile}
                  onChangeText={handleChange('mobile')}
                  onBlur={()=>{setFieldTouched('mobile')}}
         />
         { touched.mobile && errors.mobile && (<Text style={{color:'red',marginLeft:responsiveWidth(10),marginBottom:responsiveHeight(2),}}>{errors.mobile}</Text>)}
         
         <View style={styles.dateWrapper} >
         
            <Text  style={[styles.dateText,{color:Dob=='DD/MM/YYYY'?colors.blackOpacity15:colors.black}]}>{Dob}</Text>
            
            <TouchableOpacity onPress={()=>{showDatePicker()}} >
            <Icon  name={'calendar-clear-outline'} size={responsiveWidth(6)} color={colors.black} />
            </TouchableOpacity>
            

         </View>

         <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
          />

                 
        <TextInput
            placeholder='Enter Email Address'
            style={[styles.inputField,{marginBottom: touched.email && errors.email ? responsiveHeight(0):responsiveHeight(1.5) }]}
            placeholderTextColor={colors.blackOpacity15}
            keyboardType='email-address'
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={()=>{setFieldTouched('email')}}
         />
         { touched.email && errors.email && (<Text style={{color:'red',marginLeft:responsiveWidth(10),marginBottom:responsiveHeight(2),}}>{errors.email}</Text>)}
        
         
         <View style={{flexDirection:'row',alignItems:'center',marginHorizontal:responsiveWidth(10), borderBottomColor:colors.blackOpacity15, borderBottomWidth:1,marginBottom: touched.email && errors.email ? responsiveHeight(0):responsiveHeight(1.5) ,}} >

         <TextInput
            placeholder='Enter Password'
            style={{flex:1,color:colors.black,
        // marginHorizontal:responsiveWidth(10),
   
        // paddingLeft:responsiveWidth(5),
        
        fontFamily:fontsName.RobotoRegular,
        fontSize:responsiveFontSize(2),       }}
            placeholderTextColor={colors.blackOpacity15}
            secureTextEntry={hideP}
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={()=>{setFieldTouched('password')}}
         />
         <Icon onPress={()=>{setHideP(!hideP)}} name={hideP?"eye-off":"eye"} size={responsiveWidth(6)} color={colors.blackOpacity15} />
         </View>
         { touched.password && errors.password && (<Text style={{color:'red',marginLeft:responsiveWidth(10),marginBottom:responsiveHeight(2),}}>{errors.password}</Text>)}

         <View style={{flexDirection:'row',alignItems:'center',marginHorizontal:responsiveWidth(10), borderBottomColor:colors.blackOpacity15, borderBottomWidth:1,marginBottom: touched.email && errors.email ? responsiveHeight(0):responsiveHeight(1.5) ,}} >

<TextInput
   placeholder='Enter Confirm Password'
   style={{flex:1,color:colors.black,
// marginHorizontal:responsiveWidth(10),

// paddingLeft:responsiveWidth(5),

fontFamily:fontsName.RobotoRegular,
fontSize:responsiveFontSize(2),       }}
   placeholderTextColor={colors.blackOpacity15}
   secureTextEntry={hideCP}
   value={values.cpassword}
   onChangeText={handleChange('cpassword')}
   onBlur={()=>{setFieldTouched('cpassword')}}
/>
<Icon onPress={()=>{setHideCP(!hideCP)}} name={hideCP?"eye-off":"eye"} size={responsiveWidth(6)} color={colors.blackOpacity15} />
</View>
{ touched.cpassword && errors.cpassword && (<Text style={{color:'red',marginLeft:responsiveWidth(10),marginBottom:responsiveHeight(2),}}>{errors.cpassword}</Text>)}
         


         

         <TouchableOpacity disabled={!isValid} onPress={handleSubmit} style={styles.buttonWrapper} >
            <Text style={styles.buttonText}>Submit</Text>
         </TouchableOpacity>






         </>
     
     )}

             </Formik>

             <View style={{flexDirection:'row',alignSelf:'center',marginTop:responsiveHeight(4)}} >
            <Text style={{color:colors.black,fontFamily:fontsName.RobotoMedium,fontSize:responsiveFontSize(1.8)}} >{signInStatus? "Do have account?" :"Don't have account?"} </Text>
            <Pressable onPress={()=>{setsignInStatus(!signInStatus)}} >
                <Text style={{color:colors.black,fontFamily:fontsName.RobotoMedium,fontSize:responsiveFontSize(1.8),textDecorationLine:'underline'}} >{signInStatus?'SignIn':'SignUp'}</Text>
            </Pressable>
        </View>
             </KeyboardAwareScrollView>  
             : 
             <>
             <Formik initialValues={{
    
    email:'',
   password:'',
   
  }} validationSchema={userLoginSchema} 
   
   onSubmit={values => {
    // console.log({values})
      setVisible(true)
    //    var data={...values,dob:Dob,gender:selectedGender?.name}
        console.log({values})

        let email = values.email.toLowerCase()

        loginUser(email,values.password)
       
     
    // const userId= uuid.v4()
    // firestore().collection("users").doc(userId).set({
    //   name:data.name,
    //   email:data.email,
    //   mobile:data.mobile,
    //   userid:userId
    // }).then(res=>{
    //   console.log("user Created...")
    // }).catch(err=>{
    //   console.log(err)
    // })
 

    
    
    

    //  checkValidUser(values)
    }}
   >

  {({values,errors,touched,handleSubmit,handleChange,setFieldTouched,isValid})=>(

    <>

     

 

     

   

             
    <TextInput 
        placeholder='Enter Your Email '
        style={[styles.inputField,{marginBottom: touched.email && errors.email ? responsiveHeight(0):responsiveHeight(1.5) }]}
        placeholderTextColor={colors.blackOpacity15}
        keyboardType='email-address'
        value={values.email}
        onChangeText={handleChange('email')}
        onBlur={()=>{setFieldTouched('email')}}
     />
     { touched.email && errors.email && (<Text style={{color:'red',marginLeft:responsiveWidth(10),marginBottom:responsiveHeight(2),}}>{errors.email}</Text>)}
     
     <View style={{flexDirection:'row',alignItems:'center',marginHorizontal:responsiveWidth(10), borderBottomColor:colors.blackOpacity15, borderBottomWidth:1,marginBottom: touched.email && errors.email ? responsiveHeight(0):responsiveHeight(1.5) ,}} >

<TextInput
   placeholder='Enter Your Password'
   style={{flex:1,color:colors.black,
// marginHorizontal:responsiveWidth(10),

// paddingLeft:responsiveWidth(5),

fontFamily:fontsName.RobotoRegular,
fontSize:responsiveFontSize(2),       }}
   placeholderTextColor={colors.blackOpacity15}
   secureTextEntry={hideP}
   value={values.password}
   onChangeText={handleChange('password')}
   onBlur={()=>{setFieldTouched('password')}}
/>
<Icon onPress={()=>{setHideP(!hideP)}} name={hideP?"eye-off":"eye"} size={responsiveWidth(6)} color={colors.blackOpacity15} />
</View>
  { touched.password && errors.password && (<Text style={{color:'red',marginLeft:responsiveWidth(10),marginBottom:responsiveHeight(2),}}>{errors.password}</Text>)}



     

     <TouchableOpacity disabled={!isValid} onPress={handleSubmit} style={styles.buttonWrapper} >
        <Text style={styles.buttonText}>Login</Text>
     </TouchableOpacity>






     </>
 
 )}

         </Formik>
         <View style={{flexDirection:'row',alignSelf:'center',marginTop:responsiveHeight(4)}} >
            <Text style={{color:colors.black,fontFamily:fontsName.RobotoMedium,fontSize:responsiveFontSize(1.8)}} >{signInStatus? "Do have account?" :"Don't have account?"} </Text>
            <Pressable onPress={()=>{setsignInStatus(!signInStatus)}} >
                <Text style={{color:colors.black,fontFamily:fontsName.RobotoMedium,fontSize:responsiveFontSize(1.8),textDecorationLine:'underline'}} >{signInStatus?'SignIn':'SignUp'}</Text>
            </Pressable>
        </View>


             </>
          
             
             }

 
             <Loader visible={Visible} />
        
        
    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({

    mainContainer:{
        flex:1,
        backgroundColor:colors.white,
        
      },
      arrowleft:{
        width:responsiveWidth(7),
        height:responsiveHeight(2),
        marginTop:responsiveHeight(5),
        marginLeft:responsiveWidth(4)
      },
      signUpText:{
        color:colors.black,
        fontFamily:fontsName.RobotoMedium,
        fontSize:responsiveFontSize(3.3),
        marginLeft:responsiveWidth(10),
        marginTop:responsiveHeight(3),
        marginBottom:responsiveHeight(5)
        // fontWeight:'700'
      },
      inputField:{
        color:colors.black,
        marginHorizontal:responsiveWidth(10),
   
        // paddingLeft:responsiveWidth(5),
        
        fontFamily:fontsName.RobotoRegular,
        fontSize:responsiveFontSize(2),
        borderBottomColor:colors.blackOpacity15,
        borderBottomWidth:1,
  

      },
      dateWrapper:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:responsiveWidth(10),
        borderBottomColor:colors.blackOpacity15,
        borderBottomWidth:1,
        paddingHorizontal:responsiveWidth(2),
        paddingVertical:responsiveHeight(1.4),
        borderRadius:responsiveWidth(1),
        // marginBottom:responsiveHeight(1),


      },
      dateText:{
        
        fontFamily:fontsName.RobotoRegular,
        fontSize:responsiveFontSize(2),
        
      },
      buttonWrapper:{
        alignSelf:'center',
        backgroundColor:colors.themeColor,
        paddingVertical:responsiveHeight(1.8),
        paddingHorizontal:responsiveWidth(38),
        borderRadius:responsiveWidth(6),
        marginTop:responsiveHeight(4)
      },
      buttonText:{

        color:colors.white,
        textTransform:'uppercase',
        fontFamily:fontsName.RobotoMedium,
        fontSize:responsiveFontSize(1.8)

      }
})