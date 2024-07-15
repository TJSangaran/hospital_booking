import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

const PatientSignup = () => {
    const [values, setValues] = useState({ name: '', phoneNumber: '', username: '', password: '' })
    const history = useHistory()

    const handleChange = e => {
        setValues(values => ({ ...values, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const { data } = await Axios.post(
            `${process.env.REACT_APP_SERVER_URL}/patients/signup`,
            values
        );
        history.replace("/patient/login")
    }

    return (
        <Container>
            <Row className="d-flex justify-content-center align-items-center mt-4">
                <Col md={8} lg={6} xs={12}>
                    <div className="border border-3 border-primary"></div>
                    <Card className="shadow">
                        <Card.Body>
                            <div className="mb-3 mt-md-4">
                                <h2 className="fw-bold mb-2 text">Hospital Management</h2>
                                <p className=" mb-5">Signup for patient</p>
                                <div className="mb-3">
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className="text-center">
                                                Name
                                            </Form.Label>
                                            <Form.Control type="text" name="name" value={values.name} onChange={handleChange} placeholder="Name" />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className="text-center">
                                                Phone Number
                                            </Form.Label>
                                            <Form.Control type="text" name="phoneNumber" value={values.phoneNumber} onChange={handleChange} placeholder="Enter Phone number" />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className="text-center">
                                                User Name
                                            </Form.Label>
                                            <Form.Control type="text" name="username" value={values.username} onChange={handleChange} placeholder="Enter username" />
                                        </Form.Group>

                                        <Form.Group
                                            className="mb-3"
                                            controlId="formBasicPassword"
                                        >
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" name="password" value={values.password} onChange={handleChange} placeholder="Password" />
                                        </Form.Group>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="formBasicCheckbox"
                                        >
                                            <p className="small">
                                                <a className="text-primary" href="#!">
                                                    Forgot password?
                                                </a>
                                            </p>
                                        </Form.Group>
                                        <div className="d-grid">
                                            <Button variant="primary" type="submit">
                                                Signup
                                            </Button>
                                        </div>
                                    </Form>
                                    <div className="mt-3">
                                        <p className="mb-0  text-center">
                                            Already have an account?{" "}
                                            <Link to="/patient/login" className="text-primary fw-bold">
                                                Login
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default PatientSignup;