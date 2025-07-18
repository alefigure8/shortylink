import "./App.css";
import { LinkProvider } from "./context/LinkCreateProvider.jsx";
import { LinksProvider } from "./context/LinksProvider.jsx";
import { Routes, Route } from "react-router-dom";
import { SessionProvider } from "./context/SessionProvider.jsx";
import { UserProvider } from "./context/UserProvider.jsx";
import DashboardLayout from "./layout/DashboardLayout.jsx";
import DashboardLink from "./pages/dashboard/DashboardLink.jsx";
import DashboardMain from "./pages/dashboard/DashboardMain.jsx";
import Error404 from "./pages/public/Error404.jsx";
import Layout from "./layout/Layout.jsx";
import Login from "./pages/public/Login.jsx";
import Main from "./pages/public/Main.jsx";
import Profile from "./pages/dashboard/profile/Profile.jsx";
import ProtectedRoute from "./layout/ProtectedRoute.jsx";
import Register from "./pages/public/Register.jsx";
import { AnalyticsProvider } from "./context/AnalyticsProvider.jsx";
import DashboardAnalytics from "./pages/dashboard/Dashboardanalytics.jsx";
import VerifyPass from "./pages/public/VerifyPass.jsx";
import Redirect from "./pages/public/Redirect.jsx";
import { LoadingProvider } from "./context/LoadingProvider.jsx";
import MessageProvider from "./context/MessageProvider.jsx";
import BrokenLink from "./pages/public/BrokenLink.jsx";

function App() {
  return (
    <LoadingProvider>
      <MessageProvider>
        <SessionProvider>
          <UserProvider>
            <AnalyticsProvider>
              <LinkProvider>
                <LinksProvider>
                  <Routes>
                    {/* CON Navbar/Footer */}
                    <Route path="/" element={<Layout />}>
                      {/* Páginas públicas dentro del Layout */}
                      <Route index element={<Main />} />
                      <Route path="register" element={<Register />} />
                      <Route path=":id/pass" element={<VerifyPass />} />
                      <Route path=":id" element={<Redirect />} />
                      <Route path="brokenlink" element={<BrokenLink />} />
                      <Route path="*" element={<Error404 />} />
                      {/* Protegidas */}
                      <Route element={<ProtectedRoute />}>
                        <Route path="account" element={<DashboardLayout />}>
                          <Route index element={<DashboardMain />} />
                          <Route path=":id" element={<DashboardLink />} />
                          <Route
                            path="analytics"
                            element={<DashboardAnalytics />}
                          />
                          <Route path="profile" element={<Profile />} />
                        </Route>
                      </Route>
                    </Route>
                    {/* PÚBLICAS sin Navbar/Footer */}
                    <Route path="login" element={<Login />} />
                  </Routes>
                </LinksProvider>
              </LinkProvider>
            </AnalyticsProvider>
          </UserProvider>
        </SessionProvider>
      </MessageProvider>
    </LoadingProvider>
  );
}

export default App;
