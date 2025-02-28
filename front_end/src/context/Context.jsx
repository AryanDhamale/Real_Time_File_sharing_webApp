import { createContext, useCallback, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, query } from "firebase/firestore";
import { collection, addDoc, getDocs, where, doc, deleteDoc } from "firebase/firestore";

const envData=import.meta.env;

const firebaseConfig = {
  apiKey: envData.VITE_API_KEY,
  authDomain: envData.VITE_AUTHDOMAIN,
  databaseURL:envData.VITE_DATABASEURL,
  projectId: envData.VITE_PROJECTID,
  storageBucket: envData.VITE_STORAGEBICKET,
  messagingSenderId: envData.VITE_MESSAGINGSENDERID,
  appId: envData.VITE_APPID
};

const FireBaseApp = initializeApp(firebaseConfig);
const FireBaseContext = createContext(null);
const FireStoreDb = getFirestore(FireBaseApp);

export const useFirebase = () => useContext(FireBaseContext);


export function FireBaseProvider(props) {
  const sendUrl =  envData.DEV ?  "http://localhost:8080/sendFile" :  envData.VITE_SEND_FILE_URL ;
  const server_url=envData.DEV ? "http://localhost:8080/getFile" : envData.VITE_SERVER_URL;

  const sendFileToFireBase = async (fileName, otp) => {
    if (!fileName && !otp) {
      throw "all attribute has required!";
    }
    try {
      const docRef = await addDoc(collection(FireStoreDb, "files"), {
        fileName,
        otp,
      })
    } catch (err) {
      console.log({ fireBaseError: err });
    }
  }

  const ReadDocfromFireBase = async (otp) => {
    if (!otp) throw "otp has required!";
    try {
      const q = query(collection(FireStoreDb, "files"), where("otp", "==", otp));
      const docSnapshot = await getDocs(q);
      let res;
      docSnapshot.forEach((doc) => {
        res = doc.data();
      });

      return new Promise((resolve, rejcted) => {
        if (!res) rejcted("NOT FOUND");
        resolve(res);
      })


    } catch (err) {
      console.log(err);
    }
  }

  const DeleteDocfromFireBase = async (otp) => {
    if (!otp) throw "otp has required!";
    try {
      const q = query(collection(FireStoreDb, "files"), where("otp", "==", otp));
      const docSnapshot = await getDocs(q);
      if (docSnapshot.empty) {
        console.log("Not found");
        return;
      }
      docSnapshot.forEach(async (document) => {
        await deleteDoc(doc(FireStoreDb,"files",document.id));
      });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <FireBaseContext.Provider value={{ server_url, sendUrl, ReadDocfromFireBase, sendFileToFireBase, DeleteDocfromFireBase }}>
      {props.children}
    </FireBaseContext.Provider>
  );
}