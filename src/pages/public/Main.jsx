import LinkForm from "../../component/form/LinkForm.jsx";
import SuccedLinkCreated from "../../component/alerts/SuccedLinkCreated.jsx";
import "../../styles/pages/Main.css";
import useLinkCreate from "../../hooks/useLinkCreate.js";
import { useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";

function Main() {
  const { response } = useLinkCreate();
  const featuresRef = useRef(null);
  const { setScrolled } = useOutletContext();

  // Scroll a la sección de features
  const scrollToFeatures = () => {
    const section = document.getElementById("features");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      const threshold = 900; // Umbral para cambiar el color del nav
      
      // Cambiar color cuando el scroll pasa del umbral
      setScrolled(scrollY > threshold);
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Ejecutar una vez al montar

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setScrolled]);

  return (
    <>
      <section className="main-section">
      <h2 className="main-title">LNKY</h2>
      <div className="main-crds">
        <div className="main-hero">
          <h1>Acorta tus links de forma inteligente</h1>
          <h3 className="hero-subtitle">La plataforma más avanzada para acortar URLs</h3>
          <p className="main-subtitle">
            Simplifica, comparte y analiza tus enlaces con{" "}
            <span className="brand">LNKY</span>. Crea enlaces cortos, personalizados y seguros en segundos.
          </p>
          <div className="hero-features">
            <span className="hero-feature">✓ URLs Personalizadas</span>
            <span className="hero-feature">✓ Estadísticas Detalladas</span>
            <span className="hero-feature">✓ Códigos QR</span>
          </div>
          <div className="hero-button-container">
            <button className="features-scroll-btn" onClick={scrollToFeatures}>
              Ver características
            </button>
          </div>
        </div>
        <div className="main-form-card">
          <div className="form-header">
            <h3 className="form-title">¡Crea tu link corto ahora!</h3>
            <p className="form-subtitle">100% Gratis • Sin registro requerido</p>
          </div>
          <div className="form-steps">
            <div className="form-step">
              <span className="step-number">1</span>
              <span className="step-text">Pega tu enlace largo</span>
            </div>
            <div className="form-step">
              <span className="step-number">2</span>
              <span className="step-text">Elige un nombre personalizado (opcional)</span>
            </div>
            <div className="form-step">
              <span className="step-number">3</span>
              <span className="step-text">¡Listo! Tu link corto está listo</span>
            </div>
          </div>
          <div className="form-container">
            <label htmlFor="inputText" className="input-label">
              Pega tu enlace aquí:
            </label>
            <LinkForm />
            {response && <SuccedLinkCreated response={response} />}
          </div>
       
        </div>
      </div>
      </section>
      <section className="features-section" id="features" ref={featuresRef}>
        <h2 className="features-title">LNKY</h2>
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
