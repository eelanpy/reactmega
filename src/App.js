import React from "react";
import { Routes, Route } from "react-router-dom";

import Hangman from "./components/Hangman";
import Number from "./components/Number";
import Weather from "./components/Weather";
import Movies from "./components/Movies";
import Options from "./components/Options";
import Login from "./components/Login";
import MathematicaTestOnline from "./components/Mathematica Test";
import DashboardMathematica from "./components/DashboardMathematica";
import Container from "react-bootstrap/Container";
import ApiTester from './components/ApiTester'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
const links = [
  ["Hangman", <Hangman />, false],
  ["Number Guessing", <Number />, false],
  ["Weather App", <Weather />, false],
  ["Box Office", <Movies />, false],
  ["Stock Options", <Options />, false],
  
  ["Mathematica", <MathematicaTestOnline />, false],
  ["Dashboard", <DashboardMathematica />, false],
   ["ApiTester", <ApiTester />, false],
];

const App = () => (
  <>
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="primary"
      data-bs-theme="dark"
      // sticky='top'
    >
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {links.map((w, i) => (
              <NavLink
                key={i}
                id="RouterNavLink"
                className={links[i][2] == true ? "active" : ""}
                to={`/${w[0].toLowerCase()}`}
                onClick={(e) => {
                  links[i][2] = true;
                }}
              >
                {w[0]}
              </NavLink>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <Routes>
      {links.map((w, i) => (
        <Route key={i} path={`/${w[0].toLowerCase()}`} element={w[1]} />
      ))}
    </Routes>
  </>
);

export default App;
