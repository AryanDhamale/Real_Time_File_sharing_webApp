import OtpInput from "./OtpInput.jsx"
import { useFirebase } from "../../context/Context.jsx";
import ReceivingSke from "./ReceivingSke.jsx";
import { useCallback, useState,useContext} from "react";
import { MainContext } from "../Body/MainContext.jsx";

function Receiving() {
  const { ReadDocfromFireBase,DeleteDocfromFireBase,server_url} = useFirebase();
  const [visibleBtn,setVisibleBtn]=useState(false);
  const [skel, setSkel] = useState(false);
  const [fileinfo, setFileinfo] = useState({ name: "Enter 4-digit unique pin", otp: "" });
  const commonBtnStyle={ backgroundColor: "#18181b", fontSize: "0.6rem", fontWeight: "600", color: "white", width: "5rem", margin: "2rem auto" };
  const {setCustomeAlert}=useContext(MainContext);

  const handleOtpComplete = useCallback(async (otp) => {
    try {
      setSkel(true);
      const result = await ReadDocfromFireBase(otp); // will -> resovle or rejected // 
      setSkel(false);
      setFileinfo({ name: result.fileName, otp: result.otp });
      setVisibleBtn(true);
      //console.log(result);
    } catch (err) {
      setSkel(false);
      setCustomeAlert({msg:"Invalid OTP",visible:true,result:"alert-danger"});
      console.log({ClienSide:"Receiving",err});
    }
  }, []);

  const handleDownload = useCallback(async () => {
    // should clean OTP here // 
    setCustomeAlert((oldVal)=>{
      return {...oldVal,visible:false};
    });
    setVisibleBtn(false);
    if(!fileinfo.otp) {
      console.log("noty boy!");
      return;
    }
    try {
      const responce = await fetch(server_url, {
        method: "POST",
        body: JSON.stringify({ fileName: fileinfo.otp+'-'+ fileinfo.name }),
        headers: {
          "Content-type": "application/json"
      }
      })
      const blob=await responce.blob(); // parsing res.download() // 
      const link=document.createElement("a");
      link.href=URL.createObjectURL(blob);
      link.download=fileinfo.name ; 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // deleting docs // 
      DeleteDocfromFireBase(fileinfo.otp);
      setFileinfo({name:"Enter 4-digit unique pin",otp:""});
    } catch (err) {
      console.log(err);
    }
    console.log("called hadleDownload");
  }, [fileinfo,visibleBtn]);

  return (
    <div className="card" style={{ width: "18rem", height: "23rem", margin: "auto", backgroundColor: "#f8f8fa00" }}>
      {skel ? <ReceivingSke /> :
        <div className="border border-1 rounded d-flex flex-column justify-content-evenly align-items-center" style={{ width: "92%", height: "10rem", margin: "0.5rem auto", borderStyle: "dotted !important" }}>
          <div><i className="fa-solid fa-file rounded-circle d-flex justify-content-center align-items-center" style={{ backgroundColor: "whitesmoke", width: "3rem", height: "3rem" }}></i></div>
          <p style={{ fontSize: "0.7rem", fontWeight: "600",padding:"0 0.4rem"}}>{fileinfo.name}</p>
        </div>
      }
      <div className="pt-3">
        <OtpInput length={4} onComplete={handleOtpComplete} />
      </div>
      {visibleBtn ? <button className="btn" onClick={handleDownload} style={commonBtnStyle}>Download</button> : <button className="btn" disabled style={commonBtnStyle}>Download</button>}
    </div>
  );
}

export default Receiving;