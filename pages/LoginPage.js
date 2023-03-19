import { Alert, KeyboardAvoidingView, SafeAreaView, Modal, StyleSheet, Text, View,ActivityIndicator } from "react-native";
import React,{useEffect} from "react";
import { Button, Input, Image } from "@rneui/base";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const LoginPage = ({navigation}) => {
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
         auth.onAuthStateChanged((authUser) => {
            if(authUser){
                
                navigation.replace('Home')
            }
            else{
                console.log('no user')
            }
            
        })

        
    }, [])

    const signIn = () => {
        setLoading(true); // set loading state to true
        setModalVisible(true);
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setLoading(false); // set loading state back to false
            setModalVisible(false);
            navigation.replace('Home')
        })
        .catch((error) => {
            setLoading(false); // set loading state back to false
            setModalVisible(false);
            Alert.alert(error.message)
        });
    }

    return (
        <SafeAreaView behavior='padding' style={styles.container}>
            <StatusBar style='dark' />
            
                <View style={styles.imageContainer}>
                    <Image source={require('../assets/images/chaticon.png')}
                        style={{width:200, height:200, }}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Input placeholder="Email" type='email' autoFocus value={email}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(text) => {setEmail(text)}}
                    />
                    <Input placeholder="Password" secureTextEntry type='password' value={password}
                        onChangeText={(text) => {setPassword(text)}}
                    />
                    <Button title='Login' containerStyle={styles.button}
                        onPress={signIn}
                        type="solid"
                        color={'#2C6BED'}
                    />
                    <Button title='Register' type='outline' 
                        onPress={() => navigation.navigate('Register')}
                        containerStyle={styles.button}
                    />
                    <View style={{height:100}}/>
                </View>
            
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    imageContainer:{
        justifyContent:'center',
        alignItems:'center',
        marginBottom:20
    },
    container:{
        flex:1,
        justifyContent:'center',
        padding:10,
        backgroundColor:'white'
    },
    inputContainer: {
        margin:10,
    },
    button:{
        margin:5
    },
  
    
});

export default LoginPage;


