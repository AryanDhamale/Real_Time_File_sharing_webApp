import "./Footer.css";

function Footer() {
    return (
       <div className="my-Footer Navigation border border-1  fixed-bottom d-flex align-items-center justify-content-center z-1" style={{backgroundColor : "#f5f5f545",height : "4rem"}}>
        <p style={{fontWeight : "400",opacity : "0.5"}}>This webiste design and controled by <b>sandbox</b></p>
       </div>
    );
}

export default Footer;