import "./App.css";
import Nav from "./component/layout/Nav.jsx";
import Footer from "./component/layout/Footer.jsx";
import MainContent from "./component/main/MainContent.jsx";
import { LinkProvider } from "./context/LinkCreateProvider.jsx";

function App() {
  return (
    <>
      <LinkProvider>
        <Nav />
        <MainContent />
        <Footer />
      </LinkProvider>
    </>
  );
}

export default App;
