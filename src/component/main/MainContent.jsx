import LinkForm from "../form/LinkForm.jsx";
import SuccedLinkCreated from "../alerts/SuccedLinkCreated.jsx";
import { useContext } from "react";
import { LinkContext } from "../../context/LinkCreateContext.js";

function MainContent() {

  const { response } = useContext(LinkContext);
  return (
    <>
      <main className="container">
        <div className="main-section">
          <div className="main-content">
            <h1>Linky - Shorter Urls</h1>
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
          <LinkForm/>
          <div className="form-wrapper">
            {response && (
              <SuccedLinkCreated response={response} />
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default MainContent;
