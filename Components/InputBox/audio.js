// //////

//     // const OnStartRecord = async () => {
//     //     const path = 'hello1.m4a';
//     //     const audioSet = {
//     //         AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
//     //         AudioSourceAndroid: AudioSourceAndroidType.MIC,
//     //         AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
//     //         AVNumberOfChannelsKeyIOS: 2,
//     //         AVFormatIDKeyIOS: AVEncodingOption.aac,
//     //     };
//     //     console.log('audioSet', audioSet);
//     //     const uri = await audioRecorderPlayer.startRecorder(path, audioSet);
//     //     audioRecorderPlayer.addRecordBackListener((e) => {
         
//     //         setrecordSecs( e.currentPosition),
//     //         setrecordTime(audioRecorderPlayer.mmssss(
//     //                 Math.floor(e.currentPosition),
//     //             ),
//     //         )
//     //     });
//     //     setRecording(uri)
//     //     console.log(`uri: ${uri}`);
//     // };
//     // const onStopRecord = async () => {
//     //     const result = await audioRecorderPlayer.stopRecorder();
//     //     audioRecorderPlayer.removeRecordBackListener();
//     //     setrecordSecs(0);
//     //     console.log(result);
//     // };

// /////
// async function StartRecordnig() {
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
//     const storageRef = ref(storage, '1234');
//     const snapshot = await uploadBytes(storageRef, file)

//     console.log('Recording stooped at ', uri)
// }
// //



// const StartRecordnig = async () => {
//     const audioRecorderPlayer = new AudioRecorderPlayer();
//     await audioRecorderPlayer.stopPlayer();
//     await audioRecorderPlayer.startRecorder({
//       source: AudioSourceAndroidType.MIC,
//       encoder: AudioEncoderAndroidType.AMR_NB,
//       outputFormat: 'amr',
//     });
//     setRecorder(audioRecorderPlayer);
//     setRecording(true);

//   };

//   const StopRecording = async () => {
//     await recorder.stopRecorder();
//     setRecording(false);
//     uploadAudio();
//   };

//   const uploadAudio=async ()=>{
//     try {
//         const storageRef = ref(storage, 'Audio 1');
//         const response = await fetch(recorder.getURI());
//         const blob = await response.blob();
//        const snapshot = await uploadAudio(storageRef, blob);
//        console.log(snapshot);
//     } catch (error) {
//         console.log(error)
//     }

//         // await audioRef.put(blob);
//   }




//   /////////////////////////////////////////////////
//   async function StartRecordnig() {
//     try {
//         const permission = await Audio.requestPermissionsAsync();

//         if (permission.status === "granted") {
//             await Audio.setAudioModeAsync({
//                 allowsRecordingIOS: true,
//                 playsInSilentModeIOS: true
//             });

//             const { recording } = await Audio.Recording.createAsync(
//                 Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
//             );

//             setRecording(recording);
//         } else {
//             setMessage("Please grant permission to app to access microphone");
//         }
//     } catch (err) {
//         console.error('Failed to start recording', err);
//     }
// }
// async function StopRecording() {
//     setRecording(undefined);
//     await recording.stopAndUnloadAsync();

//     let updatedRecordings = [...recordings];
//     const { sound, status } = await recording.createNewLoadedSoundAsync();
//     updatedRecordings.push({
//         sound: sound,
//         duration: getDurationFormatted(status.durationMillis),
//         file: recording.getURI()
//     });

//     setRecordings(updatedRecordings);
//     uploadAudio();
//     console.log(recordings)
// }

// function getDurationFormatted(millis) {
//     const minutes = millis / 1000 / 60;
//     const minutesDisplay = Math.floor(minutes);
//     const seconds = Math.round((minutes - minutesDisplay) * 60);
//     const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
//     return `${minutesDisplay}:${secondsDisplay}`;
// }


// const uploadAudio = async () => {
//     try {
//         const storageRef = ref(storage, 'Audio112.m4a');
//         const response = await fetch(recordings.getURI());
//         const blob = await response.blob();
//         const snapshot = await uploadAudio(storageRef, blob);
//         console.log("uploaded");
//     } catch (error) {
//         console.log("sdfsdf", error)
//     }

//     // await audioRef.put(blob);
// }



//   /////////////////////////////////////////////////


//   const audioSet  = {
//     AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
//     AudioSourceAndroid: AudioSourceAndroidType.MIC,
//     AVModeIOS: AVModeIOSOption.measurement,
//     AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
//     AVNumberOfChannelsKeyIOS: 2,
//     AVFormatIDKeyIOS: AVEncodingOption.aac,
// };

// onStartRecord = async () => {
       
//     const meteringEnabled = false;
//     const path = Platform.select({
//         ios: "hello1.m4a",
//         android: "sdcard/Music/hello1.mp4"
//     });
//     // console.log('audioSet', audioSet);
//     console.log(path)
//     console.log(audioSet)
//     try {
//         const uri = await audioRecorderPlayer.startRecorder(path, audioSet,meteringEnabled)
//         audioRecorderPlayer.addRecordBackListener((e) => {
//             setrecordSecs(e.currentPosition)
//             const tim = audioRecorderPlayer.mmssss(Math.floor(e.currentPosition))
//             setrecordTime(tim);
//         });
//         setRecording(uri)
//         console.log(`uri: ${uri}`);
//     } catch (error) {
//         console.log(error)
//     }
   
// };
// onStopRecord = async () => {
//     const result = await audioRecorderPlayer.stopRecorder();
//     audioRecorderPlayer.removeRecordBackListener();
//     console.log(result);
//     console.log(recording)
// };


