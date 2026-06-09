import './ConfirmationScreen.css'
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TestSummaryCard from "../../components/QuestionCreation/TestSummaryCard/TestSummaryCard";
import { getTestById } from "../../services/detailTestService";
import { CalendarDays, ChevronDown } from 'lucide-react';
import ViewTestModal from '../../components/ViewTestModal/ViewTestModal';

const ConfirmationScreen = () => {
  const { testId } = useParams();
  const [testData, setTestData] = useState<any>(null);
  const [publishType, setPublishType] = useState("instant");
  const [duration, setDuration] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const nav = useNavigate();
  

  useEffect(() => {
    fetchTest();
  }, []);

  const fetchTest = async () => {
    const data = await getTestById(testId!);
    setTestData(data);
  };

  const handleConfirm = () => {
    console.log({
      testId,
      publishType,
      duration,
    });

    nav('/dashboard')
  };

  return (
    <div className="confirmation-page">
      <div className="confirmation-breadcrumb">
        Test creation
      </div>
      <div className="success-row">
        <h4>
          Test created
        </h4>
        <span className="success-pill">
          All {testData?.total_questions} 
          Questions done
        </span>
      </div>
      <TestSummaryCard testData={testData} />
      <div className="preview-wrapper">
        <button className="preview-btn" onClick={() => setShowPreview(true)}>
          Preview Test
        </button>
      </div>
      <div className="publish-tabs">
        <button className={publishType === "instant" ? "active" : ""} onClick={() => setPublishType("instant")}>
          Publish Now
        </button>
        <button className={publishType === "schedule" ? "active" : ""} onClick={() => setPublishType("schedule")}>
          Schedule Publish
        </button>
      </div>
      {publishType === "schedule" && (
        <div className="schedule-box">
          <h5>
            Select Date and Time
          </h5>
          <div className="schedule-row">
            <div className="custom-field">

                <input
                    type="date"
                    id="endDate"
                    className="custom-date"
                />

                <CalendarDays
                    size={20}
                    className="field-icon clickable-icon"
                    onClick={() =>
                    (
                        document.getElementById(
                        "endDate"
                        ) as HTMLInputElement
                    )?.showPicker?.()
                    }
                />

            </div>
            <div className="custom-field">

                <input
                    type="time"
                    id="endTime"
                    className="custom-time"
                />

                <ChevronDown
                    size={20}
                    className="field-icon clickable-icon"
                    onClick={() =>
                    (
                        document.getElementById(
                        "endTime"
                        ) as HTMLInputElement
                    )?.showPicker?.()
                    }
                />

            </div>
          </div>
        </div>
      )}
      <div className="live-until">
        <h5>
          Live Until
        </h5>
        <p>
          Choose how long this test
          should remain available.
        </p>
        <div className="duration-grid">
          {[
            "Always Available",
            "1 Week",
            "2 Weeks",
            "3 Weeks",
            "1 Month",
            "Custom Duration",
          ].map((item) => (
            <label key={item}>
              <input
                type="radio"
                name="duration"
                checked={
                  duration === item
                }
                onChange={() =>
                  setDuration(item)
                }
              />

              {item}
            </label>
          ))}
        </div>
        <div className="custom-duration-row">
            <div className="custom-field">

                <input
                    type="date"
                    id="endDate"
                    className="custom-date"
                />

                <CalendarDays
                    size={20}
                    className="field-icon clickable-icon"
                    onClick={() =>
                    (
                        document.getElementById(
                        "endDate"
                        ) as HTMLInputElement
                    )?.showPicker?.()
                    }
                />

            </div>
            <div className="custom-field">

                <input
                    type="time"
                    id="endTime"
                    className="custom-time"
                />

                <ChevronDown
                    size={20}
                    className="field-icon clickable-icon"
                    onClick={() =>
                    (
                        document.getElementById(
                        "endTime"
                        ) as HTMLInputElement
                    )?.showPicker?.()
                    }
                />

            </div>
        </div>
      </div>
      <div className="confirm-footer">
        <button className="cancel-btn" onClick={()=>nav(`/add-questions/${testId}`)}>
          Cancel
        </button>
        <button className="confirm-btn" onClick={handleConfirm}>
          Confirm
        </button>
      </div>
      {
        showPreview && testData && (
          <ViewTestModal test={testData} onClose={() => setShowPreview(false)} />
        )
      }
    </div>
  );
};

export default ConfirmationScreen;