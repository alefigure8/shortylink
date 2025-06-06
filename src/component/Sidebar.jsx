import { Link } from "react-router-dom";
import "../styles/component/LateralNav.css"

function Sidebar()
{

    return(<>
        <div className="lateral-nav ">
            <ul>
                <li>
                   <Link to="/account"> Overviwe</Link>
                </li>
            </ul>

        </div>
    </>)
}

export default Sidebar;