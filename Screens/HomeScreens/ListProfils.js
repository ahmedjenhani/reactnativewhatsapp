import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  Image,
  TouchableHighlight,
} from "react-native";
import React, { useEffect, useState } from "react";

import bgImg from "../../assets/img1.png";
import profilImage from "../../assets/user.png";

import firebase from "../../Config";
import { Button, Dialog } from "react-native-paper";

const database = firebase.database();

export default function ListProfils(props) {
  const [data, setdata] = useState();
  const [isDialogVisible, setisDialogVisible] = useState(false);

  useEffect(() => {
    var table_profils = database.ref("profils");
    table_profils.on("value", (snapshot) => {
      let d = [];
      snapshot.forEach((un_profil) => {
        d.push(un_profil.val());
      });
      setdata(d);
    });

    return () => {
      table_profils.off();
    };
  }, []);

  return (
    <ImageBackground source={bgImg} style={styles.container}>
      <View
        style={{
          alignItems: "center", //Alignement horizental
          justifyContent: "center", //Alignement vertical
          flexDirection: "column",
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "white", marginTop: 50, fontSize: 40 }}>
          List Profil
        </Text>
        <FlatList
          data={data}
          style={{ width: "85%" }}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  backgroundColor: "#0003",
                  borderRadius: 9,
                  flexDirection: "row",
                  marginBottom: 5,
                  width: "100%",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <TouchableHighlight
                  onPress={() => {
                    setisDialogVisible(true);
                  }}
                >
                  <Image
                    resizeMode="contain"
                    style={{ width: 45, height: 60, marginLeft: 5 }}
                    source={profilImage}
                    onPress={() => {
                      setisDialogVisible(true);
                    }}
                  ></Image>
                </TouchableHighlight>

                <Text style={styles.TextStyle}>{item.nom}</Text>
                <Text style={styles.TextStyle}>{item.prenom}</Text>
                <Text
                  style={styles.TextStyle}
                  onPress={() => {
                    props.navigation.navigate("Chat");
                  }}
                >
                  {item.pseudo}
                </Text>
              </View>
            );
          }}
        ></FlatList>

        <Dialog
          visible={isDialogVisible}
          onDismiss={() => {
            setisDialogVisible(false);
          }}
        >
          <Dialog.Title>Details</Dialog.Title>
          <Dialog.Content>
            <Text>This is simple dialog</Text>
            <Image
              source={profilImage}
              style={{ width: 60, height: 60, resizeMode: "contain" }}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setisDialogVisible(false);
              }}
            >
              Done
            </Button>
          </Dialog.Actions>
        </Dialog>
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
  TextStyle: {
    color: "white",
  },
});
