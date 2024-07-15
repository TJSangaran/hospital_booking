import React, { useState, useEffect } from "react";
import Axios from "axios";
// react-bootstrap components
import {
    Badge,
    Button,
    Card,
    Navbar,
    Nav,
    Table,
    Container,
    Row,
    Col,
} from "react-bootstrap";

function Doctors() {
    const [doctors, setDoctors] = useState([])

    useEffect(async () => {
        const { data } = await Axios.get(
            `${process.env.REACT_APP_SERVER_URL}/doctors`
        );
        setDoctors(data)
    }, [])
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12">
                        <Card className="strpied-tabled-with-hover">
                            <Card.Header>
                                <Card.Title as="h4">Doctors</Card.Title>
                                <p className="card-category">
                                    Details of the doctors
                                </p>
                            </Card.Header>
                            <Card.Body className="table-full-width table-responsive px-0">
                                <Table className="table-hover table-striped">
                                    <thead>
                                        <tr>
                                            <th className="border-0">ID</th>
                                            <th className="border-0">Name</th>
                                            <th className="border-0">Email</th>
                                            <th className="border-0">Phone Number</th>
                                            <th className="border-0">Specialization</th>
                                            <th className="border-0">Fees per session</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {doctors.map((doctor, id) => (
                                            <tr key={id}>
                                                <td>{id + 1}</td>
                                                <td>{doctor.name}</td>
                                                <td>{doctor.email}</td>
                                                <td>{doctor.phoneNumber}</td>
                                                <td>{doctor.specialization}</td>
                                                <td>{doctor.feesPerSession}</td>
                                            </tr>

                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Doctors;
