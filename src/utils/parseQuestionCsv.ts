import Papa from "papaparse";

export const parseQuestionCsv = (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const questions = results.data.map((row: any, index: number) => ({
                questionNo: index + 1,
                type: "mcq",
                question: row.question || "",
                option1: row.option1 || "",
                option2: row.option2 || "",
                option3: row.option3 || "",
                option4: row.option4 || "",
                correctOption: row.correctOption || "",
                explanation: row.explanation || "",
                difficulty: row.difficulty || "",
                //topic: row.topic || "",
                //subTopic: row.subTopic || "",
                mediaUrl: "",
                completed: true,
              })
            );

          resolve(questions);
        },

        error: reject,
      });
    }
  );
};