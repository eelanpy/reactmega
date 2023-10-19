import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Hangman from './Hangman'
import Number from './Number'
import Weather from './Weather'
import Movies from './Movies'
import Options from './Options'
import Login from './Login'

import './App.css'

import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

const links = [
  ['Hangman', <Hangman />],
  ['Number Guessing', <Number />],
  ['Weather App', <Weather />],
  ['Box Office/Budget Finder', <Movies />],
  ['Stock Options', <Options />],
  ['Login', <Login />]
]

const App = () => (
  <>
    <Navbar
      collapseOnSelect
      expand='lg'
      bg='primary'
      data-bs-theme='dark'
      // sticky='top'
    >
      <Container>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            {links.map((w, i) => (
              <NavLink key={i} id='RouterNavLink' to={`/${w[0].toLowerCase()}`}>
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
)

export default App
