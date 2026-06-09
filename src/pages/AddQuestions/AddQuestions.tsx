import TestSummaryCard from "../../components/QuestionCreation/TestSummaryCard/TestSummaryCard";
import QuestionForm from "../../components/QuestionCreation/QuestionForm/QuestionForm";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTestById } from '../../services/detailTestService';
import "./AddQuestions.css";
import { useOutletContext } from "react-router-dom";
import { createQuestionsBulk } from "../../services/questionService";
import { parseQuestionCsv } from "../../utils/parseQuestionCsv";

const AddQuestions = () => {
    const { testId } = useParams();
    const [testData, setTestData] = useState<any>(null);
    const {questions, setQuestions, currentQuestionIndex, setCurrentQuestionIndex} = useOutletContext<any>();
    const navigate = useNavigate();

    useEffect(() => {
        fetchTest();
    }, []);

    const fetchTest = async () => {
        try {
            const data = await getTestById(testId!);
            console.log(
      "TEST DATA",
      data
    );
            setTestData(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!testData) return;

        const generatedQuestions = Array.from(
            { length: testData.total_questions },
            (_, index) => ({
            questionNo: index + 1,
            type: "mcq",
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
            })
        );

        setQuestions(generatedQuestions);
    }, [testData]);

    const handlePublish = async () => {
        const payload = {
            questions: questions.map((q: any) => ({
                type: q.type,

                subject: testData.subject,

                question: q.question,

                option1: q.option1,
                option2: q.option2,
                option3: q.option3,
                option4: q.option4,

                correct_option: q.correctOption,

                explanation: q.explanation,

                difficulty:
                q.difficulty ||
                testData.difficulty,

                topic:
                q.topic ||
                testData.topics?.[0],

                sub_topic:
                q.subTopic ||
                testData.sub_topics?.[0],

                test_id: testId,
            })),
        };

        console.log("FINAL QUESTIONS PAYLOAD", payload);

        try {
            const result = await createQuestionsBulk(payload);
            console.log("QUESTIONS CREATED", result);
            navigate(`/confirm-test/${testId}`);
        } catch (error: any) {
            console.log(
                "ERROR RESPONSE",
                error.response?.data
            );

            console.log(error);
            }
    };

    const handleCsvUpload = async (
  file: File
) => {

  try {

    const parsedQuestions =
      await parseQuestionCsv(file);

    const validatedQuestions =
      parsedQuestions.map(
        (question, index) => ({
          ...question,

          questionNo: index + 1,

          topic:
            testData?.topics?.[0] || "",

          subTopic:
            testData?.sub_topics?.[0] || "",

          difficulty:
            ["easy", "medium", "hard"]
              .includes(
                question.difficulty?.toLowerCase()
              )
              ? question.difficulty
              : testData?.difficulty,

          completed: true,
        })
      );

    // 👇 ADD VALIDATION HERE

    const invalidQuestion =
      validatedQuestions.find(
        (q) =>
          !q.question ||
          !q.option1 ||
          !q.option2 ||
          !q.option3 ||
          !q.option4 ||
          !q.correctOption
      );

    if (invalidQuestion) {

      alert(
        `Question ${invalidQuestion.questionNo} is missing required fields`
      );

      return;
    }

    const invalidCorrectOption =
      validatedQuestions.find(
        (q) =>
          ![
            "option1",
            "option2",
            "option3",
            "option4",
          ].includes(
            q.correctOption
          )
      );

    if (invalidCorrectOption) {

      alert(
        `Question ${invalidCorrectOption.questionNo} has invalid correctOption`
      );

      return;
    }

    if (
      validatedQuestions.length >
      testData.total_questions
    ) {

      alert(
        `CSV contains ${validatedQuestions.length} questions but test allows only ${testData.total_questions}`
      );

      return;
    }

    // 👇 ONLY REACH HERE IF EVERYTHING IS VALID

    setQuestions(
      validatedQuestions
    );

    setCurrentQuestionIndex(
      0
    );

    alert(
      `${validatedQuestions.length} questions imported successfully`
    );

  } catch (error) {

    console.log(error);

    alert(
      "Invalid CSV file"
    );

  }
};

    return (
        <div className="question-page">
            <div className="page-top-bar">
                <div className="breadcrumb">
                    Test Creation
                    <span>/</span>
                    Create Test
                    <span>/</span>

                    {testData?.type === "chapterwise"
                        ? "Chapter Wise"
                        : testData?.type === "pyq"
                        ? "PYQ"
                        : "Mock Test"}
                </div>
                <button className="publish-btn" onClick={handlePublish}>Publish</button>
            </div>
            <TestSummaryCard testData={testData} onUpdated={fetchTest}/>
            <div className="question-layout">
                <QuestionForm
                    currentQuestion={
                        questions[currentQuestionIndex]
                    }

                    totalQuestions={questions.length}

                    questions={questions}

                    setQuestions={setQuestions}

                    currentQuestionIndex={
                        currentQuestionIndex
                    }

                    setCurrentQuestionIndex={
                        setCurrentQuestionIndex
                    }

                    testData={testData}
                    handlePublish={handlePublish}
                     handleCsvUpload={handleCsvUpload}
                />
            </div>
        </div>
    );
};

export default AddQuestions;