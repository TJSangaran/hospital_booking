import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import Axios from "axios";

// react-bootstrap components
import {
    Badge,
    Button,
    Card,
    Form,
    Navbar,
    Nav,
    Container,
    Row,
    Col
} from "react-bootstrap";

function AddDoctor() {
    const [values, setValues] = useState({
        email: '',
        password: '',
        name: '',
        phoneNumber: '',
        specialization: '',
        feesPerSession: ''
    })
    const history = useHistory();

    const handleChange = e => {
        setValues(values => ({ ...values, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const { data } = await Axios.post(
            `${process.env.REACT_APP_SERVER_URL}/doctors/add`,
            values
        );
        history.push('/admin/doctors')
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Add doctor</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col className="pr-1" md="6">
                                            <Form.Group>
                                                <label>Name</label>
                                                <Form.Control
                                                    name="name"
                                                    onChange={handleChange}
                                                    value={values.name}
                                                    placeholder="Name"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="6">
                                            <Form.Group>
                                                <label>Phone number</label>
                                                <Form.Control
                                                    name="phoneNumber"
                                                    onChange={handleChange}
                                                    value={values.phoneNumber}
                                                    placeholder="Phone number"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col className="pr-1" md="6">
                                            <Form.Group>
                                                <label>Specialization</label>
                                                <Form.Control
                                                    name="specialization"
                                                    onChange={handleChange}
                                                    value={values.specialization}
                                                    placeholder="Specialization"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="6">
                                            <Form.Group>
                                                <label>Fees per session</label>
                                                <Form.Control
                                                    name="feesPerSession"
                                                    onChange={handleChange}
                                                    value={values.feesPerSession}
                                                    placeholder="Fees per session"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col className="pr-1" md="6">
                                            <Form.Group>
                                                <label>Email</label>
                                                <Form.Control
                                                    name="email"
                                                    onChange={handleChange}
                                                    value={values.email}
                                                    placeholder="Email"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="6">
                                            <Form.Group>
                                                <label>Password</label>
                                                <Form.Control
                                                    name="password"
                                                    onChange={handleChange}
                                                    value={values.password}
                                                    placeholder="Password"
                                                    type="password"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>

                                    </Row>
                                    <Button
                                        className="btn-fill pull-right"
                                        type="submit"
                                        variant="info"
                                    >
                                        Create Doctor
                                    </Button>
                                    <div className="clearfix"></div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default AddDoctor;
