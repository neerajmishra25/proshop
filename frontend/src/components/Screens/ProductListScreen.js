import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Message";
import Loader from "../Loader";
import Paginate from "../Paginate";

import {
	listProducts,
	deleteProduct,
	createProduct,
} from "../../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../../constants/productConstant";
import swal from "sweetalert";

const ProductListScreen = ({ history, match }) => {
	const dispatch = useDispatch();
	const pageNumber = match.params.pageNumber || 1;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const productList = useSelector((state) => state.productList);
	const { loading, products, error, pages, page } = productList;

	const productDelete = useSelector((state) => state.productDelete);
	const { success: successDelete, error: errorDelete } = productDelete;

	const productCreate = useSelector((state) => state.productCreate);
	const {
		loading: loadingCreate,
		success: successCreate,
		error: errorCreate,
		product: createdProduct,
	} = productCreate;

	useEffect(() => {
		dispatch({ type: PRODUCT_CREATE_RESET });
		// if (successDelete) {
		// 	swal("Product Deleted", "", "success");
		// }
		if (successCreate) {
			history.push(`/admin/product/${createdProduct._id}/edit`);
		} else {
			if (userInfo && userInfo.isAdmin) {
				dispatch(listProducts("", pageNumber));
			} else {
				history.push("/login");
			}
		}
	}, [
		dispatch,
		history,
		userInfo,
		successDelete,
		errorDelete,
		successCreate,
		createdProduct,
		pageNumber,
	]);

	const deleteHandler = async (id) => {
		const willDelete = await swal({
			title: "Are you sure?",
			text: "Are you sure that you want to delete this product?",
			icon: "warning",
			dangerMode: true,
			buttons: true,
		});
		if (willDelete) {
			await dispatch(deleteProduct(id));
		}
	};
	const createProductHandler = (product) => {
		dispatch(createProduct());
	};
	return (
		<>
			<Row className="align-items-center">
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className="text-center">
					<Button className="my-3" onClick={createProductHandler}>
						<i className="fas fa-plus"></i> Create Product
					</Button>
				</Col>
			</Row>
			{loadingCreate && <Loader />}
			{errorCreate && <Message variant="danger">{errorCreate}</Message>}

			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Table striped bordered hover responsive className="table-sm">
						<thead>
							<tr>
								{/* <th>ID</th> */}
								<th>Product Name</th>
								<th>Price</th>
								<th>Category</th>
								<th>Brand</th>
								{/* <th>Stock</th> */}
								<th></th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<tr key={product._id}>
									{/* <td>{product._id}</td> */}
									<td>{product.name}</td>
									<td>{product.price}</td>
									<td>{product.brand}</td>
									<td>{product.category}</td>
									{/* <td>{product.countInStock}</td> */}
									{/* <td>
									<a rel="noreferrer" target="_blank" href={`${product.image}`}>
										{product.image}
									</a>
								</td> */}
									<td>
										<LinkContainer to={`/admin/product/${product._id}/edit`}>
											<Button variant="light" className="btn-sm">
												<i className="fas fa-edit"></i> Edit
											</Button>
										</LinkContainer>
										<Button
											variant="danger"
											className="btn-sm"
											onClick={() => deleteHandler(product._id)}
										>
											<i className="fas fa-trash"></i> Delete
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
					<Paginate pages={pages} page={page} isAdmin={true} />
				</>
			)}
		</>
	);
};

export default ProductListScreen;
