import { SafeAreaView, StyleSheet, Text, View,Alert } from "react-native";
import React, { useLayoutEffect } from "react";
import { ListItem, FAB } from "@rneui/base";
import { auth } from "../firebase";

const SettingPage = ({ navigation }) => {
  const logout = () => {
    //show alert to confirm logout
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => {
          auth.signOut().then(() => {
            navigation.replace("Login");
          });
        },
      },
    ]);
  };
  const naviationListItems = [
    {
      id: 1,
      title: "Profile",
      subtitle: "Change your profile",
      
    },
    {
      id: 2,
      title: "Notification",
      subtitle: "Change your notification",
    },
    {
      id: 3,
      title: "Security",
      subtitle: "Change your security",
    },
    {
      id: 4,
      title: "Help",
      subtitle: "FAQ and Help Center",
    },
    {
      id: 5,
      title: "About",
      subtitle: "About us",
    },
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Setting",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{flex:1}}>
      {naviationListItems.map((item) => (
        <ListItem style={styles.listItem} key={item.id}>
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: "800" }}>
              {item.title}
            </ListItem.Title>
            <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
              {item.subtitle}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
      <FAB
        placement="left"
        title="Logout"
        onPress={logout}
        style={{ position: "absolute", bottom: 16, right: 16 }}
      />
    </SafeAreaView>
  );
};

export default SettingPage;

const styles = StyleSheet.create({
  listItem: {
    margin: 4,
  },
});
