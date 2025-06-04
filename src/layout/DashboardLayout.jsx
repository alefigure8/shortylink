import Sidebar from "../component/Sidebar.jsx";
import { Outlet } from "react-router-dom";
import "../styles/layout/dashboardLayout.css"

function DashboardLayout() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
}
export default DashboardLayout;