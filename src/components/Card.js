import { View , Text, Image, StyleSheet, Dimensions, Animated } from "react-native";

const { width , height } = Dimensions.get("screen");
import { Fragment, useCallback } from "react";
import Choice from "./Choice";
import LinearGradient from "react-native-linear-gradient";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import colors from "../style/colors";
import { wHeight, wWidht } from "../style/Dimensions";

const Card = ({ name, age, location, distance, image, isFirst, swipe, titlSign, ...rest })=>{

    // Calculate the rotation of the card based on swipe gesture
    const rotate = Animated.multiply(swipe.x,titlSign).interpolate({
        inputRange: [-100,0,100],
        outputRange: ['8deg', '0deg', '-8deg']
    });

     // Animated style for the card with rotation and translation
    const animatedCardStyle = {
        transform: [...swipe.getTranslateTransform(), { rotate }]
    }

    // Opacity animation for the "like" button
    const likeOpacity = swipe.x.interpolate({
        inputRange: [25, 100],
        outputRange: [0,1],
        extrapolate: 'clamp'
    });

    // Opacity animation for the "nope" button
    const nopeOpacity = swipe.x.interpolate({
        inputRange: [-100, -25],
        outputRange: [1,0],
        extrapolate: 'clamp'
    });

    // Function to render the "like" and "nope" buttons conditionally
    const renderChoice = useCallback(()=>{
        return (
           <Fragment>
              <Animated.View
               style={[
                styles.choiceContainer, 
                styles.likeContainer,
                { opacity: likeOpacity }
                ]}>
                 <Choice type="heart" color={colors.themeColor} size={24} />
              </Animated.View>
              <Animated.View 
                style={[
                    styles.choiceContainer, 
                    styles.nopeContainer,
                { opacity: nopeOpacity }
                    ]}>
                 <Choice type="close-outline" color={colors.redCross} size={24} />
              </Animated.View>
           </Fragment>
        )
    },[likeOpacity, nopeOpacity])

    return (
        <Animated.View style={[
            styles.container,
            isFirst && animatedCardStyle
            ]} {...rest}>
            <Image source={image} style={styles.image} />
            <LinearGradient 
              colors={['transparent', 'rgba(0,0,0,.9)']}
              style={styles.gradient}/>
              <View style={styles.userContainer}>
                <Text style={styles.name}>{name}, {age} </Text>
                <Text style={styles.location}>Live in {location}</Text>
                <Text style={styles.distance}>{distance} miles away</Text>
              </View>
            {isFirst && renderChoice()}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container:{
        position: "absolute",
        marginTop:responsiveHeight(15)
    },
    image: {
        width: width * 0.9,
        height: height * 0.6,
        borderRadius: responsiveWidth(5)
    },
    gradient: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: responsiveHeight(25),
        borderRadius:  responsiveWidth(5)
    },
    userContainer:{
        position: "absolute",
        bottom: wHeight*0.03,
        left: wWidht*0.06
    },
    name: {
        fontSize: responsiveFontSize(3.85),
        color: "#FFFFFF",
        fontWeight: "400"
    },
    location: {
        fontSize: responsiveFontSize(2.3),
        color: "#FFFFFF",
        fontWeight: "300"
    },
    distance: {
        fontSize:  responsiveFontSize(2.3),
        color: "#FFFFFF",
        fontWeight: "300"
    },
    choiceContainer: {
       position: 'absolute',
       top: wHeight*0.13
    },
    likeContainer:{
      left: wWidht*0.12,
      transform: [{ rotate: '-30deg' }]
    },
    nopeContainer:{
      right: wWidht*0.12,
      transform: [{ rotate: '30deg' }]
    },
})

export default Card