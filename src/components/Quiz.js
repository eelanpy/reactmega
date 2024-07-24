import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Radio from "@mui/material/Radio";
import "bootstrap-icons/font/bootstrap-icons.css";
import answers from "../dataFiles/answers.json";

//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Radio
import React from "react";
import ReactDOM from "react-dom";
import { Controller, useForm } from "react-hook-form";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/mathematica.css";

import { useState, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

import { Button } from "react-bootstrap";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var dataToJson = {};

console.log(answers);

function createRows(exam, examType, year) {
  try {
    const numberOfQns = Object.keys(
      answers[
        `${capitalizeFirstLetter(exam)}-${capitalizeFirstLetter(
          examType
        )}-${String(year)}`
      ]
    ).length;
    const rows = [];
    var idCounter = 1;
    for (let i = 0; i < numberOfQns; i++) {
      const row = {
        id: idCounter,
        name: `${String(idCounter)}`,
        label: `${String(idCounter)}`,
      };
      idCounter = idCounter + 1;
      rows.push(row);
    }
    return rows;
  } catch {
    return [];
  }
}

const cols = [
  { id: 1, name: "A", label: "A" },
  { id: 2, name: "B", label: "B" },
  { id: 3, name: "C", label: "C" },
  { id: 4, name: "D", label: "D" },
  { id: 5, name: "E", label: "E" },
];

function checkAnswer(submittedData, correctAnswers, props) {
  //

  function generateCorrectAnswers(answers) {
    var correctQuestions = {};
    for (let i = 0; i < Object.keys(answers).length; i++) {
      correctQuestions[i + 1] = "IC";
    }
    return correctQuestions;
  }

  const correctQuestions = generateCorrectAnswers(correctAnswers);
  var mark = 0;
  console.log(props);
  // function generateQuestions(correctAnswers) {
  //   const correctQuestions = {};
  //   for(let i = 0; )
  // }

  for (let i of Object.keys(submittedData)) {
    if (submittedData[i] == correctAnswers[i]) {
      mark++;
      console.log(i);
      correctQuestions[i] = "C";
    }
  }
  console.log(correctQuestions);

  var d = new Date();
  d.setSeconds(0, 0);
  d.toISOString();
  const nOfQuestions = Object.keys(correctQuestions).length;
  const percentage = parseInt(Math.round((mark / nOfQuestions) * 100));

  console.log(percentage);
  console.log(typeof props);
  return {
    mark: mark,
    correctQuestions: correctQuestions,
    percentage: percentage,
  };
}

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

function Quiz(props) {
  let correctAnswers;
  try {
    correctAnswers =
      answers[
        `${capitalizeFirstLetter(props.exam)}-${capitalizeFirstLetter(
          props.examType
        )}-${String(props.year)}`
      ];
  } catch {
    correctAnswers = {};
  }
  var numberOfQns = 0;
  try {
    numberOfQns = Object.keys(
      answers[
        `${capitalizeFirstLetter(props.exam)}-${capitalizeFirstLetter(
          props.examType
        )}-${String(props.year)}`
      ]
    ).length;
  } catch {
    numberOfQns = 0;
  }

  const [correctQs, setCorrectQs] = useState([]);
  const [mark, setMark] = useState(0);
  const [quizDone, setDoneQuiz] = useState(false);

  const { control, handleSubmit } = useForm();
  const location = useLocation();

  useLayoutEffect(() => {
    if (quizDone == true) {
      window.scroll(0, 0);
    }
  }, [location.pathname]);

  const onSubmit = (data) => {
    console.log(data);
    setMark(checkAnswer(data, correctAnswers, props).mark);

    setCorrectQs(checkAnswer(data, correctAnswers, props).correctQuestions);
    setDoneQuiz(true);
    checkAnswer(data, correctAnswers, props);
    var d = new Date();
    d.setSeconds(0, 0);
    d.toISOString();

    let id = props.student.toLowerCase() + "-" + d.toISOString();
    id = id.toLowerCase();
    console.log(id);
    putData(
      id,
      checkAnswer(data, correctAnswers, props).correctQuestions,
      `${props.exam.toLowerCase()}_${props.examType.toLowerCase()}`,
      props.year,
      checkAnswer(data, correctAnswers, props).percentage
    );
  };

  const columns = [...cols, { id: 1, name: "?", label: "?" }];

  const rows = createRows(props.exam, props.examType, props.year);
  return (
    <div
      className="App"
      style={{
        visibility: props.quizStarted == true ? "visible" : "hidden",
        paddingTop: 0,
      }}
    >
      <div class="input-group  w-25 m-0 m-auto">
        <span class="input-group-text" id="inputGroup-sizing-default">
          Student:
        </span>
        <input
          type="text"
          className="form-control bg-white w-25  text-start"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          readOnly
          value={props.student}
        />
      </div>

      <form action="#retr" onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <Table id="quiz">
          <TableHead>
            <TableRow>
              <TableCell />
              {columns.map(({ id, label }) => (
                <TableCell
                  key={id}
                  align="center"
                  style={{ color: "#0074d9", fontSize: "1.5rem" }}
                >
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(({ id, name, label }) => (
              <TableRow key={id}>
                <TableCell style={{ fontSize: "1.5rem", background: "#eee" }}>
                  {label}
                </TableCell>
                <Controller
                  name={name}
                  control={control}
                  render={({ field: { value, ...field } }) =>
                    columns.map(({ id, name: optionName }) => (
                      <TableCell key={id}>
                        <Radio
                          {...field}
                          className="quiz-radio"
                          checked={value === optionName}
                          value={optionName}
                          style={{
                            color:
                              quizDone == false || value !== optionName
                                ? "#17a2b8"
                                : correctAnswers[label] == optionName
                                ? "green"
                                : "red",
                          }}
                          disabled={quizDone !== true ? false : true}
                        />
                      </TableCell>
                    ))
                  }
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <input
          type="submit"
          id="submit"
          disabled={quizDone !== true ? false : true}
        />
      </form>
      <h1 style={{ display: quizDone !== true ? "none" : "inline" }}>
        Marks: {mark}/{numberOfQns} <br />
        <Button
          onClick={playAgain}
          variant="primary "
          className="btn quiz-again-btn"
        >
          Retry Quiz <i class="bi bi-arrow-clockwise"></i>
        </Button>
      </h1>
    </div>
  );
}

function playAgain(e) {
  window.location.reload();
}

export default Quiz;
