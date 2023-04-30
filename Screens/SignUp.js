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

export default function SignUp(props) {
  const auth = firebase.auth();

  const [email, setemail] = useState("");
  const [mdp, setmdp] = useState("");
  const [confirmpwd, setconfirmpwd] = useState();
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [errorMessage, seterrorMessage] = useState("")

  const isEmailError = emailErrorMessage !== "";
  const isPasswordError = passwordErrorMessage !== "";
  

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
          New Account
        </Text>

        <TextInput
          onChangeText={(ch) => {
            setemail(ch);
          }}
          style={styles.textinput}
          placeholder="Email"
          keyboardType="email-address"
        ></TextInput>
        <View>

        {isEmailError ? (
          <Text style={{ color: "white", marginBottom: "5%" }}>
            {emailErrorMessage}
          </Text>
        ) : null}
        </View>
        

        <TextInput
          onChangeText={(ch) => {
            setmdp(ch);
          }}
          style={styles.textinput}
          placeholder="Password"
          keyboardType="default"
          secureTextEntry={true}
        ></TextInput>

        <TextInput
          onChangeText={(ch) => {
            setconfirmpwd(ch);
          }}
          style={styles.textinput}
          placeholder="Confirm Password"
          keyboardType="default"
          secureTextEntry={true}
        ></TextInput>
        {isPasswordError ? (
          <Text style={{ color: "white" }}>{passwordErrorMessage}</Text>  
                  
        ):null }

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
  onPress={(v) => {
    if(email=="")
    {
      setEmailErrorMessage("email is required")
    }
    else if(isEmailError)
    {
      setEmailErrorMessage("Check your Email")
    }
    else if(mdp=="")
    {
      setPasswordErrorMessage("password is required")
      console.log(setErrorMessage)
      console.log("isEmailError:" , isEmailError)
    }
    
    else if (mdp !== confirmpwd) {
      setPasswordErrorMessage("Les mots de passe ne correspondent pas");
      console.log("errorMessage:", errorMessage);
      console.log("Email : ",email)
    } 
      auth
        .createUserWithEmailAndPassword(email, mdp)
        .then(() => {
          props.navigation.replace("Home");
        })
        .catch((ex) => {
          console.log("Error:", ex);
          seterrorMessage(ex.message);
          console.log("errorMessage:", errorMessage);
        });
    
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
