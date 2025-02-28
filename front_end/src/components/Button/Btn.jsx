import { useState } from "react";

function Btn()
{
  let [btn,setBtn]=useState(true);
  const common={width:"46.666667%",
    borderRadius:"50px",
    height:"85%",
    backgroundColor:btn ? "#18181b" : "#f4f4f5", 
    color: btn ? "white" : "black"
  };
  // true //
  const styleOne={
    ...common , 
    backgroundColor:btn ? "#18181b" : "#f4f4f5", 
    color: btn ? "white" : "black"
  }
  // false //
  const styleTwo={
    ...common, 
    backgroundColor:btn ? "#f4f4f5" : "#18181b" , 
    color: btn ? "black" : "white"
  }
  const handleOnclick=()=>{
    setBtn((oldVal)=>!oldVal);
  }
  return(
      <div className="border border-1 container mt-4" style={{width:"18rem",height:"3rem",borderRadius:"50px"}}>
        <div className="row justify-content-evenly align-items-center" style={{height:"100%"}}>
        <button className="btn" style={styleOne} onClick={handleOnclick} data-bs-target="#carouselExample" data-bs-slide="prev">SendFile</button>
        <button className="btn" style={styleTwo} onClick={handleOnclick} data-bs-target="#carouselExample" data-bs-slide="next">RecevieFile</button>
        </div>
      </div>
  );
}

export default Btn;