import { MainContext } from "../Body/MainContext";
import { useContext } from "react";
import "./Alert.css";

function Alert({ msg, visible, result }) {
    const style=`alert ${result} d-flex align-items-center`;
    const {setCustomeAlert}=useContext(MainContext);
    const change=()=>{
       setCustomeAlert((oldVal)=>{
        return {...oldVal,visible:false};
       });
    }
    return (
        <>
            {visible && <div className={style} id="my-alert" role="alert" style={{ width: "62%", margin: "0.5rem auto" }}>
                {result==="alert-danger"? <i className="fa-solid fa-bug"></i> : <i className="fa-solid fa-lemon"></i>}
                <div style={{ marginLeft: "0.6rem" }}>
                    {msg}
                </div>
                <button type="button" className="btn-close" onClick={change} style={{ position: "absolute", right: "1.1rem" }}></button>
            </div>}
        </>
    );
}

export default Alert;
