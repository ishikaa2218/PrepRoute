import {Clock3, FileText, Trophy, Pencil} from "lucide-react";
import "./TestSummaryCard.css";
import { useState } from "react";
import EditTestModal from "../../EditTestModal/EditTestModal";

type Props = {
  testData: any;
  onUpdated?: () => void;
  showEdit?: boolean;
};

const TestSummaryCard = ({testData, onUpdated, showEdit = true}: Props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="summary-card">

      <div className="card-top">

        <span className="test-type">
          {testData?.type}
        </span>

        {
          showEdit && (
            <button
              className="edit-btn"
              onClick={() =>
                setShowModal(true)
              }
            >
              <Pencil size={16} />
            </button>
          )
        }

      </div>

      <div className="chapter-row">

        <div className="chapter-left">

          <h5>{testData?.name}</h5>

          <span className="difficulty">
            {testData?.difficulty}
          </span>

        </div>

      </div>

      <div className="details-grid">

        <div className="detail-row">
          <span className="detail-label">
            Subject
          </span>

          <span className="colon">:</span>

          <span>
            {testData?.subject}
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">
            Topic
          </span>

          <span className="colon">:</span>

          <div className="tags">
            {testData?.topics?.map((topic: string, index: number) => (
                <span key={index}>
                    {topic}
                </span>
            ))}
            </div>
        </div>

        <div className="detail-row">
          <span className="detail-label">
            Sub Topic
          </span>

          <span className="colon">:</span>

          <div className="tags">
            {testData?.sub_topics?.map((item: string, index: number) => (
                <span key={index}>
                    {item}
                </span>
            ))}
            </div>
        </div>

      </div>

      <div className="summary-footer">

        <div className="footer-pill">
          <Clock3 size={14} />
          {testData?.total_time} Min
        </div>

        <div className="footer-pill">
          <FileText size={14} />
          {testData?.total_questions} Q's
        </div>

        <div className="footer-pill">
          <Trophy size={14} />
          {testData?.total_marks} Marks
        </div>

      </div>
      {showModal && (
        <EditTestModal
          testData={testData}
          onClose={() => setShowModal(false)}
          onUpdated={onUpdated}
        />
      )}

    </div>
  );
};

export default TestSummaryCard;