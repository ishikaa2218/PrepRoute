import { useEffect, useState } from "react";
import { X } from "lucide-react";

import "./ViewTestModal.css";

import TestSummaryCard from "../QuestionCreation/TestSummaryCard/TestSummaryCard";
import { fetchQuestionsBulk } from "../../services/questionService";

type Props = {
  test: any;
  onClose: () => void;
};

const ViewTestModal = ({
  test,
  onClose,
}: Props) => {
  const [questions, setQuestions] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);

      const data =
        await fetchQuestionsBulk(
          test.questions
        );

      setQuestions(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="view-modal-overlay">

      <div className="view-modal">

        <div className="view-header">

          <h3>
            Test Preview
          </h3>

          <button
            className="close-view-btn"
            onClick={onClose}
          >
            <X size={20} />
          </button>

        </div>

        <TestSummaryCard
          testData={test} showEdit={false}
        />

        <div className="questions-section">

          <h4>
            Questions (
            {questions.length}
            )
          </h4>

          {loading ? (
            <p>
              Loading Questions...
            </p>
          ) : (
            questions.map(
              (
                question,
                index
              ) => (
                <div
                  className="question-preview-card"
                  key={question.id}
                >

                  <div className="question-number">

                    Question{" "}
                    {index + 1}

                  </div>

                  <div
                    className="question-text"
                    dangerouslySetInnerHTML={{
                      __html: question.question,
                    }}
                  />

                  <div className="options-list">

                    <div
                      className={
                        question.correct_option ===
                        "option1"
                          ? "option-item correct"
                          : "option-item"
                      }
                    >
                      A.{" "}
                      {
                        question.option1
                      }
                    </div>

                    <div
                      className={
                        question.correct_option ===
                        "option2"
                          ? "option-item correct"
                          : "option-item"
                      }
                    >
                      B.{" "}
                      {
                        question.option2
                      }
                    </div>

                    <div
                      className={
                        question.correct_option ===
                        "option3"
                          ? "option-item correct"
                          : "option-item"
                      }
                    >
                      C.{" "}
                      {
                        question.option3
                      }
                    </div>

                    <div
                      className={
                        question.correct_option ===
                        "option4"
                          ? "option-item correct"
                          : "option-item"
                      }
                    >
                      D.{" "}
                      {
                        question.option4
                      }
                    </div>

                  </div>

                  {question.explanation && (
                    <div className="question-explanation">

                      <strong>
                        Explanation:
                      </strong>

                      <p>
                        {
                          question.explanation
                        }
                      </p>

                    </div>
                  )}

                </div>
              )
            )
          )}

        </div>

      </div>

    </div>
  );
};

export default ViewTestModal;