import { View, Text , ImageBackground } from 'react-native'
import React from 'react'

import bgImg from "../../assets/img1.png";


export default function Groups() {
  return (
    <ImageBackground source={bgImg} style={{flex: 1}}>
    <View  style={{
          alignItems: "center", //Alignement horizental
          justifyContent: "center", //Alignement vertical
          flexDirection: "column",
          marginBottom: 10,
        }}>

    
    </View>
  </ImageBackground>
  )
}