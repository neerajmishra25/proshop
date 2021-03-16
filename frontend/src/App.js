import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./components/Screens/HomeScreen";
import ProductScreen from "./components/Screens/ProductScreen";
import CartScreen from "./components/Screens/CartScreen";
import LoginScreen from "./components/Screens/LoginScreen";
import RegisterScreen from "./components/Screens/RegisterScreen";
import ProfileScreen from "./components/Screens/ProfileScreen";
import ShippingScreen from "./components/Screens/ShippingScreen";
import PaymentScreen from "./components/Screens/PaymentScreen";
import PlaceOrderScreen from "./components/Screens/PlaceOrderScreen";

const App = () => {
	return (
		<Router>
			<Header />
			<main className="py-3">
				<Container>
					<Route path="/placeorder" component={PlaceOrderScreen} />
					<Route path="/payment" component={PaymentScreen} />
					<Route path="/register" component={RegisterScreen} />

					<Route path="/login" component={LoginScreen} />
					<Route path="/profile" component={ProfileScreen} />
					<Route path="/product/:id" component={ProductScreen} />
					<Route path="/cart/:id?" component={CartScreen} />
					<Route path="/shipping" component={ShippingScreen} />

					<Route path="/" exact component={HomeScreen} />
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
