import AsyncStorage from '@react-native-async-storage/async-storage';


async function setUserDetails(userData) {
    return AsyncStorage.setItem('userDetails', JSON.stringify(userData) )
     .then(() => 'success saved userDetails ')
     .catch(e => 'error');
 }
 
 
 async function getUserDetails() {
   const token = await AsyncStorage.getItem('userDetails');
    return token;
 }
 
 
 async function removeUserDetails() {
   const token = await AsyncStorage.removeItem('userDetails');
       console.log("userDetails Removed",token)
   return token;
 }


 export {setUserDetails, getUserDetails , removeUserDetails ,};