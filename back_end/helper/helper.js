import { initializeApp } from "firebase/app";
import { getFirestore, query } from "firebase/firestore";
import { collection, getDocs, where, doc, deleteDoc } from "firebase/firestore";
import "dotenv/config";

const envData=process.env;

const firebaseConfig = {
    apiKey: envData.API_KEY,
    authDomain: envData.AUTHDOMAIN,
    databaseURL:envData.DATABASEURL,
    projectId: envData.PROJECTID,
    storageBucket: envData.STORAGEBICKET,
    messagingSenderId: envData.MESSAGINGSENDERID,
    appId: envData.APPID
  };

const FireBaseApp = initializeApp(firebaseConfig);
const FireStoreDb = getFirestore(FireBaseApp);


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
            //console.log(document.id, "=>", document.data());
            await deleteDoc(doc(FireStoreDb, "files", document.id));
        });
    } catch (err) {
        console.log(err);
    }
}

export { DeleteDocfromFireBase };