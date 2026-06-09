import "./QuestionForm.css";
import { Trash2 } from "lucide-react";
import type { Question } from "../../../types/question";
import { useNavigate } from "react-router-dom";
import RichTextEditor from "../../RichTextEditor/RichTextEditor";
import { useRef } from "react";

type Props = {
  currentQuestion?: Question;
  totalQuestions: number;
  questions: Question[];
  setQuestions: React.Dispatch<any>;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  testData: any;
  handlePublish: () => void;
  isEditMode?: boolean;
  handleCsvUpload?: (file: File) => void;
};

const QuestionForm = ({currentQuestion, totalQuestions, questions, setQuestions, currentQuestionIndex, setCurrentQuestionIndex, testData, handlePublish, isEditMode = false, handleCsvUpload}: Props) => {
  const nav = useNavigate();
  const csvInputRef = useRef<HTMLInputElement>(null);
  const options = [
    {
      key: "option1",
      label: "option1",
    },
    {
      key: "option2",
      label: "option2",
    },
    {
      key: "option3",
      label: "option3",
    },
    {
      key: "option4",
      label: "option4",
    },
  ];

  const updateQuestion = (field: string, value: any) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex] = {
      ...updatedQuestions[
        currentQuestionIndex
      ], [field]: value,
    };

    setQuestions(updatedQuestions);
  };

  const handleNext = () => {
    const updated = [...questions];

    updated[currentQuestionIndex] = {
      ...updated[currentQuestionIndex],
      completed: true,
    };

    setQuestions(updated);

    if (
      currentQuestionIndex ===
      questions.length - 1
    ) {

      localStorage.setItem(
        "completedQuestions",
        JSON.stringify(updated)
      );

      handlePublish();

      return;
    }

    setCurrentQuestionIndex(
      prev => prev + 1
    );
  };

  const clearField = (field: string) => {
    const updatedQuestions = [...questions];

    updatedQuestions[currentQuestionIndex] = {
      ...updatedQuestions[currentQuestionIndex],
      [field]: "",
    };

    setQuestions(updatedQuestions);
  };

  const handleDeleteAll = () => {
    const confirmed = window.confirm(
      "Delete all edits for this question?"
    );

    if (!confirmed) return;

    const updatedQuestions = [...questions];

    updatedQuestions[currentQuestionIndex] = {
      ...updatedQuestions[currentQuestionIndex],

      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correctOption: "",
      explanation: "",
      difficulty: "",
      topic: "",
      subTopic: "",
      mediaUrl: "",
      completed: false,
    };

    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      id: null,
      questionNo: questions.length + 1,
      type: "mcq",
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correctOption: "",
      explanation: "",
      difficulty: "",
      topic: testData?.topics?.[0] || "",
      subTopic: testData?.sub_topics?.[0] || "",
      mediaUrl: "",
      completed: false,
    };

    const updatedQuestions = [...questions, newQuestion];

    setQuestions(updatedQuestions);
    setCurrentQuestionIndex(updatedQuestions.length - 1);
  };

  return (
    <div className="question-form">
      <div className="question-form-header">
        <h5>Question {currentQuestion?.questionNo}/{totalQuestions}</h5>
        <div className="question-actions">
          <button className="mcq-btn" onClick={handleAddQuestion}>
            + MCQ
          </button>
          <>
            <button className="csv-btn" onClick={() => csvInputRef.current?.click()}>
              CSV
            </button>
            <input ref={csvInputRef} type="file" accept=".csv" style={{display: "none"}} onChange={(e) => {
                const file = e.target.files?.[0];
                if (file && handleCsvUpload) {
                  handleCsvUpload(file);
                }
              }}
            />
        </>
        </div>
      </div>
      <button className="delete-all-link" onClick={handleDeleteAll}>
          <Trash2 size={14} />
          Delete All Edits
      </button>
      <div className="form-group">
        <label>Question</label>
        <div className="field-wrapper">
            {/*<textarea rows={6} placeholder="Type Question Here" value={currentQuestion?.question || ""} onChange={(e) => updateQuestion("question", e.target.value)} />*/}
            <RichTextEditor
              key={currentQuestion?.questionNo}
              value={currentQuestion?.question || ""}
              onChange={(value) =>
                updateQuestion("question", value)
              }
            />
            <button
            type="button"
            className="delete-link"
            onClick={() =>
              clearField("question")
            }
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      <div className="options-wrapper">
        <label>Type the options below</label>
        {options.map((option) => (
          <div key={option.key} className="option-row">
            <input type="radio" name={`correct-${currentQuestion?.questionNo}`} checked={currentQuestion?.correctOption === option.key} onChange={() => updateQuestion("correctOption", option.key)} />
            <div className="option-input-wrapper">
              <input type="text" placeholder="Type Option Here" value={currentQuestion?.[option.key as keyof Question] as string || ""} onChange={(e) => updateQuestion(option.key, e.target.value)} />
              <button
  type="button"
  className="delete-link"
  onClick={() =>
    clearField(option.key)
  }
>
  <Trash2 size={16} />
</button>
            </div>
          </div>
        ))}
      </div>
      <div className="form-group mt-4">
        <label>Add Solution</label>
        <div className="field-wrapper">
            <textarea rows={5} placeholder="Type here" value={currentQuestion?.explanation || ""} onChange={(e) => updateQuestion("explanation", e.target.value)} />
            <button
  type="button"
  className="delete-link"
  onClick={() =>
    clearField("explanation")
  }
>
  <Trash2 size={18} />
</button>
        </div>
      </div>
      <div className="question-settings">
        <h5>Question Settings</h5>
        <div className="row">
          {/* Difficulty */}
          <div className="col-md-4">
            <label>Difficulty</label>
            <select
              value={currentQuestion?.difficulty || ""}
              onChange={(e) =>
                updateQuestion(
                  "difficulty",
                  e.target.value
                )
              }
            >
              <option value="">
                Select Difficulty
              </option>

              <option value="easy">
                Easy
              </option>

              <option value="medium">
                Medium
              </option>

              <option value="hard">
                Hard
              </option>
            </select>
          </div>

          {/* Topic */}

          <div className="col-md-4">
            <label>Topic</label>

            <select
              value={currentQuestion?.topic || ""}
              onChange={(e) =>
                updateQuestion(
                  "topic",
                  e.target.value
                )
              }
            >
              <option value="">
                Select Topic
              </option>

              {testData?.topics?.map(
                (
                  topic: string,
                  index: number
                ) => (
                  <option
                    key={index}
                    value={topic}
                  >
                    {topic}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Sub Topic */}

          <div className="col-md-4">
            <label>Sub Topic</label>

            <select
              value={currentQuestion?.subTopic || ""}
              onChange={(e) =>
                updateQuestion(
                  "subTopic",
                  e.target.value
                )
              }
            >
              <option value="">
                Select Sub Topic
              </option>

              {testData?.sub_topics?.map(
                (
                  item: string,
                  index: number
                ) => (
                  <option
                    key={index}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}
            </select>
          </div>

        </div>
      </div>
      <div className="question-footer">
        <button className="exit-btn" onClick={()=>nav('/create-test')}>
          Exit Test Creation
        </button>
        <button
  className="next-btn"
  onClick={
    isEditMode
      ? handlePublish
      : handleNext
  }
>
          {
          isEditMode
          ? "Save Changes"
          : currentQuestionIndex ===
            questions.length - 1
            ? "Publish"
            : "Next"
          }
        </button>
      </div>
    </div>
  );
};

export default QuestionForm;