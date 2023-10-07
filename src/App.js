import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
// import ProductSlider from "./components/products/ProductSlider";
import Routes from "./components/routes/Routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    // <ProductSlider />

    <BrowserRouter>
      <div>
        <Header />
        <div className="padding-class">
          <Routes />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
