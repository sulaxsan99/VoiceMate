import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, } from "react-native";
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
    auth,
} from '../../config/firebase';
import { getStorage, uploadBytes, ref } from "firebase/storage";
import { getDatabase, set, serverTimestamp, push } from "firebase/database";

// import * as firebase from 'firebase';
import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSourceAndroidType,
    AudioSet,
    AVModeIOSOption
} from 'react-native-audio-recorder-player';
const InputBox = (props) => {


    const { chatRoomID } = props;
    const [recording, setRecording] = useState('')
    // const [recordings, setRecordings] = useState([])
    const [message, setMessage] = useState('');
    const [recordSecs, setrecordSecs] = useState(0);
    const [recordTime, setrecordTime] = useState('00:00:00')


    const [isRecording, setIsRecording] = useState(false);
    const storage = getStorage();

    const audioRecorderPlayer = new AudioRecorderPlayer();
    // audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1
    // console.log(route.params)
    const AdduserChat = async () => {
        try {
            const uid = auth.currentUser.uid;
            console.log(uid)
            const db = getDatabase();
            const postListRef = ref(db, `chats/${chatRoomID}`);
            const newPostRef = push(postListRef);
            set(newPostRef, {
                message: message,
                CreatedAt: serverTimestamp(),
                sender: uid,
            });
        } catch (error) {
            console.log(error)
        }
    }




    // async function StartRecording() {
    //     try {
    //         console.log('Requesting submission');
    //         await Audio.requestPermissionsAsync();
    //         await Audio.setAudioModeAsync({
    //             allowsRecordingIOS: true,
    //             playsInSilentModeIOS: true,

    //         });
    //         console.log("start Recordings...")
    //         const recording = new Audio.Recording();
    //         await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY)
    //         await recording.startAsync()
    //         setRecording(recording);
    //         console.log('recording started')
    //     } catch (err) {
    //         console.log('recording fail', err)
    //     }
    // }

    // async function StopRecording() {
    //     console.log('stoppingrecording...');
    //     setRecording(undefined);
    //     await recording.stopAndUnloadAsync();

    //     const uri =await fetch( recording.getURI());
    //     const file = await uri.blob();
    //     const storageRef = ref(storage, '123499');
    //     const snapshot = await uploadBytes(storageRef, file)

    //     console.log('Recording stooped at ', recording.getURI())
    // }

    const audioSet = {
        AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
        AudioSourceAndroid: AudioSourceAndroidType.MIC,
        AVModeIOS: AVModeIOSOption.measurement,
        AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
        AVNumberOfChannelsKeyIOS: 2,
        AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    const meteringEnabled = false;


    onStartRecord = async () => {
        try {
           
            console.log('audioSet', audioSet);
            const filePath = 'audio.mp3';
            const uri = await audioRecorderPlayer.startRecorder(filePath,audioSet,meteringEnabled);
            audioRecorderPlayer.addRecordBackListener((e) => {
                setrecordSecs(e.currentPosition)
                const tim = audioRecorderPlayer.mmssss(Math.floor(e.currentPosition))
                setrecordTime(tim);
            });
            console.log(`uri: ${uri}`);
            setRecording(uri)
        } catch (error) {
            console.log(error);
        }
    };
    onStopRecord = async () => {
        try {
            const result = await audioRecorderPlayer.stopRecorder();
            audioRecorderPlayer.removeRecordBackListener();
            console.log(result);
            console.log(recording);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={100}
            style={{ width: '100%' }}
        >
            <View style={styles.container}>
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
                <TouchableOpacity onLongPress={recording ? onStopRecord : onStartRecord }>
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
