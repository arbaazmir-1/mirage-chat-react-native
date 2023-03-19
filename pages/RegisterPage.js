import { Alert, KeyboardAvoidingView, StyleSheet, Text, View,ActivityIndicator } from 'react-native'
import React ,{useRef,useEffect}from 'react'
import { StatusBar } from 'expo-status-bar'
import { Input,Button } from '@rneui/base'
import { useState } from 'react'
import { auth ,db} from '../firebase'
import {createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import { collection, addDoc,setDoc,doc } from "firebase/firestore"; 

const RegisterPage = ({navigation}) => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const nameRef = useRef(null);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
    

  useEffect(() => {
      const unsubscribe=  auth.onAuthStateChanged((authUser) => {
            if(authUser){
                console.log(authUser)
                navigation.replace('Home')
            }
            
        }
        )

        return unsubscribe;
    }, [])

    const register =async () => {
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

            updateProfile(auth.currentUser, {
                
                displayName: name,
                photoURL: `https://ui-avatars.com/api/?name=${name}&background=random`,
                
            })
            .then( async () => {
                try{
                    const docRef = await setDoc(doc(db, "users", `${auth.currentUser.email}`),{
                        name: name,
                        username: username,
                        email: email,
                        uid: auth.currentUser.uid,
                        photoURL: `https://ui-avatars.com/api/?name=${name}&background=random`,
                        
                    }
                    );
                    
                    
                
                setLoading(false)
                navigation.replace('Home')
            }
            catch(e){
                console.error("Error adding document: ", e);
            }

                
                
            })
            .catch((error) => {
                setLoading(false)
                Alert.alert(error.message)
            });

            
           
        }
        )
        .catch((error) => {
            setLoading(false)
            Alert.alert(error.message)
        }
        );
    }


  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
    <StatusBar style='light' />
    <Text style={{margin:10,  alignSelf: 'center',fontSize:20}}>Register Page</Text>
    <View style={styles.inputContainer}>
      <Input
        placeholder='Name'
        type='text'
        value={name}
        autoFocus
        onChangeText={text => setName(text)}
        returnKeyType='next'
        onSubmitEditing={() => usernameRef.current.focus()}
      />
      <Input
        ref={usernameRef}
        placeholder='Username'
        type='text'
        value={username}
        onChangeText={text => setUsername(text)}
        returnKeyType='next'
        onSubmitEditing={() => emailRef.current.focus()}
        autoCapitalize='none'
      />
      <Input
        ref={emailRef}
        placeholder='Email'
        type='email'
        value={email}
        onChangeText={text => setEmail(text)}
        returnKeyType='next'
        onSubmitEditing={() => passwordRef.current.focus()}
        //no caps
        autoCapitalize='none'
      />
      <Input
        ref={passwordRef}
        placeholder='Password'
        type='password'
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
        returnKeyType='next'
        onSubmitEditing={() => confirmPasswordRef.current.focus()}
      />
      <Input
        ref={confirmPasswordRef}
        placeholder='Confirm Password'
        type='password'
        secureTextEntry
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
        onSubmitEditing={register}
      />
      {
            loading ? <ActivityIndicator size='large' color='#2C6BED' /> : null
      }
      <Button
        title='Register'
        type='solid'
        color='#2C6BED'
        style={styles.button}
        onPress={register}
      />
      <Button
        title='Login'
        type='outline'
        onPress={() => navigation.navigate('Login')}
        style={styles.button}
      />
    </View>
  </KeyboardAvoidingView>
  )
}

export default RegisterPage

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:10,
        backgroundColor:'white'
    },
    inputContainer:{

    },
    button:{
        margin:5
    }
})