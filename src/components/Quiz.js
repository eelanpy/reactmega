import React, { useState } from "react";
import "../styles/QuizTable.css";
import answers from "../dataFiles/answers.json";
import  '../styles/QuizTable.css'

export default function Quiz() {
  const [examStarted, setExamStarted] = useState(false);
  const [examDetails, setExamDetails] = useState({
    examName: "",
    examType: "",
    examYear: "",
    userName: "",
  });
  
  // Example options (Modify as needed)
  const examNames = ["Thales", "Euler"];
  const examTypes = ["Prepatory", "Contest"];
  const examYears = ["2014", "2016", "2017", "2018", "2019", "2020" , "2021", "2022", "2023"];

  const handleInputChange = (e) => {
    setExamDetails({ ...examDetails, [e.target.name]: e.target.value });
  };

  const startExam = () => {
    if (!examDetails.examName || !examDetails.examType || !examDetails.examYear || !examDetails.userName) {
      alert("Please fill in all exam details before starting.");
      return;
    }
    setExamStarted(true);
  };

  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [count, setCount] = useState(0);

  const examFullName = `${examDetails.examName}-${examDetails.examType}-${examDetails.examYear}`;
  
  const quizData = answers[examFullName] ? answers[examFullName] : [];

  const handleChange = (number, value) => {
    setUserAnswers({ ...userAnswers, [number]: value });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    let correctCount = 0;
    quizData.forEach(({ number, answer }) => {
      userAnswers[number] = userAnswers[number] ? userAnswers[number] : "-"
      console.log(userAnswers);
      if (userAnswers[number] === answer) {
        correctCount++;
      }
    });
    var d = new Date();
    d.setSeconds(0, 0);
    d.toISOString();
    let id = examDetails.userName.toLowerCase() + "-" + d.toISOString();
    id = id.toLowerCase();
    console.log(id);
    setCount(correctCount);
    const percentage = Math.round(count/Object.keys(userAnswers).length * 100)
    putData(id, userAnswers, `${examDetails.examName.toLowerCase()}_${examDetails.examType.toLowerCase()}`,examDetails.examYear,  percentage)

  };
  function putData(id, answers, exam_name, exam_year, percentage) {
    var raw = JSON.stringify({
      operation: "create",
      payload: {
        Item: {
          id: id,
          answers: answers,
          dt: id.split("-").splice(1).join("-"),
          exam_name: exam_name,
          exam_year: `${String(exam_year)}`,
          mark: `${String(percentage)}%`,
          student: id.split("-")[0],
        },
      },
    });
  
    var requestOptions = {
      method: "POST",
      body: raw,
      redirect: "follow",
      mode: "no-cors",
    };
  
    fetch(
      "https://zyxzfxyw48.execute-api.us-east-2.amazonaws.com/test",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }
  return (
    // <div className="p-6 exam-div" style={{alignItems: "center", justifyContent: "center"}}>
    <>
      <div className="exam-info">
        <h2 className="text-xl font-bold mb-4" style={{marginTop: "2rem", marginBottom: "2rem"}}>Enter Exam Details</h2>

        {/* Dropdown for Exam Name */}
        <select name="examName" value={examDetails.examName} onChange={handleInputChange} className="input-field">
          <option value="">Select Exam Name</option>
          {examNames.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>

        {/* Dropdown for Exam Type */}
        <select name="examType" value={examDetails.examType} onChange={handleInputChange} className="input-field">
          <option value="">Select Exam Type</option>
          {examTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        {/* Dropdown for Exam Year */}
        <select name="examYear" value={examDetails.examYear} onChange={handleInputChange} className="input-field">
          <option value="">Select Exam Year</option>
          {examYears.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        {/* Input for User Name */}
        <input
          type="text"
          name="userName"
          placeholder="Your Name"
          value={examDetails.userName}
          onChange={handleInputChange}
          className="input-field user-name"
          style={{textAlign: "left"}}
        />

        {/* Start Exam Button */}
        <button onClick={startExam} className="start-button" disabled={!examDetails.examName || !examDetails.examType || !examDetails.examYear || !examDetails.userName || examStarted}>
          Start Exam
        </button>
      </div>

      <h2 className="text-xl font-bold mb-4" style={{margin: "2rem"}}>{examFullName}</h2>

      {/* Quiz Table */}
      {examStarted && quizData.length > 0 && (
        <table className="w-full border-collapse border border-gray-300 quiz-table" style={{alignItems: "center", justifyContent: "center"}}>
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2" style={{textAlign: "left"}}>Question:</th>
              <th className="border border-gray-300 p-2" style={{textAlign: "left"}}>Options:</th>            </tr>
          </thead>
          <tbody>
            {quizData.map(({ number, options, answer }) => (
              <tr key={number} className="border border-gray-300">
                <td className="border border-gray-300 text-center number-td">{number}</td>
                <td className="border border-gray-300 p-2">
                  {options.map((option) => (
                    <label key={option} className="inline-flex items-center mr-4" style={{ margin: "1rem" }}>
                      <span
                        className={`${
                          submitted && option === answer && userAnswers[number] !== answer
                            ? "text-green-600 font-bold"
                            : submitted && userAnswers[number] !== answer && userAnswers[number] === option
                            ? "text-red-600 font-bold"
                            : ""
                        }`}
                        style={{ margin: "0.5rem" }}
                      >
                        {option}
                      </span>
                      <input
                        type="radio"
                        name={`question-${number}`}
                        value={option}
                        onChange={() => handleChange(number, option)}
                        disabled={submitted}
                        checked={userAnswers[number] === option}
                        className={`mr-2 ${
                          submitted && userAnswers[number] !== answer && userAnswers[number] === option
                            ? "opacity-100"
                            : ""
                        }`}
                      />
                    </label>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Submit Button */}
      {examStarted && (
        <button onClick={handleSubmit} disabled={submitted} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 submit-btn">
          Submit
        </button>
      )}

      {/* Results Section */}
      {submitted && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Results</h2>
          <h2>{Math.round((count / quizData.length) * 100)}%<br/><br/> {count} / {quizData.length}</h2>

          <table className="w-full border-collapse border border-gray-300 result-table">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Question:</th>
                <th className="border border-gray-300 p-2">Your Answer:</th>
                <th className="border border-gray-300 p-2">Correct Answer:</th>
              </tr>
            </thead>
            <tbody>
              {quizData.map(({ number, answer }) => (
                <tr key={number} className="border border-gray-300">
                  <td className="border border-gray-300 p-2 text-center" style={{width: "1%"}}>{number}</td>
                  <td className={`border border-gray-300 p-2 text-center ${userAnswers[number] !== answer ? "bg-red-600" : "bg-green-600"}`}>
                    {userAnswers[number] ?? "-"}
                  </td>
                  <td className="border border-gray-300" style={{textAlign: "center"}}>
                    {answer}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button  onClick={playAgain} style={{margin: "2rem auto"}} disabled={submitted == true ? false : true}>{count/quizData.length * 100 <= 50 ? "Try Again" : "Try Another Quiz"}</button>
        </div>
      )}
    </>
  );
}

function playAgain(e) {
  window.location.reload();
}
