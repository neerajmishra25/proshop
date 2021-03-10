import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Message";
import Loader from "../Loader";
import { register } from "../../actions/userActions";
import FormContainer from "../FormContainer";

const RegisterScreen = ({ location, history }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [cpassword, setCpassword] = useState("");
	const [msg, setMsg] = useState("");
	const [name, setName] = useState("");

	const dispatch = useDispatch();
	const userRegister = useSelector((state) => state.userRegister);
	const { loading, error, userInfo } = userRegister;
	const redirect = location.search ? location.search.split("=")[1] : "/";
	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, redirect, userInfo]);
	const submitHandler = (e) => {
		e.preventDefault();
		if (cpassword !== password) {
			setMsg("Password and confirm password should be same");
			return false;
		}

		dispatch(register(name, email, password));
	};
	return (
		<FormContainer>
			<h1>Sign Up</h1>
			{msg && <Message variant="danger">{msg}</Message>}
			{error && <Message variant="danger">{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="Name">
					<Form.Label>Name </Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Name"
						onChange={(e) => setName(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="email">
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter Email Address"
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter password"
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="cpassword">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Confirm password"
						onChange={(e) => setCpassword(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Button type="submit" variant="primary">
					Register
				</Button>
			</Form>
			<Row className="py-3">
				<Col>
					Have an account?{" "}
					<Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
						Login Here
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default RegisterScreen;
