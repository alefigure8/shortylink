import LinkForm from "../../component/form/LinkForm.jsx";
import SuccedLinkCreated from "../../component/alerts/SuccedLinkCreated.jsx";
import "../../styles/pages/Main.css";
import useLinkCreate from "../../hooks/useLinkCreate.js";
import { useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";

function Main() {
  const { response } = useLinkCreate();
  const mainSectionRef = useRef(null);
  const featuresRef = useRef(null);
  const { scrolled, setScrolled } = useOutletContext();

  // Scroll a la sección de features
  const scrollToFeatures = () => {
    const section = document.getElementById("features");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  window.addEventListener("scroll", console.log("SCROLLLLL"));

  useEffect(() => {
    function handleScroll() {
      console.log("Scroll");
      if (!featuresRef.current || !mainSectionRef.current) return;
      const featuresTop = featuresRef.current.getBoundingClientRect().top;
      const navHeight = 60; // igual a var(--nav-height)
      setScrolled(featuresTop <= navHeight + 20);
    }

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setScrolled]);

  return (
    <>
      <section className="main-section">
        <div className="main-hero">
          <div className="main-logo">LNKY</div>
          <h1>Acorta tus links de forma inteligente</h1>
          <p className="main-subtitle">
            Simplifica, comparte y analiza tus enlaces con{" "}
            <span className="brand">LNKY</span>
          </p>
          <button className="features-scroll-btn" onClick={scrollToFeatures}>
            Ver características
          </button>
        </div>
        <div className="main-form-card">
          <label htmlFor="inputText" className="input-label">
            Pega tu enlace aquí:
          </label>
          <LinkForm />
          {response && <SuccedLinkCreated response={response} />}
        </div>
      </section>
      <section className="features-section">

      </section>
    </>
  );
}

export default Main;
