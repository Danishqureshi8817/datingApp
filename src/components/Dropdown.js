import { StyleSheet, Text, View,TouchableOpacity} from 'react-native'
import React,{useState} from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import {
    responsiveHeight,
    responsiveFontSize,

    responsiveWidth,
  } from 'react-native-responsive-dimensions';
import colors from '../style/colors';

const Dropdown = ({data=[],value={},onSelect = () =>{}}) => {

    const [showOption, setShowOption] = useState(false)

    console.log({value});

    const onSelectedItem = (val) => {
        setShowOption(false)
        onSelect(val)

    }
  return (
    <View>
       <TouchableOpacity style={styles.dropDownStyle} activeOpacity={0.8} onPress={()=>{setShowOption(!showOption)}} >
      
       <Text style={{color:!!value?colors.black:colors.blackOpacity15,textTransform:'capitalize'}} >{!!value? value?.name:'Choose Gender'}</Text>
           
     <Icon
              name={showOption ?'caret-up':"caret-down"}
              size={responsiveWidth(6)}
       
              color={colors.blackOpacity15}
              style={{
                
              }}
            />
       
    
       </TouchableOpacity>
      
   {  showOption &&  (<View style={{marginTop:responsiveHeight(0.5)}} >
       
      {
        data.map((val,i)=>{
            return(
                <TouchableOpacity style={[styles.dropDownOption,{backgroundColor: value?.id == val?.id ?colors.white: colors.white,}]} key={String(i)} onPress={()=>onSelectedItem(val)}>
                <Text style={{color: value?.id == val?.id ?colors.black:colors.blackOpacity15,textTransform:'capitalize'}}>{val.name}</Text>
                </TouchableOpacity>
            )
                
               
        })
       }


      </View>)}
    
    </View>
  )
}

export default Dropdown

const styles = StyleSheet.create({

    dropDownStyle:{
   
        // backgroundColor: colors.blackOpacity15,
        borderBottomColor:colors.blackOpacity15,
        borderBottomWidth:1,
        marginHorizontal: responsiveWidth(10),
        paddingHorizontal: responsiveWidth(1),
        color: colors.black,
        // marginTop: responsiveHeight(1),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical:responsiveHeight(1)

    },
    dropDownOption:{
      borderBottomColor:colors.blackOpacity15,
      borderBottomWidth:1,
        marginHorizontal: responsiveWidth(8),
        borderRadius: responsiveWidth(1),
        paddingHorizontal: responsiveWidth(4),
        paddingVertical:responsiveHeight(1),
       
    }

})