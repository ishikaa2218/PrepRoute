import Header from "../../components/Header/Header";
import QuestionSidebar from '../../components/QuestionCreation/QuestionSidebar/QuestionSidebar';
import { Outlet } from "react-router-dom";
import "./QuestionLayout.css";
import { useState } from "react";
import type { Question } from "../../types/question";

const QuestionLayout = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sidebarTitle, setSidebarTitle] = useState("Question Creation");
  return (
    <>
      <div className="question-layout">
        <QuestionSidebar questions={questions} currentQuestionIndex={currentQuestionIndex} setCurrentQuestionIndex={setCurrentQuestionIndex} title={sidebarTitle}/>
        <div className="question-main">
            <Header/>
            <div className="question-content">
                <Outlet context={{questions, setQuestions, currentQuestionIndex, setCurrentQuestionIndex, setSidebarTitle}}/>
            </div>
        </div>
      </div>
    </>
  );
};

export default QuestionLayout;