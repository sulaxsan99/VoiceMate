import { getStorage, uploadBytes,ref ,listAll,getDownloadURL} from "firebase/storage";
const storage = getStorage();

const uploadAudio = async (recording) => {
    try {
        const filename="Audio";
        const random = Math.random()*1000;
        const uriParts = recording.getURI().split(".");
        const fileType = uriParts[uriParts.length - 1];
        const audiofile =(uriParts[uriParts.length - 2]).split("/")
        const audiofilename= audiofile[audiofile.length-1]
        console.log(audiofilename)
        const storageRef = ref(storage, `${filename}/${audiofilename}.${fileType}`);
        const response = await fetch(recording.getURI());
        const blob = await response.blob();
        // console.log(response)
        const snapshot = await uploadBytes(storageRef, blob);
        console.log("uploaded");
    } catch (error) {
        console.log("sdfsdf", error)
    }
    // await audioRef.put(blob);
}

const getAllaudio =()=>{
    const storage = getStorage();
    const listRef = ref(storage, 'Audio/2.3gb');
    listAll(listRef)
    .then((res) => {
      res.prefixes.forEach((folderRef) => {
        // All the prefixes under listRef.
        // You may call listAll() recursively on them.
      });
      res.items.forEach((itemRef) => {
      itemRef.getDownloadURL().then((url)=>{
        console.log("download url "+ url)
      })
    // console.log(itemRef)
    // return itemRef;
      });
    }).catch((error) => {
    console.log(error)
    });
  }
  export {
    uploadAudio,
    getAllaudio
  }