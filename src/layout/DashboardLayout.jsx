import Sidebar from "../component/Sidebar.jsx";
import { Outlet } from "react-router-dom";
import "../styles/layout/dashboardLayout.css"

function DashboardLayout() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-main">
        <Sidebar />
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default DashboardLayout;