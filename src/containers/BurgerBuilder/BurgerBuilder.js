import React, { useState, useEffect } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import BurgerSummary from "../../components/Burger/BurgerSummary/BurgerSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

const BurgerBuilder = props => {
	const [ purchasing, setPurchasing ] = useState(false);

	useEffect(() => {
		props.onInitIngredients();
		// eslint-disable-next-line
	}, []);
	const updatePurchaseState = ingredients => {
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		return sum > 0;
	};

	const purchaseHandler = () => {
		if (props.isAuthenticated) {
			setPurchasing(true);
		} else {
			props.onSetAuthRedirectPath("/checkout");
			props.history.push("/auth");
		}
	};
	const purchaseClosedHandler = () => {
		setPurchasing(false);
	};
	const purchaseContinuedHandler = () => {
		props.onPurchaseInit();
		props.history.push("/checkout");
	};

	const disabledInfo = {
		...props.ings
	};
	for (let key in disabledInfo) {
		disabledInfo[key] = disabledInfo[key] <= 0;
	}
	let burger = props.error ? <p>Something wrong</p> : <Spinner />;
	let orderSummary = <Spinner />;
	if (props.ings) {
		burger = (
			<Aux>
				<Burger ingredients={props.ings} />
				<BuildControls
					ingredientAdded={props.onIngredientAdded}
					ingredientRemoved={props.onIngredientRemoved}
					disabled={disabledInfo}
					price={props.price}
					purchasable={updatePurchaseState(props.ings)}
					ordered={purchaseHandler}
					isAuth={props.isAuthenticated}
				/>
			</Aux>
		);
		orderSummary = (
			<BurgerSummary
				price={props.price}
				ingredients={props.ings}
				purchaseCancelled={purchaseClosedHandler}
				purchaseContinued={purchaseContinuedHandler}
			/>
		);
	}

	return (
		<Aux>
			<Modal show={purchasing} modalClosed={purchaseClosedHandler}>
				{orderSummary}
			</Modal>
			{burger}
		</Aux>
	);
};

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuthenticated: state.auth.token !== null
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
		onIngredientRemoved: ingName => dispatch(actions.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onPurchaseInit: () => dispatch(actions.purchaseInit()),
		onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));
