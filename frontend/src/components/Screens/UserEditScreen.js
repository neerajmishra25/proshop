import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Message";
import Loader from "../Loader";
import { getuserDetails } from "../../actions/userActions";
import FormContainer from "../FormContainer";

const UserEditScreen = ({ match, history }) => {
	const userId = match.params.id;
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);

	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	useEffect(() => {
		if (!user.name || user._id !== userId) {
			dispatch(getuserDetails(userId));
		} else {
			setName(user.name);
			setEmail(user.email);
			setIsAdmin(user.isAdmin);
		}
	}, [user, dispatch, userId]);
	const submitHandler = (e) => {
		e.preventDefault();
	};
	return (
		<>
			<Link to="/admin/userlist" className="btn btn-light">
				Go Back
			</Link>

			<FormContainer>
				<h1>Edit User</h1>
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId="Name">
							<Form.Label>Name </Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter Name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId="email">
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								type="email"
								value={email}
								placeholder="Enter Email Address"
								onChange={(e) => setEmail(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId="isAdmin">
							<Form.Label>Is Admin</Form.Label>
							<Form.Check
								type="checkbox"
								label="isAdmin"
								checked={isAdmin}
								onChange={(e) => setIsAdmin(e.target.checked)}
							></Form.Check>
						</Form.Group>
						<Button type="submit" variant="primary">
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
};

export default UserEditScreen;
