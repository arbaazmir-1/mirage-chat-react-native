import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ListItem, Avatar } from "@rneui/base";

const CustomListItem = ({id,chatName,photoURL,enterChat}) => {
  return (
    <ListItem style={styles.listItems} key={id}
       onPress={()=> enterChat(id)}
    >
      <Avatar
        rounded
        source={{
          uri: photoURL ? photoURL : 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>

            {chatName ? chatName : 'No Name'}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          Press to chat
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({
    listItems: {
        margin: 4 ,
        
    }
});
