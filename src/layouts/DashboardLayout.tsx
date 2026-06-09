import './DashboardLayout.css'
import { Outlet } from "react-router-dom";
import Sidebar from '../components/Sidebar/Sidebar'
import Header from '../components/Header/Header'

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;