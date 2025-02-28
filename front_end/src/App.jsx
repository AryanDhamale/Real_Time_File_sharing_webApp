import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Navbar from "./components/HeaderAndFooter/Navbar";
import Footer from "./components/HeaderAndFooter/Footer";
import Container from "./components/Body/Container";


function App()
{
  return (
    <div>
      <Navbar/>
      <Container/>
      <Footer/>
    </div>
  );
}

export default App;