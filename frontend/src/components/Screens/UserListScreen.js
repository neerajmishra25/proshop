import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Message";
import Loader from "../Loader";
import { listUsers, deleteUser } from "../../actions/userActions";
import swal from "sweetalert";

const UserListScreen = ({ history }) => {
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userList = useSelector((state) => state.userList);
	const { loading, users, error } = userList;

	const userDelete = useSelector((state) => state.userDelete);
	const { success: successDelete } = userDelete;

	useEffect(() => {
		if (successDelete) {
			swal("User Deleted!", "", "success");
		}
		if (userInfo && userInfo.isAdmin) {
			dispatch(listUsers());
		} else {
			history.push("/login");
		}
	}, [dispatch, history, userInfo, successDelete]);

	const deleteHandler = async (id) => {
		const willDelete = await swal({
			title: "Are you sure?",
			text: "Are you sure that you want to delete this user?",
			icon: "warning",
			dangerMode: true,
			buttons: true,
		});
		if (willDelete) {
			const check = await dispatch(deleteUser(id));
			console.log(check);
		}
	};
	return (
		<>
			<h1>Users</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Table striped bordered hover responsive className="table-sm">
					<thead>
						<th>ID</th>
						<th>Name</th>
						<th>Email</th>
						<th>Admin</th>
						<th></th>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user._id}>
								<td>{user._id}</td>
								<td>{user.name}</td>
								<td>
									<a href={`mailto:${user.email}`}>{user.email}</a>
								</td>
								<td>{user.isAdmin ? "Admin" : "User"}</td>
								<td>
									<LinkContainer to={`/user/${user._id}/edit`}>
										<Button variant="light" className="btn-sm">
											<i className="fas fa-edit"></i> Edit
										</Button>
									</LinkContainer>
									<Button
										variant="danger"
										className="btn-sm"
										onClick={() => deleteHandler(user._id)}
									>
										<i className="fas fa-trash"></i> Delete
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default UserListScreen;
