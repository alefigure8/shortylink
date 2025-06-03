import { Outlet } from 'react-router-dom';
import Nav from './Nav.jsx';
import Footer from './Footer.jsx';

function Layout()
{
    return (
        <div className="layout">
        <Nav />
        <main className="main-content">
             <Outlet />
        </main>
        <Footer />
        </div>
    );
}

export default Layout;


