import { StatusBar } from "expo-status-bar";
import {
  BackHandler,
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import bgImg from "../assets/img1.png";
import { useState } from "react";
import firebase from "../Config";


export default function Auth(props) {

  const auth = firebase.auth()

  const [email, setemail] = useState("hamza1@gmail.com");
  const [mdp, setmdp] = useState("123456");
  return (
    <ImageBackground source={bgImg} style={styles.container}>
      <View
        style={{
          backgroundColor: "rgba(52, 52, 52, 0.6)",
          borderRadius: 10,
          padding: 25,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 32,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          Authentification
        </Text>

        <TextInput
          onChangeText={(ch) => {
            setemail(ch);
          }}
          style={styles.textinput}
          placeholder="Email"
          keyboardType="email-address"
        ></TextInput>
        <TextInput
          onChangeText={(ch) => {
            setmdp(ch);
          }}
          style={styles.textinput}
          placeholder="Password"
          keyboardType="default"
          secureTextEntry={true}
        ></TextInput>

        <Text
        onPress={()=> {
          props.navigation.navigate("Signup")
        }}
          style={{
            color: "white",
            fontSize: 15,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          create New User
        </Text>

        <View style={{ flexDirection: "row" }}>

        <TouchableOpacity
            style={styles.touchable}
            onPress={(v) => {
              BackHandler.exitApp();
            }}
          >
            <Text style={styles.text}>Dismiss</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.touchable}
            onPress={()=> {
             auth.signInWithEmailAndPassword(email,mdp)
             .then(()=>{  props.navigation.navigate("Home") })
             .catch((ex)=>{ alert("Check your credential")})
            }}
          >
            <Text style={styles.text}>Valider</Text>
          </TouchableOpacity>

         
        </View>

        <StatusBar style="light" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
    alignItems: "center", //Alignement horizental
    justifyContent: "center", //Alignement vertical
    flexDirection: "column",
  },
  textinput: {
    width: 250,
    height: 50,
    backgroundColor: "white",
    textAlign: "center",
    borderRadius: 10,
    marginBottom: 15,
  },
  touchable: {
    backgroundColor: "white",
    height: 40,
    width: 100,
    margin: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "blue",
  },
});
