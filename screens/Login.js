import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
const backImage = require("../assets/123.png");

export default function Login({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onHandleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log("Login success"))
        .catch((err) => Alert.alert("Login error", err.message));
    } else {
      alert("All Are Empty")
    }

  };

  return (
    <View style={styles.container}>

      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>

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
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
          <Text style={{ fontWeight: 'bold', color: '#0d669e', fontSize: 18 }}> Log In</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          <Text style={{ color: '#abb3b7', fontWeight: 'bold', fontSize: 14 }}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={{ color: 'white', fontWeight: '900', fontSize: 14 }}> Sign Up</Text>
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
    backgroundColor: "red",

  },
  input: {
    backgroundColor: "#9da1a3",
    height: 58,
    marginBottom: 20,
    fontSize: 18,
    borderRadius: 10,
    padding: 12,
    color: '#0a3a49',
    borderWidth: 2,
    borderColor: 'white',
    fontWeight:"900",
  },
  backImage: {
    width: "100%",
    height: 490,
    position: "absolute",
    top: 0,
    resizeMode: 'cover',

  },
  whiteSheet: {
    width: '100%',
    height: '71%',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#437eab',
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 2,
    justifyContent: 'center',
    marginHorizontal: 30,
    // backgroundColor:'red',
    marginTop: 100,
    marginBottom: -10,
  },
  button: {
    backgroundColor: 'white',
    height: 58,
    borderRadius: 20,
    width: "40%",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    borderColor: '#abb3b7',
    borderWidth: 4,
    marginLeft:"27%"
  },
});
