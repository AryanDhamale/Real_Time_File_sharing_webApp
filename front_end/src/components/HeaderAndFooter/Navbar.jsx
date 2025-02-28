import "./Navbar.css";

function Navbar() {
    return (
        // border : "240 5.9% 90%"
       <div className="my-navbar d-flex border border-1 z-1 fixed-top" style={{backgroundColor : "#f5f5f545",height : "4rem"}}>
         <div className="icon-box d-flex align-items-center">
         <i className="fa-brands fa-dribbble" style={{margin:"0 1rem",fontSize:"1.5rem"}}></i>
         <p style={{margin : "auto 0",fontSize :"1rem",fontWeight : "600"}}>File_Uploader</p>
         </div>
       </div>
    );
}

export default Navbar;