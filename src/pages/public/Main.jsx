import LinkForm from "../../component/form/LinkForm.jsx";
import SuccedLinkCreated from "../../component/alerts/SuccedLinkCreated.jsx";
import "../../styles/pages/Main.css";
import "../../styles/pages/Login.css";
import useLinkCreate from "../../hooks/useLinkCreate.js";

function Main() {
  const { response } = useLinkCreate();

  return (
    <div className="main-container">
      <div className="main-section">
        <div className="main-content">
          <h1 className="text-title-color">Your Smart Link Shortening Tool</h1>
          <p>
            Supercharge your digital strategy with LNKY, the sleek and reliable link shortener. Simplify sharing, boost engagement, and gain powerful insights — all with a clean and intuitive experience.
          </p>
        </div>
        <div className="input-section">
           <label htmlFor="inputText">Crear link:</label>
          <LinkForm />
        </div>
        <div className="form-wrapper">
          {response && <SuccedLinkCreated response={response} />}
        </div>
      </div>
    </div>
  );
}

export default Main;
