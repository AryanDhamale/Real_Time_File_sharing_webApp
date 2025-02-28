import { useEffect, useRef, useState, useContext } from "react";
import { validateFileSize ,generateOtp} from "../../helper/Herper";
import { MainContext } from "../Body/MainContext";
import { useFirebase } from "../../context/Context";
import "./Modal.css";

function Modal({ localStream, controler,sendPhoto}) {

    const videoRef = useRef();
    const canvasRef = useRef();
    const [video_Visible, set_video_Visible] = useState(true);
    const [canvas_Visible, set_canvas_Visible] = useState(false);
    const { setCustomeAlert } = useContext(MainContext);
    const {sendFileToFireBase}=useFirebase();

    useEffect(() => {
        if (localStream) {
            videoRef.current.srcObject = localStream;
        }
    }, [localStream]);

    const stopStreaming = () => {
        if (localStream) {
            localStream.getTracks().forEach((track) => track.stop());
        }
    }

    const capturePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        stopStreaming();
        set_video_Visible(() => false);
        set_canvas_Visible(() => true)
    }

    const upload = () => {
        const canvas = canvasRef.current;
        const imageUrl = canvas.toDataURL("image/png", 1);
        const file = dataURLtoFile(imageUrl, "Camera.png");
        closing();
        handleDeviceFile(file);
    }

    const handleDeviceFile = (file) => {
        if (file) {
            if (validateFileSize(file)) {
                console.log("max limit reach");
                setCustomeAlert({ msg: "Maximum Limit Reach : fileSize > 5MB", visible: true, result: "alert-danger" }); // should drop here //
                return;
            }
            const OTP = generateOtp(4);
            setCustomeAlert({ msg: `OTP-> ${OTP} For file access`, visible: true, result: "alert-primary" });
            // concurrent execution // 
            try {
                sendFileToFireBase(file.name, OTP); // upload on FireBase // 
                sendPhoto(file, OTP); // upload on server side //
            } catch (err) {
                console.log({ ClientError: "Sendcard", err });
            }
        }
        console.log("handlecalled");
    }

    const dataURLtoFile = (imageURL, fileName) => {
        const arr=imageURL.split(',');
        const bstr = atob(arr[1]);
        const mime = arr[0].match(/:(.*?);/)[1];
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], fileName, { type: mime });
    }

    const closing = () => {
        stopStreaming();
        controler(false);
    }

    return (
        <>
            <div className="position-fixed start-0 end-0 top-0 bottom-0" style={{ overflow: "hidden", backgroundColor: "#9d9fad8a" }}>
            </div>

            <div className="my-modal border border-1 rounded-3 px-2 py-3 bg-white position-fixed top-50 start-50" style={{ width: "33rem", transform: "translate(-50%,-50%)" }}>
                <div className="myheading d-flex justify-content-between">
                    <p style={{ fontWeight: "600" }}>Capture your image powerd by ,canvas screen</p>
                    <button type="button" className="btn btn-close pe-3" onClick={closing}></button>
                </div>
                <div className="Image-con rounded-2" style={{ height: "17rem" }}>
                    {video_Visible && <video ref={videoRef} autoPlay className="d-block mx-auto mt-1 rounded-2" style={{ width: "96%", height: "96%" }}></video>}
                    <canvas ref={canvasRef} className="d-block m-auto rounded-2" style={{ width: "96%", height: "96%", objectFit: "cover" }}></canvas>
                </div>
                <div className="my-footer py-3 d-flex justify-content-center align-items-center" style={{ gap: "0.7rem" }}>
                    {video_Visible && <button type="button" className="btn" style={{ backgroundColor: "#18181b", color: "white" }} onClick={capturePhoto}><i className="fa-solid fa-camera-retro"></i><span className="ms-2">Capture</span></button>}
                    {canvas_Visible && <button type="button" className="btn btn-danger"><i className="fa-regular fa-circle"></i><span className="ms-2">Re-Capture</span></button>}
                    {canvas_Visible && <button type="button" className="btn" style={{ backgroundColor: "#18181b", color: "white" }} onClick={upload}><i className="fa-solid fa-upload"></i><span className="ms-2">Upload</span> </button>}
                </div>
            </div>
        </>
    );
}


export default Modal;