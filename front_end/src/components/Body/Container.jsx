import Maincon from "./Maincon";
import "./Container.css";

function Container() {
    return (
        <div id="mainBox" className="border border-start-1 border-end-1 d-flex justify-content-center align-items-center" style={{height : "100vh",width : "93.5%",margin : "0 auto"}}>
          <Maincon/>
        </div>
    );
}

export default Container;