import { View, Text } from "react-native";
import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Groups from "./HomeScreens/Groups";
import MyAccount from "./HomeScreens/MyAccount";
import ListProfils from "./HomeScreens/ListProfils";




export default function Home() {
  const Tab = createMaterialBottomTabNavigator();
  return (
    
    <Tab.Navigator>
      <Tab.Screen
        name="listprofils"
        component={ListProfils}
        options={{
          //tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="format-list-bulleted"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="groups"
        component={Groups}
        options={{
          //tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-group"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="myaccount"
        component={MyAccount}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
