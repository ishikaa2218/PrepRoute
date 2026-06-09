import { useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import TestSummaryCard from "../../components/QuestionCreation/TestSummaryCard/TestSummaryCard";
import QuestionForm from "../../components/QuestionCreation/QuestionForm/QuestionForm";

import { getTestById } from "../../services/detailTestService";
import { fetchQuestionsBulk, updateQuestion, createQuestionsBulk } from "../../services/questionService";

import "./EditTest.css";
import EditTestModal from "../../components/EditTestModal/EditTestModal";

const EditTest = () => {

  const { testId } = useParams();
  const [showTestModal, setShowTestModal] =
  useState(false);

  const [testData, setTestData] =
    useState<any>(null);

  const {
  questions,
  setQuestions,
  currentQuestionIndex,
  setCurrentQuestionIndex, setSidebarTitle
} = useOutletContext<any>();

  useEffect(() => {
    loadTest();
  }, []);

  useEffect(() => {
  setSidebarTitle("Edit Questions");

  return () =>
    setSidebarTitle(
      "Question Creation"
    );
}, []);

  const loadTest = async () => {
    try {

      const test =
        await getTestById(
          testId!
        );

      setTestData(test);

      if (
        test.questions?.length
      ) {

        const fetchedQuestions =
  await fetchQuestionsBulk(
    test.questions
  );

const formattedQuestions =
  fetchedQuestions.map(
    (q: any, index: number) => ({
      ...q,

      questionNo:
        index + 1,

      correctOption:
        q.correct_option,

      subTopic:
        q.sub_topic,

      completed: true,
    })
  );

setQuestions(
  formattedQuestions
);

      }

    } catch (error) {
      console.log(error);
    }
  };

  if (!testData)
    return null;

  const handleSaveQuestions = async () => {

  try {

    const existingQuestions =
      questions.filter(
        (q: any) => q.id
      );

    const newQuestions =
      questions.filter(
        (q: any) => !q.id
      );

    // UPDATE OLD QUESTIONS

    await Promise.all(

      existingQuestions.map(
        async (question: any) => {

          const payload = {

            question:
              question.question,

            option1:
              question.option1,

            option2:
              question.option2,

            option3:
              question.option3,

            option4:
              question.option4,

            correct_option:
              question.correctOption ||
              question.correct_option,

            explanation:
              question.explanation,

            difficulty:
              question.difficulty,

            topic:
              question.topic || "",

            sub_topic:
              question.subTopic ||
              question.sub_topic ||
              "",
          };

          return updateQuestion(
            question.id,
            payload
          );
        }
      )
    );

    // CREATE NEW QUESTIONS

    if (newQuestions.length > 0) {

      const payload = {

        questions:
          newQuestions.map(
            (question: any) => ({

              type: "mcq",

              subject:
                testData.subject,

              question:
                question.question,

              option1:
                question.option1,

              option2:
                question.option2,

              option3:
                question.option3,

              option4:
                question.option4,

              correct_option:
                question.correctOption,

              explanation:
                question.explanation,

              difficulty:
                question.difficulty,

              topic:
                question.topic,

              sub_topic:
                question.subTopic,

              test_id:
                testId,
            })
          ),
      };

      await createQuestionsBulk(
        payload
      );
    }

    await loadTest();
    setTestData((prev:any) => ({
  ...prev,
  total_questions:
    questions.length
}));

    alert(
      "Updated Successfully"
    );

  } catch (error: any) {

    console.log(
      error.response?.data
    );

    console.log(error);
  }
};

  return (

    <div className="edit-page">

      <button
        className="edit-test-btn"
        onClick={() =>
          setShowTestModal(true)
        }
      >
        Edit Test Form Details
      </button>

      <TestSummaryCard
        testData={testData}
        showEdit={false}
      />
      <br/>

      <QuestionForm
        currentQuestion={
          questions[
            currentQuestionIndex
          ]
        }
        totalQuestions={
          questions.length
        }
        questions={questions}
        setQuestions={setQuestions}
        currentQuestionIndex={
          currentQuestionIndex
        }
        setCurrentQuestionIndex={
          setCurrentQuestionIndex
        }
        testData={testData}
        isEditMode={true}
        handlePublish={
          handleSaveQuestions
        }
      />

      {
        showTestModal && (
          <EditTestModal
            testData={testData}
            onClose={() =>
              setShowTestModal(false)
            }
            onUpdated={loadTest}
          />
        )
      }

    </div>
);
};

export default EditTest;