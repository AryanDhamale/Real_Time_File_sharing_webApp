import SendCard from "../Cards/Sendcard.jsx"
import Receiving from "../Cards/Receiving.jsx";
import Btn from "../Button/Btn.jsx";
import Info from "./Info.jsx";
import "./Carousel.css";

function Carousel() {
    return (
        <>
            <Info />
            <div id="carouselExample" className="my-Carousel carousel slide col-lg-5 d-flex flex-column justify-content-evenly align-items-center">
                <div className="carousel-inner" style={{width:"23rem"}}>
                    <div className="carousel-item active" id="Speed">
                        <SendCard />
                    </div>
                    <div className="carousel-item" id="Speed">
                        <Receiving />
                    </div>
                </div>
                {/* controles over here */}
                <Btn />
            </div>
        </>
    );
}

export default Carousel;