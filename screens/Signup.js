import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert, state } from "react-native";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
  auth, db,
} from '../config/firebase';

import { getDatabase ,ref,set,serverTimestamp} from "firebase/database";

// import firebase from 'react-native-firebase'
const backImage = require("../assets/123.png");

export default function Signup({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  // validatePhoneNumber = () => {
  //   var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
  //   return regexp.test(this.state.phone)
  //   }

  //  const userRef= db.collection('users');
  const onHandleSignup = () => {
    if (email !== '' && password !== '' && confirmPassword !== '') {
      if (password.match(confirmPassword)) {
        createUserWithEmailAndPassword(auth, email, password)
          .then(() => {
            CreateUser();
            // navigation.navigate('Login',{screen:'Login'});
          })
          // .finally(() => )
          .catch((err) => alert(err.message));
      } else {
        alert("Enter Correct Confirm Password");
      }
    } else {
      alert("All Are Empty")
    }
  };
  const CreateUser = async () => {
    const uid = auth.currentUser.uid;
    console.log(uid)
    set(ref(db, 'users/' + uid), {
         email: email,
        password: password,
        name: name,
        time: serverTimestamp()
    }).then(()=>{
      alert("Account created successfully")
    }).catch((error)=>{
      alert(error);
    });


  }


  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Welcome to VoiceMate</Text>
        {/* <Text style={styles.title}>Sign Up</Text> */}
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          autoCapitalize="none"
          keyboardType="ascii-capable"
          textContentType="givenName"
          // autoFocus={true}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        {/* <TextInput
          style={styles.input}
          placeholder="Enter status"
          autoCapitalize="none"
          keyboardType="ascii-capable"
          textContentType="givenName"
          // autoFocus={true}
          value={status}
          onChangeText={(text) => setStatus(text)}
        /> */}
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter confirm password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={confirmPassword}
          onChangeText={(text) => setconfirmPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
          <Text style={{ fontWeight: 'bold', color: '#0d669e', fontSize: 18 }}> Sign Up</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          <Text style={{ color: '#abb3b7', fontWeight: '900', fontSize: 14 }}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: 'white', fontWeight: '800', fontSize: 14 }}> Log In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {/* <StatusBar barStyle="light-content" /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "red",

  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "white",
    alignSelf: "center",
    marginBottom: 15
  },

  input: {
    backgroundColor: "#9da1a3",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
    color: '#0a3a49',
    borderWidth: 2,
    borderColor: 'white',
  },
  backImage: {
    width: "100%",
    height: 470,
    position: "absolute",
    top: 0,
    resizeMode: 'cover',
  },
  whiteSheet: {
    width: '100%',
    height: '75%',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#437eab',
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
    marginTop: 115,
    // backgroundColor: 'grey'
  },
  button: {
    backgroundColor: 'white',
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 4,
    borderColor: '#abb3b7',
    marginLeft:"27%",
    width: "40%",
  },
});