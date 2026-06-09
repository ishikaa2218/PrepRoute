import { X } from "lucide-react";
import { useEffect, useState } from "react";
import "./EditTestModal.css";
import { updateTest } from "../../services/testService";
import { getSubjects } from "../../services/subjectService";
import { getTopicsBySubject } from "../../services/topicService";
import { getSubTopicsByTopic } from "../../services/subTopicService";

type Props = {testData: any; onClose: () => void; onUpdated?: () => void;};

const EditTestModal = ({testData, onClose, onUpdated}: Props) => {
  const [testType, setTestType] = useState(testData?.type || "chapterwise");
  const [subjects, setSubjects] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [subTopics, setSubTopics] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: testData?.name || "",
    subject: testData?.subject || "",
    topic: testData?.topics?.[0] || "",
    subTopic: testData?.sub_topics?.[0] || "",
    duration: testData?.total_time || "",
    difficulty: testData?.difficulty || "easy",
    wrongMarks: testData?.wrong_marks || -1,
    unattemptedMarks: testData?.unattempt_marks || 0,
    correctMarks: testData?.correct_marks || 5,
    totalQuestions: testData?.total_questions || "",
    totalMarks: testData?.total_marks || "",
  });

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
    setFormData({...formData, subject: subjectId, topic: "", subTopic: ""});

    try {
      const topicData = await getTopicsBySubject(subjectId);
      setTopics(topicData);
      setSubTopics([]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTopics = async () => {
    try {
      const topicData = await getTopicsBySubject(formData.subject);
      setTopics(topicData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubTopics = async () => {
    try {
      const subTopicData = await getSubTopicsByTopic(formData.topic);
      setSubTopics(subTopicData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (!formData.subject) return;
    fetchTopics();
  }, [formData.subject]);

  useEffect(() => {
    if (!formData.topic) return;
    fetchSubTopics();
  }, [formData.topic]);

  useEffect(() => {
    const marks = Number(formData.correctMarks) * Number(formData.totalQuestions);
    setFormData((prev) => ({...prev, totalMarks: marks}));
  }, [formData.correctMarks, formData.totalQuestions]);

  useEffect(() => {
    if (!subjects.length || !testData)
      return;

    const selectedSubject = subjects.find((s: any) => s.name === testData.subject);

    if (selectedSubject) {
      setFormData(prev => ({...prev, subject: selectedSubject.id}));
    }
  }, [subjects, testData]);

  useEffect(() => {
    if (!topics.length || !testData)
      return;

    const selectedTopic = topics.find((t: any) => t.name === testData.topics?.[0]);

    if (selectedTopic) {
      setFormData(prev => ({...prev, topic: selectedTopic.id}));
    }
  }, [topics, testData]);

  useEffect(() => {
    if (!subTopics.length || !testData)
      return;

    const selectedSubTopic = subTopics.find((s: any) => s.name === testData.sub_topics?.[0]);

    if (selectedSubTopic) {
      setFormData(prev => ({...prev, subTopic: selectedSubTopic.id}));
    }
  }, [subTopics, testData]);

  const handleSave = async () => {
    try {
      const payload = {
        name: formData.name,
        type: testType,
        subject: formData.subject,
        topics: [formData.topic],
        sub_topics: [formData.subTopic],
        difficulty: formData.difficulty,
        correct_marks: Number(formData.correctMarks),
        wrong_marks: Number(formData.wrongMarks),
        unattempt_marks: Number(formData.unattemptedMarks),
        total_time: Number(formData.duration),
        total_questions: Number(formData.totalQuestions),
        total_marks: Number(formData.totalMarks)
      };

      console.log("UPDATE PAYLOAD", payload);

      await updateTest(testData.id, payload);

      onUpdated?.();
      onClose();
    } catch (error: any) {
      console.log(
        error.response?.data
      );
    }
  };

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal">
        <div className="modal-header">
          <h4>Edit Test Creation</h4>
          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
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
            <label>Subject</label>
            <select className="custom-input" value={formData.subject} onChange={handleSubjectChange}>
              <option value="">Select Subject</option>
              {subjects.map((subject: any) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-lg-6">
            <label>Name of Test</label>
            <input type="text" className="custom-input" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value,})} />
          </div>
          <div className="col-lg-6">
            <label>Topic</label>
            <select className="custom-input" value={formData.topic} onChange={async (e) => {
                const topicId = e.target.value;
                setFormData({...formData, topic: topicId, subTopic: ""});
                const subTopicData = await getSubTopicsByTopic(topicId);
                setSubTopics(subTopicData);
              }}
            >
              <option value="">Select Topic</option>

              {topics.map((topic: any) => (
                <option key={topic.id} value={topic.id}>
                  {topic.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-lg-6">
            <label>Sub Topic</label>
            <select
              className="custom-input"
              value={formData.subTopic}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  subTopic:
                    e.target.value
                })
              }
            >
              <option value="">
                Select Sub Topic
              </option>

              {subTopics.map((item: any) => (
                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-lg-6">
            <label>Duration (Minutes)</label>
            <input
              type="number"
              className="custom-input"
              value={formData.duration}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  duration: e.target.value,
                })
              }
            />
          </div>

          <div className="col-lg-6">

            <label>
              Test Difficulty Level
            </label>

            <div className="difficulty-options">

              <label>
                <input
                  type="radio"
                  name="difficulty"
                  value="easy"
                  checked={
                    formData.difficulty === "easy"
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      difficulty: e.target.value
                    })
                  }
                />
                Easy
              </label>

              <label>
                <input
                  type="radio"
                  name="difficulty"
                  value="medium"
                  checked={
                    formData.difficulty === "medium"
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      difficulty: e.target.value
                    })
                  }
                />
                Medium
              </label>

              <label>
                <input
                  type="radio"
                  name="difficulty"
                  value="hard"
                  checked={
                    formData.difficulty === "hard"
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      difficulty: e.target.value
                    })
                  }
                />
                Difficult
              </label>

            </div>

          </div>

        </div>

        {/* Marking Scheme */}

        <div className="marking-section">

          <h6>
            Marking Scheme:
          </h6>

          <div className="row g-4">

            <div className="col-md-2">
              <label>
                Wrong Answer
              </label>

              <input
                type="number"
                className="custom-input"
                value={formData.wrongMarks}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    wrongMarks:
                      Number(e.target.value)
                  })
                }
              />
            </div>

            <div className="col-md-2">
              <label>
                Unattempted
              </label>

              <input
                type="number"
                className="custom-input"
                value={formData.unattemptedMarks} onChange={(e) =>
                  setFormData({
                    ...formData,
                    unattemptedMarks:
                      Number(e.target.value)
                  })
                }
              />
            </div>

            <div className="col-md-2">
              <label>
                Correct Answer
              </label>

              <input
                type="number"
                className="custom-input"
                value={formData.correctMarks} onChange={(e) =>
                  setFormData({
                    ...formData,
                    correctMarks:
                      Number(e.target.value)
                  })
                }
              />
            </div>

            <div className="col-md-3">
              <label>
                No of Questions
              </label>

              <input
                type="number"
                className="custom-input"
                value={formData.totalQuestions} onChange={(e) =>
                  setFormData({
                    ...formData,
                    totalQuestions:
                      Number(e.target.value)
                  })
                }
              />
            </div>

            <div className="col-md-3">
              <label>
                Total Marks
              </label>

              <input
                type="number"
                className="custom-input"
                value={formData.totalMarks}
                disabled
              />
            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="modal-footer">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button className="save-btn" onClick={handleSave}>
            Save
          </button>

        </div>

      </div>

    </div>
  );
};

export default EditTestModal;