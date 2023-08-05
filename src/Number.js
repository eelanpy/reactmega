import React, { useEffect, useState } from 'react'

import Container from 'react-bootstrap/Container'
import ToggleButton from 'react-bootstrap/ToggleButton'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

const guesses = {}
var tries = 0

function LetUserPick (props) {
  console.log(props.randomNum)

  const [correctGuess, setCorrectGuess] = useState(null)
  const [guess, setGuess] = useState('')

  function store (e) {
    parseInt(e.target.value)
    setGuess(e.target.value.replace(/\D/g, ''))
  }

  function check (guess) {
    if (parseInt(guess) === parseInt(props.randomNum)) {
      setCorrectGuess(true)
      // setTextAlert('Correct! You got in ' + guesses.length + ' tries.')
    } else {
      setCorrectGuess(false)
      // if (parseInt(guess) > props.randomNum) {
      //   setTextAlert('Too High!')
      // } else {
      //   setTextAlert('Too Low!')
      // }
      setGuess('')
    }
  }

  const myRef = React.createRef()
  useEffect(() => {
    myRef.current.focus()
    console.log(correctGuess)
    console.log(guesses)
  })

  function submit (event) {
    setGuess(event.target.value)
    event.preventDefault()
    check(guess)
    tries += 1
    if (parseInt(guess) > parseInt(props.randomNum)) {
      guesses[' ' + guess] = 'Too High!'
    } else if (parseInt(guess) < parseInt(props.randomNum)) {
      guesses[' ' + guess] = 'Too Low!'
    } else if (parseInt(guess) === parseInt(props.randomNum)) {
      guesses[' ' + guess] = `Correct: ${String(tries)} ${
        tries < 2 ? 'try' : 'tries!'
      }`
    }
  }

  return (
    <>
      <h5
        className='mb-4'
        style={{ visibility: props.isChecked ? 'visible' : 'hidden' }}
      >
        The computer has generated a random number from 1 to {props.max}
        (excluding). Try to guess it:
      </h5>
      <Row className='justify-content-md-center mb-2'>
        <Col xs lg='5'>
          <form onSubmit={submit}>
            <Form.Control
              type='text'
              className={`mb-4 ${
                correctGuess === true ? 'text-success border-success' : ''
              }`}
              placeholder='Your Guess:'
              onChange={e => store(e)}
              value={guess}
              disabled={correctGuess ? true : false}
              style={{ visibility: props.isChecked ? 'visible' : 'hidden' }}
              ref={myRef}
            />
            {/* This is alert to tell user if low or high:  */}
          </form>
        </Col>
      </Row>
      <ListGroup>
        {Object.keys(guesses).map((g, i) => (
          <>
            <div className='d-flex justify-content-center'>
              <Button
                className='btn mr-2'
                style={{ marginRight: '20px' }}
                key={i.toString()}
                variant={
                  parseInt(g) === parseInt(props.randomNum)
                    ? 'outline-success active'
                    : 'outline-danger active'
                }
              >
                {g}
              </Button>
              <span className='pl-2'></span>
              <Button
                className='btn'
                variant={
                  parseInt(g) === parseInt(props.randomNum)
                    ? 'outline-success active'
                    : 'outline-danger active'
                }
              >
                {guesses[g]}
              </Button>
            </div>
            <br />
          </>
        ))}
      </ListGroup>
      <div className='text-center'>
        <Button
          size='xs'
          variant='outline-success'
          className='mt-2'
          onClick={() => {
            window.location.reload()
          }}
          style={{ visibility: correctGuess ? 'visible' : 'hidden' }}
        >
          Play Again
        </Button>
      </div>
    </>
  )
}

function Number () {
  document.title = 'Number Guessing Game'
  const [max, setMax] = useState('')
  const [isChecked, setChecked] = useState(false)

  const nums = [
    { value: 10 },
    { value: 25 },
    { value: 50 },
    { value: 100 },
    { value: 500 },
    { value: 1000 }
  ]

  const change = e => {
    setMax(parseInt(e.target.value))
    setChecked(true)
  }

  return (
    <Container>
      <>
        <h1
          className='mt-4'
          style={({ textDecorationLine: 'underline' }, { fontWeight: 'bold' })}
        >
          Number Guessing Game:
        </h1>

        <h2 className='mt-1'>
          This game is to see how fast you can guess a number by. Pick a number
          that suits you(this number is the max the computer can generate a
          number for(excluding that number):
        </h2>
        <div className='d-flex justify-content-center'>
          <Col lg='5'>
            {nums.map((num, idx) => (
              <>
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  className='m-1 mb-4'
                  type='radio'
                  variant='outline-primary'
                  name='radio'
                  value={num.value}
                  checked={max === parseInt(num.value)}
                  onChange={e => change(e)}
                  disabled={isChecked}
                >
                  {num.value}
                </ToggleButton>
              </>
            ))}
          </Col>
        </div>
        <GenerateRandomNum max={max} isChecked={isChecked} />
      </>
    </Container>
  )
}

const GenerateRandomNum = props => {
  const num = props.max
  var randomNum = Math.floor(Math.random() * (num - 1)) + 1
  if (randomNum % 5 === 0) {
    randomNum = Math.floor(Math.random() * (num - 1)) + 1
  }

  return (
    <>
      <LetUserPick
        randomNum={randomNum}
        isChecked={props.isChecked}
        max={num}
      />
    </>
  )
}

export default Number
