import React from "react";

function Footer()
{
    return (
        <footer>
            <div className="footer-icons">
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer" title="GitHub">
                    <i className="fab fa-github"></i>
                </a>
                <a href="https://tusitio.com" target="_blank" rel="noopener noreferrer" title="Website">
                    <i className="fas fa-globe"></i>
                </a>
                <a href="mailto:contacto@tusitio.com" title="Contacto">
                    <i className="fas fa-envelope"></i>
                </a>
            </div>
            <p>© 2023 Mi Sitio Web. Todos los derechos reservados.</p>
        </footer>
    )
}

export default Footer;