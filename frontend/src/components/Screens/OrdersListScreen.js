import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Message";
import Loader from "../Loader";
import { getOrdersList } from "../../actions/orderActions";
// import { PRODUCT_CREATE_RESET } from "../../constants/productConstant";

const OrderListScreen = ({ history, match }) => {
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const ordersList = useSelector((state) => state.ordersList);
	const { loading, orders, error } = ordersList;

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(getOrdersList());
		} else {
			history.push("/login");
		}
	}, [dispatch, history, userInfo]);

	return (
		<>
			<Row className="align-items-center">
				<Col>
					<h1>Orders</h1>
				</Col>
			</Row>

			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Table striped bordered hover responsive className="table-sm">
					<thead>
						<tr>
							{/* <th>ID</th> */}
							<th>User</th>
							<th>Date</th>
							<th>Total Price</th>
							<th>Is Paid</th>
							<th>Is Delivered</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<tr key={order._id}>
								<td>{order.user && order.user.name}</td>
								<td>{order.createdAt.substring(0, 10)}</td>
								<td>${order.totalPrice}</td>
								<td>
									{order.isPaid ? (
										<i className="fas fa-check" style={{ color: "green" }}></i>
									) : (
										<i className="fas fa-times" style={{ color: "red" }}></i>
									)}
								</td>
								<td>
									{order.isDelivered ? (
										<i className="fas fa-check" style={{ color: "green" }}></i>
									) : (
										<i className="fas fa-times" style={{ color: "red" }}></i>
									)}
								</td>

								<td>
									<LinkContainer to={`/order/${order._id}`}>
										<Button variant="light" className="btn-sm">
											View
										</Button>
									</LinkContainer>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default OrderListScreen;
