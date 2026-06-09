import { useState } from "react";
import "./RecentTestsTable.css";
import {
  Pencil,
  Eye,
  Trash2,
  Plus
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { deleteTest } from "../../services/testService";
import ViewTestModal from "../ViewTestModal/ViewTestModal";

type Props = {
  tests: any[];
  refreshTests: () => void;
};

const RecentTestsTable = ({tests, refreshTests}: Props) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);

  const filteredTests =
  tests.filter((test) =>
    test.name
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )
  );

  const formatDate = (dateString: string) => {
    return new Date(
      dateString
    ).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const handleDelete = async (
    id: string
  ) => {
    const confirmDelete =
      window.confirm(
        "Delete this test?"
      );

    if (!confirmDelete) return;

    try {
      await deleteTest(id);

      refreshTests();
    } catch (error) {
      console.log(error);
    }
  };

  const getStatus = (test:any) => {

  const now = new Date();

  if (
    test.publish_at &&
    now < new Date(test.publish_at)
  ) {
    return "scheduled";
  }

  if (
    test.expires_at &&
    now > new Date(test.expires_at)
  ) {
    return "expired";
  }

  return "live";
};

const status = getStatus(tests);

  return (
    <div className="tests-card">

      <div className="table-header">

        <div className="search-box">
          <input
            placeholder="Search tests..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <button className="create-btn" onClick={() => navigate("/create-test")}>
          <Plus size={16}/>
          Create New Test
        </button>

      </div>

      <table>

        <thead>
          <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {filteredTests.map((test) => (
            <tr key={test.id}>

              <td>{test.name}</td>

              <td>{test.subject}</td>

              <td>
                <span
  className={
    status === "live"
      ? "published"
      : status === "scheduled"
      ? "scheduled"
      : "expired"
  }
>
  {status}
</span>
              </td>

              <td>
                {formatDate(test.created_at)}
              </td>

              <td>
                <div className="action-buttons">

                  <button
                    className="action-btn view-btn"
                    onClick={() => {
                      setSelectedTest(test);
                      setShowViewModal(true);
                    }}
                  >
                    <Eye size={16} />
                  </button>

                  <button
                    className="action-btn edit-btn"
                    onClick={() =>
                      navigate(`/edit-test/${test.id}`)
                    }
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    className="action-btn delete-btn"
                    onClick={() =>
                      handleDelete(test.id)
                    }
                  >
                    <Trash2 size={16} />
                  </button>

                </div>
              </td>
            </tr>
          ))}

        </tbody>

      </table>
      {
        showViewModal &&
        selectedTest && (
          <ViewTestModal
            test={selectedTest}
            onClose={() =>
              setShowViewModal(false)
            }
          />
        )
      }
    </div>
  );
};

export default RecentTestsTable;