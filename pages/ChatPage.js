import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList, Keyboard } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Avatar, Icon } from '@rneui/base'
import { db } from '../firebase'
import { doc, onSnapshot,updateDoc } from "firebase/firestore";
import { auth } from '../firebase'

const ChatPage = ({ navigation, route }) => {

  const [chats, setChats] = useState([
  
  ]);
  const [message, setMessage] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      // header options
    });
  
    const chatRef = doc(db, "chats", route.params.id);
    const unsubscribe = onSnapshot(chatRef, (doc) => {
      const data = doc.data();
      setChats(data ? data.messages : []);
    });
  
    return unsubscribe;
  }, [navigation, route]);
  
  const sendChat = async () => {
    Keyboard.dismiss();
  
    if (message) {
      const newChat = {
        id: chats.length + 1,
        message: message,
        fromUser: auth.currentUser.uid,
      };
  
      const chatRef = doc(db, "chats", route.params.id);
      await updateDoc(chatRef, {
        messages: [...chats, newChat],
      });
  
      setMessage("");
    }
  };
  

  const renderItem = ({ item }) => {
    return (
      <View style={item.fromUser === auth.currentUser.uid ? styles.chatRight : styles.chatLeft}>
        <Text style={styles.chatMessage}>{item.message}</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} 
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={90}
  >
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.chatList}
        />
      </SafeAreaView>
      <View style={styles.footer}>
        <TextInput
          placeholder="Type a message"
          value={message}
            onChangeText={setMessage}
          style={{ flex: 1, bottom: 0, height: 40, marginRight: 15, borderColor: "transparent", backgroundColor: "#ECECEC", padding: 10, color: "grey", borderRadius: 30 }}
        />
        <TouchableOpacity
        onPress={sendChat}
        >
          <Icon name="send" size={24} color="#2B68E6" />
        </TouchableOpacity>
        </View>
    </View>
    </KeyboardAvoidingView>

  )
}

export default ChatPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  chatList: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  chatLeft: {
    alignSelf: "flex-start",
    backgroundColor: "#ECECEC",
    borderRadius:   5,
    marginBottom: 20,
    maxWidth: "80%",
    padding: 15,
    },
    chatRight: {
    alignSelf: "flex-end",
    backgroundColor: "#2B68E6",
    borderRadius:   5,
    marginBottom: 20,
    maxWidth: "80%",
    padding: 15,
    },
    chatMessage: {
    color: "black",
    fontWeight: "500",
    },
})

