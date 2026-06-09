export interface Question {
  questionNo: number;
  type: string;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctOption: string;
  explanation: string;
  difficulty: string;
  topic: string;
  subTopic: string;
  mediaUrl: string;
  completed: boolean;
}