import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Button } from "react-native";
import styles from './style';
import {
    MaterialCommunityIcons,
    MaterialIcons,
    FontAwesome5,
    Entypo,
    Fontisto,
} from '@expo/vector-icons';
import { Audio } from 'expo-av'
import {
    auth
} from '../../config/firebase';
import { getStorage, uploadBytes } from "firebase/storage";
import {
    getDatabase, set, serverTimestamp, push, onValue, ref
} from "firebase/database";
import { uploadAudio } from './data'
// import * as firebase from 'firebase';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Toast from 'react-native-toast-message';
import * as FileSystem from 'expo-file-system';
const InputBox = (props) => {

    const currentUser = auth.currentUser;
    const { chatRoomID } = props;
    const [recording, setRecording] = useState('')
    const [recordings, setRecordings] = useState([]);
    const [message, setMessage] = useState('');
    const [name, setname] = useState('');
    const [recordTime, setrecordTime] = useState('00:00:00')


    const [isRecording, setIsRecording] = useState(false);
    const storage = getStorage();

    const audioRecorderPlayer = new AudioRecorderPlayer();
// console.log(audioRecorderPlayer)
    const getuser = async () => {
        try {
            const db = getDatabase();

            const starCountRef = ref(db, `users/${currentUser.uid}`);
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                console.log("recivername", data.name)
                setname(data.name)
            });

        } catch (error) {
            console.log(error)
        }
    }

    const AdduserChat = async () => {
        try {
            const uid = auth.currentUser.uid;
            // console.log(uid)
            const db = getDatabase();
            const postListRef = ref(db, `chats/${chatRoomID}`);
            const newPostRef = push(postListRef);
            set(newPostRef, {
                message: message,
                CreatedAt: serverTimestamp(),
                sender: uid,
                name: name,
            });
            setMessage('');
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getuser();

    }, [])

    async function startRecording() {
        try {
            const permission = await Audio.requestPermissionsAsync();

            if (permission.status === "granted") {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true
                });

                const { recording } = await Audio.Recording.createAsync(
                    Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
                );

                setRecording(recording);
            } else {
                setMessage("Please grant permission to app to access microphone");
            }
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

     
    async function stopRecording() {
        setRecording(undefined);
        await recording.stopAndUnloadAsync();

        let updatedRecordings = [...recordings];
        const { sound, status } = await recording.createNewLoadedSoundAsync();
        updatedRecordings.push({
            sound: sound,
            duration: getDurationFormatted(status.durationMillis),
            file: recording.getURI()
        });

        setRecordings(updatedRecordings);
        uploadAudio(recording)
        console.log(recording)
        // await convertToMp3(recording.getURI());
    }
    function getRecordingLines() {
        return recordings.map((recordingLine, index) => {
            return (
                <View key={index} style={styles.row}>
                    <Text style={styles.fill}>Recording {index + 1} - {recordingLine.duration}</Text>
                    <Button style={styles.button} onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button>
                    {/* <Button style={styles.button} onPress={() => Sharing.shareAsync(recordingLine.file)} title="Share"></Button> */}
                </View>
            );
        });
    }
    function getDurationFormatted(millis) {
        const minutes = millis / 1000 / 60;
        const minutesDisplay = Math.floor(minutes);
        const seconds = Math.round((minutes - minutesDisplay) * 60);
        const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
        return `${minutesDisplay}:${secondsDisplay}`;
    }
    // const ShowToast = () => {
    //     Toast.show({
    //         type: "success",
    //         text1: 'Toast message',
    //         text2: 'This is secondary ',
    //         autoHide:true,
    //         visibilityTime:2500
    //     })
    // }


    
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={100}
            style={{ width: '100%' }}
        >
            <View style={styles.container}>
                {/* {
                    getRecordingLines()
                } */}
                
                <View style={styles.mainContainer}>
                    <FontAwesome5 name="laugh-beam" size={24} color="grey" />
                    <TextInput
                        placeholder={"Type a message"}
                        style={styles.textInput}
                        multiline
                        value={message}
                        onChangeText={setMessage}
                    />
                    <Entypo name="attachment" size={24} color="grey" style={styles.icon} />
                    {!message && <Fontisto name="camera" size={24} color="grey" style={styles.icon} />}
                </View>
                <TouchableOpacity onLongPress={recording ? stopRecording : startRecording} >
                    <View style={styles.buttonContainer}>
                        {!message
                            ? <MaterialCommunityIcons name="microphone" size={28} color="black" />
                            : <MaterialIcons name="send" size={28} color="black" onPress={AdduserChat} />}
                    </View>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}


export default InputBox;
