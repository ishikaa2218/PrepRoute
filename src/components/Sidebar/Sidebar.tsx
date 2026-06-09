import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { FiTrendingUp } from "react-icons/fi";
import { LuSquarePen } from "react-icons/lu";
import { TbReportSearch } from "react-icons/tb";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="logo" className="log-logo" />
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "sidebar-link active-link" : "sidebar-link"}>
          <FiTrendingUp className="sidebar-icon" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/create-test" className={({ isActive }) => isActive ? "sidebar-link active-link" : "sidebar-link"}>
          <LuSquarePen className="sidebar-icon" />
          <span>Test Creation</span>
        </NavLink>
        <NavLink to="/tracking" className={({ isActive }) => isActive ? "sidebar-link active-link" : "sidebar-link"}>
          <TbReportSearch className="sidebar-icon" />
          <span>Test Tracking</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;