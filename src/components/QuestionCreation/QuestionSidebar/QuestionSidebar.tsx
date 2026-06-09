import {TrendingUp, FilePenLine, CircleAlert, Files, Users, Building2, MapPin, Trash2, CircleHelp, Trophy, MessageCircle, Bell, Settings, CheckCircle} from "lucide-react";
import "./QuestionSidebar.css";
import logo from '../../../assets/images/logo.png';
import type { Question } from "../../../types/question";

type Props = {
  questions: Question[];
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<
    React.SetStateAction<number>
  >;

  title?: string;
};

const QuestionSidebar = ({questions, currentQuestionIndex, setCurrentQuestionIndex, title = "Question Creation"}: Props) => {
  return (
    <aside className="question-sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="logo" className="log-logo" />
      </div>
      <div className="question-sidebar-top">
        <div className="icon-column">
          <TrendingUp size={16} />
          <FilePenLine size={16} />
          <CircleAlert size={16} />
          <Files size={16} />
          <Users size={16} />
          <Building2 size={16} />
          <MapPin size={16} />
          <Trash2 size={16} />
          <CircleHelp size={16} />
          <Trophy size={16} />
          <MessageCircle size={16} />
          <Bell size={16} />
          <Settings size={16} />
        </div>
        <div className="question-list-panel">
          <div className="question-header">
            <div>
              {title}
            </div>
            <button>
              ❮❮
            </button>
          </div>
          <p className="total-question-count">
            Total Questions - {questions.length}
          </p>
          <div className="question-list">
            {questions.map((question, index) => (
              <button
                key={question.questionNo}
                className={
                  currentQuestionIndex === index
                    ? "question-item active"
                    : "question-item"
                }
                onClick={() =>
                  setCurrentQuestionIndex(index)
                }
              >
                <div className="question-item-content">

                  {question.completed && (
                    <CheckCircle
                      size={14}
                      color="#17c964"
                    />
                  )}

                  <span>
                    Question {question.questionNo}
                  </span>

                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default QuestionSidebar;