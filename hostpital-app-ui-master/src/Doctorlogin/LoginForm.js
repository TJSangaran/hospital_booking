import React, { useContext, useState } from 'react';
import { Redirect, useHistory } from "react-router-dom";
import { Container, Row, Col, Card, Form, CardHeader, CardBody, FormGroup, CardFooter, Button, Label, Input } from 'reactstrap'
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext';

const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [status, setStatus] = useState(0);
	const { token, setToken, setUser } = useAuth();
	const history = useHistory();

	async function login() {
		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_SERVER_URL}/doctors/login/`,
				{
					email: email,
					password: password
				}
			);

			if (data.token && data.user) {
				setToken(data.token)
				setUser(data.user)
				history.replace("/doctor")
			} else {
				alert(data.message)
			}
		} catch (err) {
			console.log(err);
		}
	}

	// if (token && !googleId) {
	// 	return <Redirect to="/doctor" />
	// }
	return (
		<Container className='text-center'>
			<Row>
				<Col lg={6} className='offset-lg-3 mt-5 '>
					<Card>
						<Form>
							<CardHeader className=''>Welcome back, Doc</CardHeader>
							<CardBody >
								<FormGroup row>
									<Label for='email' sm={3}>
										Username
									</Label>
									<Col sm={9}>
										<Input
											type='text'
											name='email'
											id='email'
											placeholder='provide your email'
											onChange={(e) => setEmail(e.target.value)}
										/>
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for='password' sm={3}>
										Password
									</Label>
									<Col sm={9}>
										<Input
											type='password'
											name='password'
											id='password'
											placeholder='your password here'
											onChange={(e) => setPassword(e.target.value)}
											onKeyPress={(target) => {
												if (target.charCode === 13) {
													login();
												}
											}}
										/>
									</Col>
								</FormGroup>
								{status === 201 && <p className="warning" style={{ color: "red", fontSize: "15px" }}>Wrong email or password! Please try again</p>}
							</CardBody>
							<CardFooter>
								<Button block color="primary" onClick={login}>
									Sign In
								</Button>
							</CardFooter>
						</Form>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default LoginForm;