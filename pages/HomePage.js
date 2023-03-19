import { useLayoutEffect } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import React,{useEffect,useState} from "react";
import { Button, FAB, Avatar, Icon } from "@rneui/base";
import { auth } from "../firebase";
import CustomListItem from "../components/CustomListItem";
import { collection, getDocs ,getDoc,doc} from "firebase/firestore";
import { db } from "../firebase";


const HomePage = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const [chatIds, setChatIds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackVisible: false,
      title: "Mirage Chat",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
    
      headerRight: () => (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: 80,
                
            }}
        >
            <TouchableOpacity activeOpacity={0.5}
                onPress={() => navigation.navigate("NewChat")}
            >
                <Icon
                    //pencil
                    name="edit"
                    type="material"
                    color="black"
                    size={24}
                    onPress={() => navigation.navigate("NewChat")}
                />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5}>
                <Icon
                    name="settings"
                    type="material"
                    color="black"
                    size={24}
                    onPress={() => navigation.navigate("Setting")}
                />
            </TouchableOpacity>
        </View>

      ),
    });
  }, [navigation]);
  const fetchAllChats = async () => {
    setChats([]);
    setChatIds([]);
    
    try {
        setLoading(true);
      const chatsRefId = await getDocs(collection(db, "users", auth.currentUser.email, "chats"));

      //check if the user has any chats
        if (chatsRefId.empty) {
            setLoading(false);
            setError("You have no chats yet!");
            return;
        }



      chatsRefId.forEach(async (doc) => {
        
        setChatIds((prev) => [...prev, doc.data().chatId]);

        
      });
      chatIds.forEach(async (chatId) => {
        
        const docRef = doc(db, "chats", chatId);
      const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
            
            // seperate the other user email from the "users" array
            const otherUserEmail = docSnap.data().users.filter(
                (user) => user !== auth.currentUser.email
            )[0];
            // get the other user's data
            const otherUserRef = doc(db, "users", otherUserEmail);
            const otherUserSnap = await getDoc(otherUserRef);
            
            const chat = { ...docSnap.data(), chatId: docSnap.id, otherUser: otherUserSnap.data() };
            
            // add the chat to the chats array
            setChats((prev) => [...prev, chat]);
            
            
            


            
        } else {
          console.log("No such document!");
          setLoading(false);
        }
        });

        setLoading(false);
        
    } catch (error) {
      console.log("Error getting documents: ", error);
      setLoading(false);
      Alert.alert("Error", error.message);
      
    }
  };
  
  useEffect(() => {
    fetchAllChats();
  }, []);
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="auto" />
        {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color="#2C6BED" />
        </View>
        ) : (
        <View style={{ flex: 1 }}>

        {error && (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 18, color: "gray" }}>{error}</Text>
            </View>

        )}

      <ScrollView>
        {chats?.map((chat) => (
            <CustomListItem
            key={chat.chatId}
            id={chat.chatId}
            chatName={chat.otherUser.name}
            photoURL={chat.otherUser.photoURL}

            
           
            />
        ))}
      </ScrollView>
        </View>
        )}
     
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({});
