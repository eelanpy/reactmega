import { useState, useEffect } from 'react'

import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import Alert from 'react-bootstrap/Alert'
import axios from 'axios'

var link = ''

function titleCase (str) {
  var splitStr = str.toLowerCase().split(' ')
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
  }
  // Directly return the joined string
  return splitStr.join(' ')
}

function Card (props) {
  console.log(props.data)

  if (props.data == undefined || props.data == []) {
    return (
      <div
        className='card text-bg-danger m-2'
        style={{
          visibility: props.submitted == true ? 'visible' : 'hidden'
        }}
      >
        <div className='card-body text-center' style={{ textAlign: 'center' }}>
          <p
            className='card-title font-italic'
            style={{ fontSize: '2rem', fontWeight: 900 }}
          >
            This city is not found in our Weather Data!
          </p>
          <p
            className='font-weight-normal'
            style={{ fontSize: '1.75rem', fontWeight: 500 }}
          >
            Somehow the fields you submitted can't be found in our data.
          </p>
          <p style={{ fontSize: '1.5rem' }} className='font-weight-light'>
            Solution: Try another city!
          </p>
        </div>
      </div>
    )
  } else {
    return (
      <>
        <h1>{props.data[0]}</h1>
        <div className='d-flex justify-content-center'>
          <Image src={props.data[1]} alt={props.data[props.data.length - 1]} />
        </div>
        <h3>{props.data[2]}</h3>
        <h3>{props.data[3]}</h3>
      </>
    )
  }
}

function Weather () {
  const [submitted, setSubmitted] = useState(false)
  document.title = 'Weather Finder By City'
  const [city, setCity] = useState('')

  const [weather, setWeather] = useState([])

  function submit (e) {
    // setCity(e.target.value)

    setSubmitted(true)

    const baseURL =
      'https://api.openweathermap.org/geo/1.0/direct?q=' +
      city +
      '&appid=daa772f5693c7cb6303ee768a285ab75'
    async function fetchData () {
      const response = await fetch(baseURL)
      const data = await response.json()
      const results = data

      getWeather(results[0])
    }
    fetchData()
    e.preventDefault()
  }

  function getWeather (data) {
    setSubmitted(true)
    async function fetchData () {
      var country = {}
      const response = await fetch('https://restcountries.com/v3.1/all')
      const data3 = await response.json()
      for (var i = 0; i < data3.length; i++) {
        country[data3[i]['cca2']] = data3[i]['name']['official']
      }
      try {
        const country2 = country[data.country]
        console.log(country2)

        const lat = data.lat
        const lon = data.lon
        const response2 = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=daa772f5693c7cb6303ee768a285ab75&units=metric`
        )
        const data2 = await response2.json()
        var imgURL
        let temperature
        let description
        imgURL =
          'http://openweathermap.org/img/wn/' +
          data2.weather[0].icon +
          '@2x.png'
        temperature = Math.round(parseInt(data2.main.temp))
        temperature = temperature + '°C'
        description = titleCase(data2.weather[0].description)
        const displayCity = (
          data.name +
          ', ' +
          data.state +
          ', ' +
          country2
        ).replace(', undefined, ', ', ')
        setWeather([displayCity, imgURL, temperature, description])
      } catch {
        setWeather(undefined)
        console.log('')
      }
    }
    fetchData()
  }

  //

  function change (e) {
    console.log(e.target.value)
    setCity(e.target.value)
    // submitted = false;
  }

  return (
    <>
      <div className='container justify-md-content-center'>
        <h1
          className='mt-4'
          style={({ textDecorationLine: 'underline' }, { fontWeight: 'bold' })}
        >
          Weather Finder By City:
        </h1>
        <h3>
          If you want to search by the country and city, type in the country
          code. For example for kingston,ontario,canada, type{' '}
          <strong>kingston,ca</strong>!
        </h3>

        <Row className='justify-content-md-center mb-2'>
          <Col xs lg='3'>
            <form onSubmit={submit}>
              <Form.Control
                type='text'
                className={`mb-4`}
                placeholder='Please type a city:'
                value={city}
                onChange={e => change(e)}
                autoFocus
              />
            </form>
          </Col>
        </Row>

        <Card data={weather} submitted={submitted} />
      </div>
    </>
  )
}

export default Weather
