import "./App.css";
import MainContent from "./component/main/MainContent.jsx";
import { LinkProvider } from "./context/LinkCreateProvider.jsx";
import { Routes, Route } from "react-router-dom";
import Layout from "./component/layout/Layout.jsx";
import Login from "./component/layout/Login.jsx";
import Error404 from "./component/layout/Error404.jsx";
import { SessionProvider } from "./context/SessionProvider.jsx";
import Dashboard from "./component/layout/Dashboard/Dashboard.jsx";
import ProtectedRoute from "./component/layout/ProtectedRoute.jsx";

function App() {
  return (
    <SessionProvider>
      <LinkProvider>
        <Routes>
          {/* RUTAS NO PROTEGIDAS */}
          <Route path="/" element={<Layout />}>
            <Route index element={<MainContent />} />
            <Route path="*" element={<Error404 />} />
            {/*RUTAS PROTEGIDAS*/}
            <Route path="/" element={<ProtectedRoute />}>
              {/* RUTAS CON LAYOUT */}
              <Route path="account" element={<Dashboard />} />
            </Route>
          </Route>
          {/* RUTAS PUBLICAS */}
          <Route path="login" element={<Login />} />
        </Routes>
      </LinkProvider>
    </SessionProvider>
  );
}

export default App;
