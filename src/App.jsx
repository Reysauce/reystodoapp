import MainContent from "./components/MainContent.jsx";
import Footer from "./components/Footer.jsx";
import Headers from "./components/Headers.jsx";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <>
      {" "}
      <Headers />
      <MainContent />
      <Footer />
    </>
  );
}

export default App;
