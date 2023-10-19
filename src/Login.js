import React from 'react'
import { useState } from 'react'
import { Container, PopoverHeader, Row } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Tab } from 'react-bootstrap'
import { Tabs } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import { Overlay } from 'react-bootstrap'
import { Popover } from 'react-bootstrap'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import './login.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

// function Login () {
//   const [name, setName] = useState('')

//   const [logged, setIsLogged] = useState(false)

//   function submit (e) {
//     setIsLogged(true)
//     e.preventDefault()
//     localStorage.setItem('name', name)
//     console.log(name)
//   }
//   return (
//     <Container>
//       <form onSubmit={submit}>
//         <input
//           className='form-control mt-5 w-25'
//           value={name}
//           onChange={e => setName(e.target.value)}
//           autoFocus
//         />
//         <input
//           className='form-control'
//           value={name}
//           onChange={e => setName(e.target.value)}
//           autoFocus
//         />
//       </form>
//       <h1>{logged === true ? localStorage.getItem('name') : ''}</h1>
//     </Container>
//   )
// }

function getType (type) {
  return type == 'password' ? 'text' : 'password'
}

function Login () {
  //   localStorage.setItem(
  //     'logged',
  //     localStorage.getItem('email') !== '' &&
  //       localStorage.getItem('email') !== null
  //       ? true
  //       : false
  //   )
  const [type, setType] = useState('password')
  const [show, setShow] = useState(
    localStorage.getItem('email') !== '' &&
      localStorage.getItem('email') !== null &&
      localStorage.getItem('password') !== '' &&
      localStorage.getItem('password') !== null
      ? false
      : true
  )
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [email, setEmail] = useState(
    localStorage.getItem('email') !== null ? localStorage.getItem('email') : ''
  )
  const [pwd, setPwd] = useState(
    localStorage.getItem('password') !== null
      ? localStorage.getItem('password')
      : ''
  )

  function submit (e) {
    e.preventDefault()

    // if (email.includes('@') === true) {
    //   localStorage.setItem('logged', true)
    //   handleClose()
    // }

    localStorage.setItem('email', email)
    localStorage.setItem('password', pwd)
    if (/(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W)\w.{4,8}/.test(pwd) !== true) {
      handleShow()
      localStorage.setItem('logged', false)
    } else {
      handleClose()
      localStorage.setItem('logged', true)
    }

    console.log(email)
    console.log(pwd)
    if (email.includes('@') === false) {
      handleShow()
    }
  }

  if (localStorage.getItem('logged') === false) {
    handleShow()
  }
  return (
    <>
      <div>
        <Modal
          show={show}
          onHide={handleClose}
          animation={true}
          backdrop='static'
          keyboard={false}
        >
          <Tabs
            defaultActiveKey='sign-up'
            id='uncontrolled-tab-example'
            className='mb-3'
            justify
          >
            <Tab eventKey='sign-up' title='Sign Up'>
              <Modal.Header>
                <Modal.Title>Sign Up</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={submit}>
                  <Form.Group
                    as={Row}
                    className='mb-3'
                    controlId='exampleForm.ControlInput1'
                  >
                    {/* <Form.Label>Email address</Form.Label> */}
                    <Form.Label column sm='2' for='floatingInputCustom'>
                      Email:
                    </Form.Label>
                    <Col sm='10'>
                      <Form.Control
                        required={true}
                        className='form-control'
                        id='floatingInputCustom'
                        type='email'
                        placeholder='name@example.com'
                        autoFocus
                        onChange={e => {
                          setEmail(e.target.value)
                          localStorage.setItem('email', e.target.value)
                        }}
                        value={email}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    className='mb-3'
                    controlId='exampleForm.ControlInput1'
                  >
                    {/* <Form.Label>Email address</Form.Label> */}
                    <Form.Label column sm='3' for='floatingInputCustom2'>
                      Password:
                    </Form.Label>
                    <Col sm='8'>
                      <Form.Control
                        required={true}
                        className='form-control password w-75'
                        id='floatingInputCustom2'
                        type='password'
                        placeholder='Ex@123'
                        autoFocus
                        onChange={e => {
                          setPwd(e.target.value)
                          localStorage.setItem('password', e.target.value)
                        }}
                        value={pwd}
                        style={{
                          display: 'inline-block',
                          borderRadius: '0.25rem 0 0 0.25rem'
                        }}
                      />
                      <Button
                        variant='outline-primary'
                        onClick={e => {
                          setType('text')
                          document.querySelector('.password').type = getType(
                            document.querySelector('.password').type
                          )
                        }}
                        style={{
                          borderRadius: '0 0.25rem 0.25rem 0',
                          lineHeight: 1.5
                        }}
                      >
                        <i
                          class={
                            document.querySelector('.password') == 'password'
                              ? 'bi bi-eye-slash'
                              : 'bi bi-eye'
                          }
                        ></i>
                      </Button>
                    </Col>
                    <Col>
                      <Overlay show={true} placement='bottom' className='pt-5'>
                        <Popover id='popover-contained'>
                          <PopoverHeader as='h3'>Hello</PopoverHeader>
                          <Popover.Body style={{ padding: 0 }}>
                            <ListGroup>
                              <ListGroup.Item
                                style={{ borderRadius: 0, borderTop: 'none' }}
                                variant={
                                  /(?=.*[A-Z])/.test(pwd) == true
                                    ? 'success'
                                    : 'danger'
                                }
                              >
                                <span>•</span> Must have at least 1 uppercase.
                              </ListGroup.Item>

                              <ListGroup.Item
                                variant={
                                  /(?=.*[a-z])/.test(pwd) == true
                                    ? 'success'
                                    : 'danger'
                                }
                              >
                                <span>•</span> Must have at least 1 lowercase
                                letter.
                              </ListGroup.Item>
                              <ListGroup.Item
                                variant={
                                  /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(
                                    pwd
                                  ) == true
                                    ? 'success'
                                    : 'danger'
                                }
                              >
                                <span>•</span> Must have at least 1 symbol.
                              </ListGroup.Item>
                              <ListGroup.Item
                                variant={pwd.length >= 4 ? 'success' : 'danger'}
                              >
                                <span>•</span> Must have more than 4 characters.
                              </ListGroup.Item>
                              <ListGroup.Item
                                variant={
                                  pwd.length <= 8 && pwd.length >= 4
                                    ? 'success'
                                    : 'danger'
                                }
                              >
                                <span>•</span> Must have less than 8 characters.
                              </ListGroup.Item>
                            </ListGroup>
                          </Popover.Body>
                        </Popover>
                      </Overlay>
                    </Col>
                    <Modal.Footer className='border-0'>
                      <Button variant='primary' type='submit'>
                        Login
                      </Button>
                    </Modal.Footer>
                  </Form.Group>
                </Form>
              </Modal.Body>
            </Tab>
            <Tab eventKey='Login' title='Login'>
              Tab content for Home
            </Tab>
          </Tabs>
        </Modal>

        <Container
          fluid='true'
          style={{
            alignItems: 'center',
            visibility:
              localStorage.getItem('email') !== '' &&
              localStorage.getItem('email') !== null &&
              localStorage.getItem('password') !== '' &&
              localStorage.getItem('password') !== null &&
              localStorage.getItem('logged') == 'true' &&
              show == false
                ? 'visible'
                : 'hidden'
          }}
        >
          <h2>Account Detauls:</h2>

          <Row className='justify-content-md-center mb-2'>
            <Col xs lg='10'>
              <form onSubmit={submit} className='input-group'>
                <Button
                  style={{
                    borderTopLeftRadius: '.25rem'
                  }}
                  variant='outline-secondary'
                  disabled
                  className='text-black'
                >
                  Email:
                </Button>
                <Form.Control
                  className='form-control text-wrap'
                  id='floatingInputCustom2'
                  type='email'
                  placeholder='name@example.com'
                  autoFocus
                  onChange={e => {
                    e.currentTarget.width = e.target.value.length + 'ch'
                    setEmail(e.target.value)
                    localStorage.setItem('email', e.target.value)
                  }}
                  value={
                    localStorage.getItem('email') !== null &&
                    localStorage.getItem('email') !== ''
                      ? localStorage.getItem('email')
                      : ''
                  }
                  disabled
                />{' '}
                <Button variant='outline-primary' onClick={handleShow}>
                  <i class='bi bi-pencil-square'></i>
                </Button>
                {/* <Form.Control
                  className='form-control text-wrap border-black'
                  id='floatingInputCustom'
                  type='password'
                  placeholder='name@example.com'
                  autoFocus
                  //   onChange={e => {
                  //     e.currentTarget.width = e.target.value.length + 'ch'
                  //     setEmail(e.target.value)
                  //     localStorage.setItem('email', e.target.value)
                  //   }}
                  //   value={
                  //     localStorage.getItem('email') !== null &&
                  //     localStorage.getItem('email') !== ''
                  //       ? localStorage.getItem('email')
                  //       : ''
                  //   }
                  value='abcde'
                  disabled
                />
                <Button
                  variant='outline-primary'
                  onClick={e => {
                    localStorage.setItem('logged', false)
                    handleShow()
                  }}
                  style={{
                    visibility:
                      localStorage.getItem('email') !== '' &&
                      localStorage.getItem('email') !== null &&
                      localStorage.getItem('logged') == 'true'
                        ? 'visible'
                        : 'hidden',
                    borderTopRadius: '.25rem'
                  }}
                  className='w-5 h-5'
                >
                  Sign In Another Account
                </Button> */}
                {/* <div className="input-group-append"> */}
                {/* </div> */}
              </form>
            </Col>
          </Row>
          <Row className='justify-content-md-center mb-2'>
            <Col xs lg='10'>
              <form onSubmit={submit} className='input-group'>
                <Button
                  style={{
                    borderTopLeftRadius: '.25rem'
                  }}
                  variant='outline-secondary'
                  className='text-black'
                  disabled
                >
                  Password:
                </Button>
                <Form.Control
                  className='form-control text-wrap'
                  id='floatingInputCustom'
                  type='password'
                  placeholder='name@example.com'
                  autoFocus
                  onChange={e => {
                    e.currentTarget.width = e.target.value.length + 'ch'
                    setEmail(e.target.value)
                    localStorage.setItem('email', e.target.value)
                  }}
                  value={
                    localStorage.getItem('password') !== null &&
                    localStorage.getItem('password') !== ''
                      ? localStorage.getItem('password')
                      : ''
                  }
                  disabled
                />
                <Button variant='outline-primary' onClick={handleShow}>
                  <i class='bi bi-pencil-square'></i>
                </Button>
                {/* <Form.Control
                  className='form-control text-wrap border-black'
                  id='floatingInputCustom'
                  type='password'
                  placeholder='name@example.com'
                  autoFocus
                  //   onChange={e => {
                  //     e.currentTarget.width = e.target.value.length + 'ch'
                  //     setEmail(e.target.value)
                  //     localStorage.setItem('email', e.target.value)
                  //   }}
                  //   value={
                  //     localStorage.getItem('email') !== null &&
                  //     localStorage.getItem('email') !== ''
                  //       ? localStorage.getItem('email')
                  //       : ''
                  //   }
                  value='abcde'
                  disabled
                />
                <Button
                  variant='outline-primary'
                  onClick={e => {
                    localStorage.setItem('logged', false)
                    handleShow()
                  }}
                  style={{
                    visibility:
                      localStorage.getItem('email') !== '' &&
                      localStorage.getItem('email') !== null &&
                      localStorage.getItem('logged') == 'true'
                        ? 'visible'
                        : 'hidden',
                    borderTopRadius: '.25rem'
                  }}
                  className='w-5 h-5'
                >
                  Sign In Another Account
                </Button> */}
                {/* <div className="input-group-append"> */}
                {/* </div> */}
              </form>
            </Col>
          </Row>

          <br />

          <br />
          <br />
        </Container>
      </div>
    </>
  )
}
export default Login
