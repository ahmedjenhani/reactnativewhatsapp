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
import bgImg from "../../assets/img1.png";
import profilImage from "../../assets/user.png";
import firebase from "../../Config";
import * as ImagePicker from 'expo-image-picker'

import { useState } from "react";
import { Image } from "react-native";

const database = firebase.database();

export default function MyAccount() {
  const [nom, setnom] = useState("");
  const [prenom, setprenom] = useState("");
  const [pseudo, setpseudo] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      console.log(result.assets[0].uri);
    }
  };

  return (
    <ImageBackground source={bgImg} style={styles.container}>
      <View
        style={{
          backgroundColor: "rgba(52, 52, 52, 0.6)",
          borderRadius: 10,
          padding: 25,
        }}
      >
        <TouchableOpacity
          style={{
            alignItems: "center", //Alignement horizental
            justifyContent: "center", //Alignement vertical
            flexDirection: "column",
            marginBottom: 10,
          }}
          onPress={()=>{pickImage()}}
        >
          <Image
            source={profilImage}
            style={{
              width: 100,
              height: 100,
              borderRadius: 400 / 2,
              // alignItems: "center",
              // justifyContent: "center",
            }}
          />
        </TouchableOpacity>

        <TextInput
          onChangeText={(ch) => {
            setnom(ch);
          }}
          style={styles.textinput}
          placeholder="Nom"
        ></TextInput>
        <TextInput
          onChangeText={(ch) => {
            setprenom(ch);
          }}
          style={styles.textinput}
          placeholder="Prenom"
          keyboardType="default"
        ></TextInput>

        <TextInput
          onChangeText={(ch) => {
            setpseudo(ch);
          }}
          style={styles.textinput}
          placeholder="Pseudo"
          keyboardType="default"
        ></TextInput>

        <View
          style={{
            alignItems: "center", //Alignement horizental
            justifyContent: "center", //Alignement vertical
            flexDirection: "column",
            marginBottom: 10,
          }}
        >
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => {
              var table_profils = database.ref("profils");
              var key = table_profils.push().key;
              var un_profil = table_profils.child("profil" + key);
              un_profil.set({
                nom: nom,
                prenom: prenom,
                pseudo: pseudo,
              });
            }}
          >
            <Text style={styles.text}>Save</Text>
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
