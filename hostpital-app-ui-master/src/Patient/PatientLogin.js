import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import Axios from "axios";
import { useAuth } from "Auth/AuthContext";

const PatientLogin = () => {
    const [values, setValues] = useState({ username: '', password: '' })
    const { setToken, setUser } = useAuth()

    const history = useHistory()

    const handleChange = e => {
        setValues(values => ({ ...values, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const { data } = await Axios.post(
            `${process.env.REACT_APP_SERVER_URL}/patients/login`,
            values
        );
        if (data.token && data.user) {
            setToken(data.token)
            setUser(data.user)
            history.replace("/patient")
        } else {
            alert(data.message)
        }
    }

    return (
        <Container>
            <Row className="vh-100 d-flex justify-content-center align-items-center">
                <Col md={8} lg={6} xs={12}>
                    <div className="border border-3 border-primary"></div>
                    <Card className="shadow">
                        <Card.Body>
                            <div className="mb-3 mt-md-4">
                                <h2 className="fw-bold mb-2 text">Hospital Management</h2>
                                <p className=" mb-5">Login as patient</p>
                                <div className="mb-3">
                                    <Form onSubmit={handleSubmit}>
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
                                            {/* <p className="small">
                                                <a className="text-primary" href="#!">
                                                    Forgot password?
                                                </a>
                                            </p> */}
                                        </Form.Group>
                                        <div className="d-grid">
                                            <Button variant="primary" type="submit">
                                                Login
                                            </Button>
                                        </div>
                                    </Form>
                                    <div className="mt-3">
                                        <p className="mb-0  text-center">
                                            Don't have an account?{" "}
                                            <Link to="/patient/signup" className="text-primary fw-bold">
                                                Sign Up
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

export default PatientLogin;