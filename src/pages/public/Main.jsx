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
  const { setScrolled } = useOutletContext();

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
      <section className="features-section" id="features" ref={featuresRef}>
        <h2 className="features-title">Características del Shortener</h2>
        <div className="features-cards">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-link"></i>
            </div>
            <h3>URLs Personalizadas</h3>
            <p>
              Crea enlaces cortos con nombres personalizados que sean fáciles de
              recordar y compartir.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-chart-bar"></i>
            </div>
            <h3>Estadísticas Detalladas</h3>
            <p>
              Analiza el rendimiento de tus enlaces con clicks, ubicaciones
              geográficas y dispositivos utilizados.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-clock"></i>
            </div>
            <h3>Enlaces con Expiración</h3>
            <p>
              Configura fechas de expiración para tus enlaces y mantén el
              control total sobre su acceso.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-qrcode"></i>
            </div>
            <h3>Códigos QR</h3>
            <p>
              Genera automáticamente códigos QR para cada enlace y facilita el
              compartir en redes sociales.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-users"></i>
            </div>
            <h3>Compartir Fácilmente</h3>
            <p>
              Comparte tus enlaces directamente en WhatsApp, Twitter, Facebook y
              otras redes sociales.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3>Enlaces Seguros</h3>
            <p>
              Todos los enlaces están protegidos con HTTPS y verificados contra
              malware automáticamente.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Main;
