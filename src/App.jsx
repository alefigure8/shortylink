import "./App.css";
import { LinkProvider } from "./context/LinkCreateProvider.jsx";
import { Routes, Route } from "react-router-dom";
import { SessionProvider } from "./context/SessionProvider.jsx";
import Layout from "./layout/Layout.jsx"
import DashboardLayout from "./layout/DashboardLayout.jsx"
import ProtectedRoute from "./layout/ProtectedRoute.jsx"
import Main from "./pages/Main.jsx"
import Error404 from "./pages/Error404.jsx"
import Login from "./pages/Login.jsx"
import DashboardMain from "./pages/dashboard/DashboardMain.jsx"


function App() {
  return (
    <SessionProvider>
      <LinkProvider>
        <Routes>
          {/* CON Navbar/Footer */}
          <Route path="/" element={<Layout />}>
            {/* Páginas públicas dentro del Layout */}
            <Route index element={<Main />} />
            <Route path="*" element={<Error404 />} />

            {/* Protegidas */}
            <Route element={<ProtectedRoute />}>
              <Route path="account" element={<DashboardLayout />}>
                <Route index element={<DashboardMain />} />
              </Route>
            </Route>
          </Route>
          {/* PÚBLICAS sin Navbar/Footer */}
          <Route path="login" element={<Login />} />
        </Routes>
      </LinkProvider>
    </SessionProvider>
  );
}

export default App;
