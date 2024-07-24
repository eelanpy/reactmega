import { Container } from "react-bootstrap";

import { Dropdown } from "react-bootstrap";
import { useState, useEffect } from "react";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/electronics.css";
const tasks = ["TV", "Park", "iPad", "Python", "Study", "Arts & Crafts"];

function ElectronicUseTracker() {
  const [name, setName] = useState("");
  const [task, setTask] = useState("Task:");
  const [inputTask, setInputTask] = useState("");
  const [enterPressed, setEnterPressed] = useState(false);
  const [nameEnterPressed, setNameEnterPressed] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [time, setTime] = useState("");
  var nameWidth = "auto";
  function click(e) {
    setTask(e.target.innerText);
  }

  return (
    <Container>
      <div>
        <h1
          className="mt-4"
          style={({ textDecorationLine: "underline" }, { fontWeight: "bold" })}
        >
          Electronic Use Tracker:
        </h1>

        <h2 className="mt-1">This tool monitors your electronics use.</h2>
        <span
          className="d-flex justify-content-center"
          disabled={clicked == true ? true : false}
        >
          <span
            className="input-group-text"
            style={{
              borderTopRightRadius: "0",
              borderBottomRightRadius: "0",
              width: "11rem",
            }}
          >
            First and Last Name
          </span>
          <input
            type="text"
            aria-label="First & Last Name"
            className={`form-control ${name.length >= 1 ? "name-entered" : ""}`}
            value={name}
            placeholder="First and Last Name: "
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              console.log(e.key);
              // putData(e, name);

              if ((e.key === "Enter") & (name.length >= 1)) {
                setNameEnterPressed(true);
              }
            }}
            disabled={clicked}
            style={{
              textAlign: "left",
              display: "inline-block",
              borderTopLeftRadius: "0",
              borderBottomLeftRadius: "0",
              width: "11rem",
            }}
          />
          <br></br>
        </span>

        <span
          className="d-flex justify-content-center mt-2"
          disabled={clicked == true ? true : false}
        >
          <span
            className="input-group-text"
            style={{
              borderTopRightRadius: "0",
              borderBottomRightRadius: "0",
              width: "11rem",
            }}
          >
            Task:
          </span>
          <Dropdown
            disabled={clicked}
            onClick={(e) => {
              setEnterPressed(false);
            }}
            style={{
              borderTopLeftRadius: "0",
              borderBottomLeftRadius: "0",
              borderTopRightRadius: "0",
              borderBottomRightRadius: "0",
              width: "11rem",
            }}
            className={task == "Task:" ? "task-not-entered" : "task-entered"}
          >
            <Dropdown.Toggle
              variant={task === "Task:" ? "outline-info" : "info"}
              id="dropdown-basic"
              style={{
                borderTopLeftRadius: "0",
                textAlign: "left",
                borderBottomLeftRadius: "0",
                width: "11rem",
                backgroundColour: "white",
              }}
              disabled={clicked}
              className={task == "Task:" ? "task-not-entered" : "task-entered"}
            >
              {task}
            </Dropdown.Toggle>
            <Dropdown.Menu
              style={{ display: enterPressed == false ? "" : "none" }}
            >
              <input
                autoFocus={true}
                onChange={(e) => {
                  setInputTask(e.target.value);
                }}
                disabled={clicked}
                value={inputTask}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    setTask(inputTask);
                    setEnterPressed(true);
                  }
                }}
                style={{ textAlign: "left" }}
                className="mx-3 my-2 w-auto form-control text-info"
                placeholder="Type ticker to filter..."
              />
              {filter(inputTask, tasks).map((stockName) => (
                <Dropdown.Item
                  onClick={click}
                  type="button"
                  className={`${inputTask === "" ? "text-info" : "text-info"}`}
                >
                  {stockName}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </span>

        <span
          className="d-flex justify-content-center mt-2"
          disabled={clicked == true ? true : false}
        >
          <span
            className="input-group-text w-0"
            style={{
              borderTopRightRadius: "0",
              borderBottomRightRadius: "0",
              width: "11rem",
            }}
          >
            Time Spent (mins)
          </span>

          <input
            disabled={clicked}
            className={`form-control ${time.length >= 1 ? "name-entered" : ""}`}
            placeholder="Time Spent:"
            value={time}
            type="number"
            onChange={(e) => {
              setTime(e.target.value);
            }}
            style={{
              textAlign: "left",
              display: "inline-block",
              borderTopLeftRadius: "0",
              borderBottomLeftRadius: "0",
              width: "11rem",
            }}
          />
        </span>
      </div>
      <button
        className="btn btn-primary mt-2"
        disabled={
          name.length >= 1 &&
          task !== "" &&
          task !== "Task:" &&
          time.length >= 1 &&
          clicked == false
            ? false
            : true
        }
        onClick={(e) => {
          setClicked(true);
          putData(name, time, task);
        }}
      >
        Add Task!
      </button>
    </Container>
  );
}

function putData(name, timeSpent, task) {
  let currentDate = new Date();
  let formattedDate = currentDate.toISOString().split("T")[0].replace("-", "");
  formattedDate = formattedDate.replace("-", "");
  let date = currentDate.toISOString().split("T")[0];
  let time = changeTimeFormat(currentDate);

  addTask({
    id: `${name
      .toLowerCase()
      .replace(" ", "")
      .replace("-", "")
      .replace(".", "")}_${formattedDate.replace("-", "")}_${time}`,
    name: name,
    time: `${formatAMPM(currentDate)}`,
    timeSpent: `${timeSpent} mins`,
    date: date,
    task: task,
  });
}

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = `0${date.getSeconds()}`.slice(-2);
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + ":" + seconds + " " + ampm;
  return strTime;
}

function changeTimeFormat(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  return `${hours}${minutes}${seconds}`;
}

function addTask(item) {
  var raw = JSON.stringify({
    operation: "create",
    payload: {
      Item: item,
    },
  });
  var requestOptions = {
    method: "POST",
    body: raw,
    redirect: "follow",
    mode: "no-cors",
  };
  fetch(
    "https://zyxzfxyw48.execute-api.us-east-2.amazonaws.com/test/DynamoDBManager",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error"));
}

function filter(taskInput, listTasks) {
  var filteredStocks = [];

  for (let i = 0; i < listTasks.length; i++) {
    if (
      listTasks[i].toLowerCase().startsWith(taskInput.toLowerCase()) === true
    ) {
      filteredStocks.push(listTasks[i]);
    }
  }
  if (taskInput === "") {
    var filteredStocks = listTasks.slice(0, 10);
    filteredStocks.push("...");
    return filteredStocks;
  }
  return filteredStocks.length < 1 ? [taskInput] : filteredStocks;
}

export default ElectronicUseTracker;
