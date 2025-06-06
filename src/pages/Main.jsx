import LinkForm from "../component/form/LinkForm.jsx";
import SuccedLinkCreated from "../component/alerts/SuccedLinkCreated.jsx";
import "../styles/pages/Main.css";
import "../styles/pages/Login.css";
import useLinkCreate from "../hooks/useLinkCreate.js";

function Main() {
  const { response } = useLinkCreate();
  
  return (
    <div className="main-container">
        <div className="main-section">
          <div className="main-content">
            <h1 className="text-title-color">Linky - Shorter Urls</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore
              iure libero soluta dicta quisquam exercitationem qui!
              Exercitationem nisi neque cupiditate veritatis illo error
              perferendis iste autem? Natus, sed repellat! Eius consectetur
              aliquam veritatis illum sint reprehenderit officia temporibus
              odit! Libero voluptatibus autem, hic nam modi deleniti quod
              reprehenderit ab optio?
            </p>
          </div>
          <LinkForm />
          <div className="form-wrapper">
            {response && <SuccedLinkCreated response={response} />}
          </div>
        </div>
    </div>
  );
}

export default Main;
