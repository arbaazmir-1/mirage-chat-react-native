import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { Input, Button,ListItem,Avatar } from "@rneui/base";
import CustomListItem from "../components/CustomListItem";
import { db } from "../firebase";
import { collection, getDoc, doc ,addDoc, getDocs} from "firebase/firestore";
import { auth } from "../firebase";

const NewChat = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "New Chat",
      headerBackTitle: "Chats",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
    });
  }, [navigation]);

  const [search, setSearch] = useState("");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [chatIds, setChatIds] = useState([]);

  const searchDB = async () => {
    try {
        setError("");
        setUser({});
      setLoading(true);
      const docRef = doc(db, "users", search);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setLoading(false);
        //check if it is the same user
        if (docSnap.data().email === auth.currentUser.email) {
            Alert.alert("Error", "You cannot chat with yourself!");
            return;
        }
        setUser(docSnap.data());
      } else {
        setLoading(false);
        // doc.data() will be undefined in this case
        console.log("No such document!");
        setError("No such user found!");
      }
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  const createChat = async () => {

    setChatIds([]);
   try{ 
    setLoading(true);
    
    //check if the chat already exists
    const searchReFU = await getDocs(collection(db, "users", auth.currentUser.email, "chats"));

    if(searchReFU.empty) {
        const docRef = await addDoc(collection(db, "chats"), {
            users: [auth.currentUser.email, user.email],
            messages: [],
    
          });
          await addDoc(collection(db, "users", auth.currentUser.email, "chats"), {
            chatId: docRef.id,
            chatWith: user.email,
        });
        await addDoc(collection(db, "users", user.email, "chats"), {
            chatId: docRef.id,
        });
        await addDoc(collection(db, "users", user.email, "chats"), {
            chatId: docRef.id,
        });
        setLoading(false);
        return;
        
        
    }
    
    

    
    searchReFU.forEach(async(doc) => {
        
        //check if the chat already exists
        if(doc.data().chatWith === user.email) {
            Alert.alert("Error", "Chat already exists");
            setLoading(false);
            return;
        }
        else{
            const docRef = await addDoc(collection(db, "chats"), {
                users: [auth.currentUser.email, user.email],
                messages: [],
        
              });
              await addDoc(collection(db, "users", auth.currentUser.email, "chats"), {
                chatId: docRef.id,
                chatWith: user.email,
            });
            await addDoc(collection(db, "users", user.email, "chats"), {
                chatId: docRef.id,
            });
            await addDoc(collection(db, "users", user.email, "chats"), {
                chatId: docRef.id,
            });
            setLoading(false);
            return;
        }
        
    });
    

    
    
    



    
    } catch(e) {
        setLoading(false);
        Alert.alert("Error", e.message);

   }




}


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Input
        placeholder="Enter a email address"
        type="email-address"
        leftIcon={{ type: "material", name: "email" }}
        autoCapitalize="none"
        //submit right icon
        onChangeText={(text) => setSearch(text)}
        value={search}
      />
      {loading && (
        <ActivityIndicator size="large" color="#2C6BED" />
      ) 
        
      }

      <Button
        style={{ marginBottom: 10, marginLeft: 10, marginRight: 10 }}
        title="Start Chat"
        onPress={searchDB}
      />
        {error && ( 
            <Text style={{ color: "red", textAlign: "center" }}>
                {error}
            </Text>
        )}
        
       {user?.email && (
        <TouchableOpacity
            onPress={createChat}
            >
        <ListItem>
                <Avatar rounded source={{ uri: user?.photoURL }} />


            <ListItem.Content>
                <ListItem.Title>{user?.email}</ListItem.Title>
            </ListItem.Content>

            <ListItem.Subtitle>Create Chat</ListItem.Subtitle>

            

        </ListItem>
        </TouchableOpacity>
        )
    }

        
      
    </SafeAreaView>
  );
};

export default NewChat;

const styles = StyleSheet.create({});
