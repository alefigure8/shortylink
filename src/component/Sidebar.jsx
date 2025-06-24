import { Link } from "react-router-dom";
import "../styles/component/LateralNav.css";

function Sidebar() {
  return (
    <>
      <div className="lateral-nav ">
        <ul className="lateral-nav-ul">
          <li className="lateral-nav-li">
            <i className="fa-solid fa-house"></i>
            <Link to="/account"> Overview</Link>
          </li>
          <li className="lateral-nav-li">
            <i className="fa-solid fa-chart-simple"></i>
            <Link to="/account/analytics"> Analytics</Link>
          </li>
          <li className="lateral-nav-li">
            <i className="fa-solid fa-user"></i>
            <Link to="/account/profile"> Profile</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
