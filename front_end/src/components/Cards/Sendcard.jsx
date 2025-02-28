import { useCallback, useContext, useRef, useState } from "react";
import { useFirebase } from "../../context/Context";
import { generateOtp, validateFileSize } from "../../helper/Herper";
import { MainContext } from "../Body/MainContext";
import Modal from "./Modal";
import Loaders from "../Loader/Loader";
import "./Sendcard.css"

function Sendcard() {
    const file = useRef();
    const {setCustomeAlert}=useContext(MainContext);
    const { sendUrl, sendFileToFireBase } = useFirebase();
    const [Stream,setStream]=useState(null);
    const [visibleModal,setvisibleModel]=useState(false);
    const [visibleLoader,setVisibleLoader]=useState(false);

    const sendFile = async (want_sendFile, OTP) => {
        console.log("called me sending function!");
        const formData = new FormData();
        formData.append("Hero", want_sendFile, OTP + '-' + want_sendFile.name);
        try {
            let responce = await fetch(sendUrl, {
                method: "POST",
                body: formData
            });
            let data = await responce.json();
        } catch (err) {
            console.log({ClientError:"Sendcard",err});
        }
    }

    const handleDeviceFile = useCallback(async () => {
        if (file.current.files.length) {
            const want_sendFile = file.current.files[0];
            if (validateFileSize(want_sendFile)) {
                console.log("max limit reach");
                setCustomeAlert({msg:"Maximum Limit Reach : fileSize > 5MB",visible:true,result:"alert-danger"}); // should drop here //
                return;
            }
            const OTP = generateOtp(4);
            // concurrent execution // 
            try {
                setVisibleLoader(()=>true);
                await sendFileToFireBase(want_sendFile.name, OTP); // upload on FireBase // 
                await sendFile(want_sendFile, OTP); // upload on server side //
                setCustomeAlert({msg:`OTP-> ${OTP} For file access`,visible:true,result:"alert-primary"}); // after successfully execution // 
                setVisibleLoader(()=>false);
            } catch (err) {
                console.log({ClientError:"Sendcard",err});
            }
        }
        console.log("handlecalled");
    }, [file]);


    const getUserStream=async()=>{
        try {
          const localStram=await navigator.mediaDevices.getUserMedia({video:true});
          setStream(()=>localStram);
          setvisibleModel(()=>true);
        }catch(err){
          setCustomeAlert({msg : "please allow notification",visible:true,result:"alert-warning"});
          console.log({ClientError:"Sendcard",err});
        }
    }
    return (
        <div className="card" style={{ width: "18rem", height: "23rem", margin: "auto", backgroundColor: "#f8f8fa00" }}>
            <label htmlFor="Input-file">
                <div className="border border-1 rounded d-flex flex-column justify-content-evenly align-items-center" style={{ width: "92%", height: "10rem", margin: "0.5rem auto", borderStyle: "dotted !important" }} id="uploading" >
                    <div><i className="fa-solid fa-upload rounded-circle p-3" style={{ backgroundColor: "whitesmoke" }}></i></div>
                    <p style={{ fontSize: "0.7rem", fontWeight: "600" }}>Drop file here</p>
                </div>
            </label>
            <div className="card-body">
                <p className="links card-text rounded" style={{ fontSize: "0.8rem", fontWeight: "400", padding: "0.2rem 0.4rem" }}>
                    <label htmlFor="Input-file"> <i className="fa-solid fa-folder"></i><span style={{ paddingLeft: "0.5rem" }}>From Device</span></label></p>
                <p className="links card-text rounded" style={{ fontSize: "0.8rem", fontWeight: "400", padding: "0.2rem 0.4rem" }}><i className="fa-solid fa-link"></i><span style={{ paddingLeft: "0.5rem" }}>From Link</span></p>
                <p className="links card-text rounded" style={{ fontSize: "0.8rem", fontWeight: "400", padding: "0.2rem 0.4rem" }} onClick={getUserStream}><i className="fa-solid fa-camera"></i><span style={{ paddingLeft: "0.5rem" }}>Camera</span></p>
                <p className="links card-text rounded" style={{ fontSize: "0.8rem", fontWeight: "400", padding: "0.2rem 0.4rem" }}><i className="fa-brands fa-google-drive"></i><span style={{ paddingLeft: "0.5rem" }}>Google Drive</span></p>
            </div>
            <input id="Input-file" ref={file} type="file" name="Hero" style={{ display: "none" }} onChange={handleDeviceFile} />
           {visibleModal && <Modal localStream={Stream} controler={setvisibleModel} sendPhoto={sendFile}/>}
           {visibleLoader && <Loaders/>}
        </div>
    );
}

export default Sendcard;