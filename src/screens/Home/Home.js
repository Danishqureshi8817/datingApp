
import { PanResponder, View, Animated , Dimensions,StatusBar } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from "react";
import { users as usersArray } from "../../utiles/data";
import Card from "../../components/Card";
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import colors from '../../style/colors';
import { wHeight } from '../../style/Dimensions';

const { width, height } = Dimensions.get("screen");

import firestore from '@react-native-firebase/firestore'
import { getUserDetails } from '../../utiles/services';

export default function App() {
  // State to hold the users data
  const [users,setUsers] = useState(usersArray);

  const [usersF, setUsersF] = useState('')

  // Animated values for swipe and tilt
  const swipe = useRef(new Animated.ValueXY()).current;
  const titlSign = useRef(new Animated.Value(1)).current;

  const getUsers = async() => {
    let tempData = []
    let ress = await getUserDetails()
    let userData = await JSON.parse(ress)
    console.log("Home DAta",userData?.email);
    firestore().collection("users").where("email","!=",'danishqureshi8817@gmail.com').get().then(res=>{
      if(res.docs != []){
      console.log(res.docs);
    res.docs.map(item => {
      tempData.push(item.data())
    })
    setUsersF(tempData)}
    })
  }
console.log({usersF});
  useEffect(() => {
     getUsers()
  }, [])
  

  useEffect(()=>{
    // Reset users data if the array is empty
     
    if(!users.length){
      setUsers(usersArray);
    }
  },[users.length])

  // PanResponder configuration
  const panResponder = PanResponder.create({
     // Allow pan responder to activate
    onMoveShouldSetPanResponder: ()=>true,

     // Handle card movement while dragging
    onPanResponderMove: (_, {dx, dy, y0})=>{
      swipe.setValue({x: dx, y: dy});
      titlSign.setValue(y0 > (height * 0.9) / 2 ? 1 : -1)
    },

    // Handle card release after dragging
    onPanResponderRelease: (_, { dx, dy })=>{
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > 100;

      if(isActionActive){
        // Swipe the card off the screen
        Animated.timing(swipe, {
          duration: 100,
          toValue: {
            x: direction * 500,
            y: dy
          },
          useNativeDriver: true
        }).start(removeTopCard);

      }else{
        // Return the card to its original position
        Animated.spring(swipe, {
          toValue: {
            x: 0,
            y: 0
          },
          useNativeDriver: true,
          friction: 5
        }).start()
      }
    }
  })

  // remove the top card from the users array
  const removeTopCard = useCallback(()=>{
    setUsers((prevState)=>prevState.slice(1));
    swipe.setValue({ x: 0, y: 0});
  },[swipe]);

  // handle user choice (left or right swipe)
  const handleChoice = useCallback((direction)=>{
    Animated.timing(swipe.x, {
      toValue: direction  * 500,
      duration: 400,
      useNativeDriver: true
    }).start(removeTopCard);

  },[removeTopCard,swipe.x]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.white, alignItems: "center",}}>
          <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} />

        <Header />
      {/* Map through users and render Card components */}
     

     
       {
        users.map(({ name, image, location, distance, age  }, index )=>{
          const isFirst = index == 0;
          const dragHandlers = isFirst ? panResponder.panHandlers : {};

          return (
           <Card
             key={name}
             name={name}
             location={location}
             distance={distance}
             age={age}
             image={image}
             isFirst={isFirst}
             swipe={swipe}
             titlSign={titlSign}
             {...dragHandlers}
           />
          )
        }).reverse()
       }

      
        {/* Render the Footer component */}
       <Footer handleChoice={handleChoice} />
    </View>
  );
}
