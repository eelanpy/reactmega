import { useState } from "react";

import data from "../dataFiles/data.json";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";

import "bootstrap/dist/css/bootstrap.min.css";

function generateWords(w, notLetters) {
  try {
    w = w.toLowerCase();

    notLetters = notLetters.toLowerCase();

    const words = data.words;
    var wordsFnd = [];
    var no_letters_pattern;
    if (notLetters.length < 1) {
      no_letters_pattern = new RegExp("^[^]*$");
    } else {
      no_letters_pattern = new RegExp("^[^" + notLetters + "]*$");
    }
    var pattern = new RegExp(w, "g");
    for (let i = 0; i < words.length; i++) {
      if (
        words[i].match(pattern) != null &&
        words[i].match(pattern)[0].length === words[i].length &&
        words[i].match(no_letters_pattern) != null
      ) {
        const word =
          words[i][0].toUpperCase() +
          words[i].slice(1, words[i].length).toLowerCase();
        wordsFnd.push(word);
      } else {
        // alert("Couldn't find it!")
      }
    }

    return wordsFnd;
  } catch {
    return [];
  }
}

function Hangman() {
  document.title = "Hangman Cheatsheet";
  const [word, setWord] = useState("");
  const [notLetters, setNotLetters] = useState("");

  const ChangeValue = (event) => {
    setWord(event.target.value);
  };

  const ChangeNotLetter = (event) => {
    setNotLetters(event.target.value);
  };

  return (
    <>
      <Container>
        <h1
          className="mt-4"
          style={({ textDecorationLine: "underline" }, { fontWeight: "bold" })}
        >
          Hangman Cheatsheet:
        </h1>
        <h2 className="mt-1 mb-4">
          This game is to see available choices for your hangman round(Make sure
          you put some letters like vowels first before checking). Replace
          missing letters with dots. If there are letters that are not in the
          word, make sure to put it in the second input box and{" "}
          <strong>don't seperate each letter with a comma</strong>:{" "}
        </h2>
        <Row className="justify-content-md-center">
          <Col xs lg="5">
            <Form.Control
              type="text"
              placeholder="Word:"
              value={word}
              onChange={ChangeValue}
              pattern="^[a-zA-Z]*$"
              autoFocus
              style={{ textAlign: "left" }}
            />
          </Col>
        </Row>

        <Row className="justify-content-md-center mt-3 mb-3">
          <Col xs lg="5">
            <Form.Control
              type="text"
              placeholder="Letters not in word: e.g.  zirk(not in my hangman round)"
              value={notLetters}
              onChange={ChangeNotLetter}
              pattern="^[a-zA-Z]*$"
              style={{ textAlign: "left" }}
            />
          </Col>
        </Row>
        <ListGroup>
          {generateWords(word, notLetters).map((w, i) => (
            <Row className="justify-content-md-center mt-1" key={i.toString()}>
              <Col xs="true" lg="5">
                <ListGroup.Item
                  xs="true"
                  lg="2"
                  key={i.toString()}
                  variant="primary"
                >
                  {w}
                </ListGroup.Item>
              </Col>
            </Row>
          ))}
        </ListGroup>
      </Container>
    </>
  );
}

export default Hangman;
