import { useEffect, useState } from "react";
import "./CreateTestForm.css";
import { getSubjects } from "../../services/subjectService";
import { getTopicsBySubject } from "../../services/topicService";
import { getSubTopicsByTopic } from "../../services/subTopicService";
import { createTest } from "../../services/testService";
import { useNavigate } from "react-router-dom";

const CreateTestForm = () => {
  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);
  const [subTopics, setSubTopics] = useState([]);
  const [testType, setTestType] = useState("chapterwise");
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    topics: [] as string[],
    subTopics: [] as string[],
    duration: "",
    difficulty: "easy",
    correctMarks: 5,
    wrongMarks: -1,
    unattemptedMarks: 0,
    totalQuestions: "",
    totalMarks: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    const marks = Number(formData.correctMarks) * Number(formData.totalQuestions);
    setFormData((prev) => ({...prev, totalMarks: marks}));
  }, [formData.correctMarks, formData.totalQuestions]);

  const fetchSubjects = async () => {
    try {
      const data = await getSubjects();
      setSubjects(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubjectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const subjectId = e.target.value;
    setFormData({
      ...formData,
      subject: subjectId,
      topics: [],
      subTopics: []
    });

    const topicData = await getTopicsBySubject(subjectId);
    setTopics(topicData);
    setSubTopics([]);
  };

  const handleNext = async () => {
    const payload = {
      name: formData.name,
      type: testType,
      subject: formData.subject,
      topics: formData.topics.filter(Boolean),
      sub_topics: formData.subTopics.filter(Boolean),
      correct_marks: formData.correctMarks,
      wrong_marks: formData.wrongMarks,
      unattempt_marks: formData.unattemptedMarks,
      difficulty: formData.difficulty,
      total_time: Number(formData.duration),
      total_marks: Number(formData.totalMarks),
      total_questions: Number(formData.totalQuestions),
      status: 'draft'
    };

    try {
      //console.log("PAYLOAD:", payload);
      const response = await createTest(payload);
      //console.log(response);
      const testId = response.data.id;

      localStorage.setItem("testId", testId);
      navigate(`/add-questions/${testId}`);

      //console.log(testId)
    } catch (error: any) {
        console.log("BACKEND ERROR", JSON.stringify(error.response?.data, null, 2));
    }
  };

  const getTestTypeLabel = () => {
    switch (testType) {
      case "chapterwise":
        return "Chapter Wise";
      case "pyq":
        return "PYQ";
      case "mocktest":
        return "Mock Test";
      default:
        return "Chapter Wise";
    }
  };

  return (
    <div className="test-form-container">
      <div className="breadcrumb-wrapper">
        <span>Test Creation</span>
        <span>/</span>
        <span>Create Test</span>
        <span>/</span>
        <span>{getTestTypeLabel()}</span>
      </div>
      <div className="tab-wrapper">
          <button className={testType === "chapterwise" ? "active-tab" : ""} onClick={() => setTestType("chapterwise")}>
            Chapter Wise
          </button>
          <button className={testType === "pyq" ? "active-tab" : ""} onClick={() => setTestType("pyq")}>
            PYQ
          </button>
          <button className={testType === "mocktest" ? "active-tab" : ""} onClick={() => setTestType("mocktest")}>
            Mock Test
          </button>
      </div>
      <div className="row g-4">
        <div className="col-lg-6">
          <div className="form-group">
            <label>Subject</label>
            <select className="custom-input" name="subject" value={formData.subject} onChange={handleSubjectChange}>
              <option value="">
                Select Subject
              </option>
              {subjects.map((subject: any) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group">
            <label>Name of Test</label>
            <input type="text" className="custom-input" placeholder="Enter name of Test" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}/>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group">
            <label>Topic</label>
            <select multiple className="custom-input multi-select" value={formData.topics} onChange={async (e) => {
                const selectedTopics = Array.from(e.target.selectedOptions,option => option.value);
                setFormData({...formData, topics: selectedTopics});

                if (selectedTopics.length > 0) {
                  const subTopicPromises = selectedTopics.map((id) => getSubTopicsByTopic(id));
                  const results = await Promise.all(subTopicPromises);
                  const mergedSubTopics:any = results.flat();
                  setSubTopics(mergedSubTopics);
                }
              }}
            >
              {topics.map((topic: any) => (
                <option key={topic.id} value={topic.id}>
                  {topic.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group">
            <label>Sub Topic</label>
            <select multiple className="custom-input multi-select" value={formData.subTopics} onChange={(e) => {
                const selectedSubTopics = Array.from(e.target.selectedOptions, option => option.value);
                setFormData({...formData, subTopics: selectedSubTopics});
              }}
            >
              {subTopics.map((subTopic: any) => (
                <option key={subTopic.id} value={subTopic.id}>
                  {subTopic.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group">
            <label>Duration (Minutes)</label>
            <input type="number" className="custom-input" placeholder="Enter the time" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})}/>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group">
            <label>Test Difficulty Level</label>
            <div className="difficulty-options">
              <label className="radio-item">
                <input type="radio" name="difficulty" value="easy" checked={formData.difficulty === "easy"} onChange={(e) => setFormData({...formData, difficulty: e.target.value})}/>
                Easy
              </label>
              <label className="radio-item">
                <input type="radio" name="difficulty" value="medium" checked={formData.difficulty === "medium"} onChange={(e) => setFormData({...formData, difficulty: e.target.value})}/>
                Medium
              </label>
              <label className="radio-item">
                <input type="radio" name="difficulty" value="hard" checked={formData.difficulty === "hard"} onChange={(e) => setFormData({...formData, difficulty: e.target.value})}/>
                Difficult
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="marking-section">
        <h6 className="marking-heading">Marking Scheme:</h6>
        <div className="row">
          <div className="col-lg-6">
            <div className="row g-4">
              <div className="col-md-4">
                <div className="form-group">
                  <label>Wrong Answer</label>
                  <input type="number" className="custom-input" value={formData.wrongMarks} onChange={(e) => setFormData({...formData, wrongMarks: Number(e.target.value)})}/>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Unattempted</label>
                  <input type="number" className="custom-input" value={formData.unattemptedMarks} onChange={(e) => setFormData({...formData, unattemptedMarks: Number(e.target.value)})}/>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Correct Answer</label>
                  <input type="number" className="custom-input" value={formData.correctMarks} onChange={(e) => setFormData({...formData, correctMarks: Number(e.target.value)})}/>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="row g-4">
              <div className="col-md-6">
                <div className="form-group">
                  <label>No of Questions</label>
                  <input type="number" className="custom-input" placeholder="Ex:50" value={formData.totalQuestions} onChange={(e) => setFormData({...formData, totalQuestions: e.target.value})}/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="disabled-label">
                    Total Marks
                  </label>
                  <input type="text" className="custom-input" placeholder="Ex:250 Marks" value={formData.totalMarks} disabled/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-btns">
        <button className="cancel-btn">Cancel</button>
        <button className="next-btn" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default CreateTestForm;