import React, { useState } from "react";
import { Container, Button, Row, Col, Form, Navbar } from "react-bootstrap";
import style from "styled-components";

const FormContainer = style.div`
form {
  margin-top:10px;
}
.container-fluid {
  padding-right:0;
  padding-left:0;
  overflow:hidden;
}
`;

const FormComoponent = () => {
  const [validated, setValidated] = useState(false);
  const [displayForm, setDisplayForm] = useState(true);
  const [displayMessage, setDisplayMessage] = useState("Are you lost");

  const getAgeList = () => {
    const list = [];
    for (let i = 18; i <= 99; i++) {
      list.push(i);
    }
    return list;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      const formData = {
        name: form.elements[0].value,
        age: form.elements[1].value,
        dob: form.elements[2].value,
        locality: form.elements[3].value,
        num_guests: form.elements[4].value,
        addresss: form.elements[5].value,
      };

      //for mocking purpose, considered data is sent to microsevice and dispatched.
      setValidated(false);
      setDisplayForm(false);
      setDisplayMessage("Your data has been submitted successfully");
    }
  };

  const goBacktoForm = (e) => {
    e.preventDefault();
    setDisplayForm(true);
    setDisplayMessage("");
  };

  const getForm = () => {
    return (
      <Form noValidate validated={validated} onSubmit={submitHandler}>
        <Form.Group as={Row} controlId="rsvpForm.name">
          <Form.Label column sm={2}>
            Name
          </Form.Label>
          <Col sm={6}>
            <Form.Control required type="text" placeholder="Enter your name" />
            <Form.Control.Feedback type="invalid">
              Please provide a name.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="rsvpForm.age">
          <Col sm={2}>
            <Form.Label>Age</Form.Label>
          </Col>
          <Col sm={6}>
            <Form.Control as="select">
              {getAgeList().map((i) => {
                return (
                  <option key={i} value={i}>
                    {i}
                  </option>
                );
              })}
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="rsvpForm.name">
          <Form.Label column sm={2}>
            Date of Birth
          </Form.Label>
          <Col sm={6}>
            <Form.Control type="date" required />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="rsvpForm.locality">
          <Form.Label column sm={2}>
            Locality
          </Form.Label>
          <Col sm={6}>
            <Form.Control type="text" required placeholder="Locality" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="rsvpForm.nog">
          <Form.Label column sm={2}>
            Number of guests
          </Form.Label>
          <Col sm={6}>
            <Form.Control as="select">
              <option key={0} value={0}>
                0
              </option>
              <option key={1} value={1}>
                1
              </option>
              <option key={2} value={2}>
                2
              </option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="rsvpForm.profession">
          <Form.Label column sm={2}>
            Profession
          </Form.Label>
          <Col sm={6}>
            <Form.Control as="select">
              <option key={0} value={"employee"}>
                Employee
              </option>
              <option key={1} value={"student"}>
                Student
              </option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="rsvpForm.address">
          <Form.Label column sm={2}>
            Address
          </Form.Label>
          <Col sm={6}>
            <Form.Control required as="textarea" rows={3} maxLength={50} />
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  };

  const getMessage = () => {
    return (
      <Row>
        <Col>
          {displayMessage}
          <div>
            <a href="#" onClick={goBacktoForm}>
              Go Back to previous page{" "}
            </a>
          </div>
        </Col>
      </Row>
    );
  };

  return (
    <FormContainer>
      <Container fluid>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="/">RSVP Portal</Navbar.Brand>
        </Navbar>
        {displayForm ? getForm() : getMessage()}
      </Container>
    </FormContainer>
  );
};

export default FormComoponent;
