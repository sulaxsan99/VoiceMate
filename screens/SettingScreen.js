import React, { useLayoutEffect, useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet, FlatList, TextInput, Button } from "react-native";
import { auth, db, collection, getDoc, getDocs, addDoc, doc, query, where, deleteDoc, updateDoc } from '../config/firebase';
import { AntDesign } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';

import { getDatabase, ref, set, serverTimestamp, onValue } from "firebase/database";

export const SettingScreen = () => {


    const user = auth.currentUser;
    const onSignOut = () => {
        signOut(auth).catch(error => console.log('Error logging out: ', error));
    };
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const updateUser = async () => {
        try {
            const UpdateUser = doc(db, "users", user.uid);
            await updateDoc(UpdateUser, {
                status: status,
                name: name,
            }).then((res) => {
                alert("data updated");
            });
        } catch (error) {
            console.log(error)
        }
    }
    const getUserByID = async () => {
        const db = getDatabase();
        const starCountRef = ref(db, `users/${user.uid}`);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            setEmail(data.email);
            setStatus(data.status);
            setName(data.name);
            setPassword(data.password)
            //   const newuser =Object.keys(data).map(key =>({
            //     id:key,
            //     ...data[key]
            //   }))
            // console.log(data)
            //   setUserdata(newuser)
        });




        // try {
        //     const docRef = doc(db, "users", user.uid);
        //     const docSnap = await getDoc(docRef);
        //     if (docSnap.exists()) {
        //         console.log("Document data:", docSnap.data());
        //         setEmail(docSnap.data().email);
        //         setStatus(docSnap.data().status);
        //         setName(docSnap.data().name);
        //         setPassword(docSnap.data().password)
        //     } else {
        //         // doc.data() will be undefined in this case
        //         console.log("No such document!");
        //     }

        // } catch (error) {
        //     console.log(error)
        // }
    }
    useEffect(() => {
        getUserByID();
    })
    return (


        <View style={styles.container}>
            <View style={styles.profile}>
                <Image source={{ uri: 'https://letsenhance.io/static/334225cab5be263aad8e3894809594ce/75c5a/MainAfter.jpg' }} style={styles.avatar} />
                {/* <Text style={styles.email} >{user.email}</Text>
                <Text style={styles.email} >{user.uid}</Text> 
                <Text style={styles.email} >{console.log(user)}</Text> */}
                <View style={styles.email}>
                    <Text style={styles.name}>
                        Email
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter email"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        // autoFocus={true}
                        value={email}
                        editable={false}
                    //   onChangeText={(text) => setEmail(text)}
                    />
                </View>
                <View>
                    <Text style={styles.name}>Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Your name"
                        autoCapitalize="none"
                        keyboardType="ascii-capable"
                        textContentType="nickname"
                        // autoFocus={true}
                        value={name}
                        editable={false}
                        onChangeText={(text) => setName(text)}
                    />
                </View>

                <View>
                    <Text style={styles.name}>Status</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Your status"
                        autoCapitalize="none"
                        keyboardType="ascii-capable"
                        textContentType="nickname"
                        // autoFocus={true}
                        value={status}
                        editable={true}
                        onChangeText={(text) => setStatus(text)}
                    />
                </View>
                <View>
                    <Text style={styles.name}>
                        Password
                    </Text>
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
                </View>

                <View style={styles.update}>
                    <Button
                        title="update"
                        color="#841520"
                        onPress={updateUser}
                        style={styles.update}
                    />
                </View>
                <TouchableOpacity
                    style={{
                        marginTop: 20, marginLeft: 260
                    }}
                    onPress={onSignOut}
                >
                    <Text style={styles.logout}>
                        <AntDesign name="logout" size={20} />
                        Logout
                    </Text>

                </TouchableOpacity>
            </View>







        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        padding: 20,
        flexDirection: 'column',
    },
    profile: {
        display: 'flex',
        flexDirection: 'column'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 15,
    },
    logout: {
        fontSize: 20,
        fontWeight: '900',
        fontStyle: 'normal',
    },
    email: {
        marginTop: 20,
        fontSize: 20,
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        marginLeft: 30,
        height: 40,
        width: 300,
        margin: 3,
        color: 'black',
        fontStyle: 'normal',
        fontSize: 20,
        borderBottomWidth: 1
    },
    update: {
        marginTop: 12,
    },
    name: {
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '600',
    }
});