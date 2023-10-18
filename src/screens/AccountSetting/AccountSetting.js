import { StyleSheet, Text, View ,Image, TextInput, TouchableOpacity,ToastAndroid} from 'react-native'
import React,{useState} from 'react'
import colors from '../../style/colors'
import imagePaths from '../../constant/imagePaths'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import fontsName from '../../style/fontsName'
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationString from '../../constant/NavigationString'
import { Formik } from 'formik';
import { userFormSchema } from '../../utiles/yupValidation'
import DateTimePickerModal from "react-native-modal-datetime-picker"; 
import Toast from 'react-native-simple-toast'
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';



const AccountSetting = ({navigation}) => {


    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [Dob, setDob] = useState('Select DOB')

    //login code
    const loginUser = () => {
      firestore().collection("users").where("email","==","Dsg@bhh").get().then(res => {

        if(res.docs != []){
          console.log('save data',JSON.stringify(res.docs[0].data()))
        }
       
      }).catch(err=>{
        console.log(err)
      })
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
        setDob(x1[2] + '/' + x1[1] + '/'+ x1[0])
    
    
        hideDatePicker();
      }


      const showToast = (msg) => {
        ToastAndroid.show(msg,ToastAndroid.SHORT)
      }


      const dataSubmit = () => {
        const userId= uuid.v4()
        firestore().collection("users").doc(userId).set({
          name
        })
      }

  return (
    <View style={styles.mainContainer} >

         <View style={styles.header} >

            <TouchableOpacity onPress={()=>{navigation.goBack()}} >
            <Image tintColor={colors.black} source={imagePaths.arrowleft} style={styles.arrowleft} />
            </TouchableOpacity>
            
            <Text style={styles.headerText} >Edit</Text>
         </View>

         <Text style={styles.accountText} >Account Settings</Text>

         <Formik initialValues={{
        name:'',
        email:'',
        mobile:'',
       
      }} validationSchema={userFormSchema} 
       
       onSubmit={values => {
        // console.log({values})
        if( Dob === 'Select DOB' || Dob == null){
          
                showToast('Please select DOB field')
                // console.warn('Relation select')
             
            
        }else{
           var data={...values,DOB:Dob}
            console.log({data})
           
         
        const userId= uuid.v4()
        firestore().collection("users").doc(userId).set({
          name:data.name,
          email:data.email,
          mobile:data.mobile,
          userid:userId
        }).then(res=>{
          console.log("user Created...")
        }).catch(err=>{
          console.log(err)
        })
     

        }
        
        

        //  checkValidUser(values)
        }}
       >

      {({values,errors,touched,handleSubmit,handleChange,setFieldTouched,isValid})=>(

        <>

         <TextInput
            placeholder='Enter Name'
            style={[styles.inputField,{marginBottom: touched.name && errors.name ? responsiveHeight(0):responsiveHeight(2) }]}
            placeholderTextColor={colors.black}
            value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={()=>{setFieldTouched('name')}}
         />
         { touched.name && errors.name && (<Text style={{color:'red',marginLeft:responsiveWidth(5),marginBottom:responsiveHeight(2),}}>{errors.name}</Text>)}
        
        <TextInput
            placeholder='Enter Mobile Number'
            style={[styles.inputField,{marginBottom: touched.mobile && errors.mobile ? responsiveHeight(0):responsiveHeight(2) }]}
            placeholderTextColor={colors.black}
            keyboardType='number-pad'
            value={values.mobile}
                  onChangeText={handleChange('mobile')}
                  onBlur={()=>{setFieldTouched('mobile')}}
         />
         { touched.mobile && errors.mobile && (<Text style={{color:'red',marginLeft:responsiveWidth(5),marginBottom:responsiveHeight(2),}}>{errors.mobile}</Text>)}
         
         <View style={styles.dateWrapper} >

            <Text  style={styles.dateText}>{Dob}</Text>
            
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
            style={[styles.inputField,{marginBottom: touched.email && errors.email ? responsiveHeight(0):responsiveHeight(2) }]}
            placeholderTextColor={colors.black}
            keyboardType='email-address'
            value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={()=>{setFieldTouched('email')}}
         />
         { touched.email && errors.email && (<Text style={{color:'red',marginLeft:responsiveWidth(5),marginBottom:responsiveHeight(2),}}>{errors.email}</Text>)}
         


         

         <TouchableOpacity disabled={!isValid} onPress={handleSubmit} style={styles.buttonWrapper} >
            <Text style={styles.buttonText}>Save</Text>
         </TouchableOpacity>


         </>
     
     )}

     </Formik>


    </View>
  )
}

export default AccountSetting

const styles = StyleSheet.create({

    mainContainer:{
        flex:1,
        backgroundColor:colors.white,
    },
    header:{
        flexDirection:'row',
        marginHorizontal:responsiveWidth(4),
        marginTop:responsiveHeight(6),
        alignItems:'center',
        marginBottom:responsiveHeight(2)
     
       },
       arrowleft:{
         width:responsiveWidth(7),
         height:responsiveHeight(2)
       },
       headerText:{
         color:colors.black,
         fontSize:responsiveFontSize(2.5),
         fontFamily:fontsName.RobotoMedium,
         marginLeft:responsiveWidth(35),
         textAlign:'center'
       },
       inputField:{
         color:colors.black,
         marginHorizontal:responsiveWidth(4),
         borderWidth:1,
         borderColor:colors.blackOpacity15,
         borderRadius:responsiveWidth(1),
         paddingLeft:responsiveWidth(5),
         
         fontFamily:fontsName.RobotoRegular,
         fontSize:responsiveFontSize(2),
   

       },
       accountText:{
        color:colors.black,
        fontSize:responsiveFontSize(2.1),
        fontFamily:fontsName.RobotoRegular,
        fontWeight:'700',
        marginHorizontal:responsiveWidth(4),
        marginVertical:responsiveHeight(2),
        
    
      },
      dateWrapper:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:responsiveWidth(4),
        borderWidth:1,
        borderColor:colors.blackOpacity15,
        paddingHorizontal:responsiveWidth(5),
        paddingVertical:responsiveHeight(1.4),
        borderRadius:responsiveWidth(1),
        marginBottom:responsiveHeight(2),


      },
      dateText:{
        color:colors.black,
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