import { Dropdown } from "react-bootstrap";
import { useState } from "react";

import Quiz from "./Quiz";
import DashboardMathematica from "./DashboardMathematica";
import "../styles/mathematica.css";
import "bootstrap/dist/css/bootstrap.min.css";
function MathematicaTestOnline() {
  document.title = "Mathematica";

  const [student, setStudent] = useState("");
  const [exam, setExam] = useState("Exam Name:");
  const [examType, setExamType] = useState("Exam Type:");
  const [year, setYear] = useState("Year:");
  const [quizStarted, setQuizStarted] = useState(false);
  const [studentEntered, setStudentEntered] = useState(false);

  function studentEvent(e) {
    console.log(e);
    if (e.key == "Enter") {
      e.preventDefault();
      setStudentEntered(true);
      console.log(studentEntered);
    }
  }

  const exams = {
    Thales: { gr: 3, Contest: 30 },
    Euler: { gr: 7, Contest: 40 },
  };

  function submittedForm(e) {
    e.preventDefault();
    if (
      exam !== "Exam Name:" &&
      examType !== "Exam Type:" &&
      year !== "Year:" &&
      student !== ""
    ) {
      setQuizStarted(true);
    } else {
      setQuizStarted(false);
    }
  }
  return (
    <div className="mt-5">
      <h2 style={{ textDecoration: "underline" }} className="text-primary mb-4">
        <strong>
          {quizStarted == true
            ? `${exam} GR${exams[exam]["gr"]} ${examType} - ${year}`
            : "Mathematica Centrum Test - Online Test"}
        </strong>
      </h2>
      <h3
        className={quizStarted == false ? "mt-5 mb-5 text-primary" : "m-0"}
        style={{ display: quizStarted == true ? "none" : "" }}
      >
        {" "}
        <strong style={{ textDecoration: "underline" }}>
          Instructions:
        </strong>{" "}
        Pick an Exam you would want to practice:{" "}
      </h3>
      <input
        style={{
          display: quizStarted == true ? "none" : "inline",
          width: "15%",
          textAlign: "left",
        }}
        placeholder="Student Name:"
        className="form-control mr-2 "
        value={student}
        onChange={(e) => {
          setStudent(e.target.value);
        }}
        onKeyDown={(e) => {
          studentEvent(e);
        }}
      />
      {/* <DashboardQuiz student={student}/> */}

      <Dropdown
        style={{
          display:
            quizStarted == true || studentEntered == false ? "none" : "inline",
        }}
        className="mr-2"
      >
        <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
          {year}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {[2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023].map(
            (examYear, idx) => (
              <Dropdown.Item
                href=""
                type="button"
                onClick={(e) => {
                  setYear(examYear);
                }}
                className="text-primary"
              >
                {examYear}
              </Dropdown.Item>
            )
          )}
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown
        style={{
          display:
            quizStarted == true || studentEntered == false ? "none" : "inline",
        }}
      >
        <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
          {exam}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {Object.keys(exams).map((exam, idx) => (
            <Dropdown.Item
              href=""
              type="button"
              onClick={(e) => {
                setExam(exam);
              }}
              key={idx}
              className="text-primary"
            >
              {exam} - GR{exams[exam]["gr"]}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown
        style={{
          display:
            quizStarted == true || studentEntered == false ? "none" : "inline",
        }}
        className="rounded-left"
      >
        <Dropdown.Toggle
          variant="outline-primary"
          id="dropdown-basic"
          className="ml-2"
        >
          {examType}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {["Contest", "Prepatory"].map((examType) => (
            <Dropdown.Item
              href=""
              type="button"
              onClick={(e) => {
                setExamType(examType);
              }}
              className="text-primary"
            >
              {examType}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <br style={{ display: quizStarted == true ? "none" : "" }} />
      <button
        type="submit"
        onClick={submittedForm}
        className={quizStarted == false ? "btn btn-outline-info mt-4" : "mt-0"}
        disabled={
          exam == "Exam Name:" ||
          year == "Year:" ||
          examType == "Exam Type:" ||
          student == ""
            ? true
            : false
        }
        style={{
          display: quizStarted == true || studentEntered == false ? "none" : "",
        }}
      >
        Start Quiz!
      </button>
      <br />

      <Quiz
        quizStarted={quizStarted}
        examType={examType}
        exam={exam}
        examDetails={exams}
        year={year}
        student={student}
      />
    </div>
  );
}

export default MathematicaTestOnline;
