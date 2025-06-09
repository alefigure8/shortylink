import "./App.css";
import { LinkProvider } from "./context/LinkCreateProvider.jsx";
import { LinksProvider } from "./context/LinksProvider.jsx";
import { Routes, Route } from "react-router-dom";
import { SessionProvider } from "./context/SessionProvider.jsx";
import { UserProvider } from "./context/UserProvider.jsx";
import DashboardLayout from "./layout/DashboardLayout.jsx";
import DashboardLink from "./pages/dashboard/DashboardLink.jsx";
import DashboardMain from "./pages/dashboard/DashboardMain.jsx";
import Error404 from "./pages/Error404.jsx";
import Layout from "./layout/Layout.jsx";
import Login from "./pages/Login.jsx";
import Main from "./pages/Main.jsx";
import Profile from "./pages/dashboard/profile/Profile.jsx";
import ProtectedRoute from "./layout/ProtectedRoute.jsx";

function App() {
  return (
    <SessionProvider>
      <UserProvider>
        <LinkProvider>
          <LinksProvider>
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
                    <Route path=":id" element={<DashboardLink />} />
                    <Route path="profile" element={<Profile />} />
                  </Route>
                </Route>
              </Route>
              {/* PÚBLICAS sin Navbar/Footer */}
              <Route path="login" element={<Login />} />
            </Routes>
          </LinksProvider>
        </LinkProvider>
      </UserProvider>
    </SessionProvider>
  );
}

export default App;
