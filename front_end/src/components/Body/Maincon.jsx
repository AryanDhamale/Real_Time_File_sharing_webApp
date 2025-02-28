import {useState} from "react";
import { MainContext } from "./MainContext";
import Carousel from "./Carousel";
import Alert from "../Alert/Alter";
import "./Maincon.css";
function Maincon()
{
    const [customeAlert,set_customeAlert]=useState({msg:"",visible:false,result:""});
    const sound=new Audio('notification.mp3');
    const setCustomeAlert=(obj)=>{
        set_customeAlert(obj);
        if(obj.visible && sound) {
            sound.play();
        }
    }
    return (
        <MainContext.Provider value={{setCustomeAlert}}>
        <div className="MainCon container-fluid" style={{width:"100%",height:"80vh"}}>
            <Alert msg={customeAlert.msg} visible={customeAlert.visible} result={customeAlert.result}/>
            <div className="row justify-content-evenly align-items-center py-3" style={{height:"100%"}}>
                <Carousel/>
            </div>
        </div>
        </MainContext.Provider>
    );
}

export default Maincon;
