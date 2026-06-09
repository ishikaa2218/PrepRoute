import "./Dashboard.css";
//import StatsCard from '../../components/StatsCard/StatsCard';
import RecentTestsTable from '../../components/RecentTestsTable/RecentTestsTable';
//import {FileText, CheckCircle, Clock3, BookOpen} from "lucide-react";
import { useEffect, useState } from "react";
import { getAllTests } from "../../services/testService";

const Dashboard = () => {
  const [tests, setTests] = useState([]);

  {/*const stats = [
    {
      title: "Total Tests",
      value: 42,
      icon: <FileText size={22} />
    },
    {
      title: "Published",
      value: 28,
      icon: <CheckCircle size={22} />
    },
    {
      title: "Draft",
      value: 14,
      icon: <Clock3 size={22} />
    },
    {
      title: "Questions",
      value: 850,
      icon: <BookOpen size={22} />
    }
  ];*/}

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const data = await getAllTests();

      console.log("ALL TESTS", data);

      setTests(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard-page">

      <div className="dashboard-title">

        <div>
          <h2>Welcome Back 👋</h2>
          <p>Manage and monitor your tests</p>
        </div>

      </div>

      {/*<div className="stats-grid">
        {stats.map((item,index) => (
          <StatsCard
            key={index}
            {...item}
          />
        ))}
      </div>*/}

      <RecentTestsTable tests={tests} refreshTests={fetchTests} />

    </div>
  );
};

export default Dashboard;