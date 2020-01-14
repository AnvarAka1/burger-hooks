import React, { useState, useEffect } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";
const Auth = props => {
	const [ controls, setControls ] = useState({
		email: {
			elementType: "input",
			elementConfig: {
				type: "email",
				placeholder: "Your E-Mail"
			},
			value: "",
			validation: {
				required: true
			},
			valid: false,
			touched: false
		},
		password: {
			elementType: "input",
			elementConfig: {
				type: "password",
				placeholder: "Your Password"
			},
			value: "",
			validation: {
				required: true,
				minLength: 6
			},
			valid: false,
			touched: false
		}
	});
	const [ isSignup, setIsSignup ] = useState(true);

	useEffect(() => {
		if (!props.buildingBurger && props.authRedirectPath !== "/") {
			props.onAuthRedirectPath();
		}
		// eslint-disable-next-line
	}, []);

	const checkValidity = (value, rules) => {
		let isValid = true;
		if (!rules) {
			return true;
		}
		if (rules.required) {
			isValid = value.trim() !== "" && isValid;
		}
		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}
		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		return isValid;
	};

	const inputChangedHandler = (event, controlName) => {
		const updatedControls = {
			...controls,
			[controlName]: {
				...controls[controlName],
				value: event.target.value,
				valid: checkValidity(event.target.value, controls[controlName].validation),
				touched: true
			}
		};
		setControls(updatedControls);
	};

	const submitHandler = event => {
		event.preventDefault();
		props.onAuth(controls.email.value, controls.password.value, isSignup);
	};
	const switchAuthHandler = () => {
		setIsSignup(!isSignup);
	};

	const formElementsArray = [];

	for (let key in controls) {
		formElementsArray.push({
			id: key,
			config: controls[key]
		});
	}

	let form = formElementsArray.map(formElement => {
		return (
			<Input
				key={formElement.id}
				elementConfig={formElement.config.elementConfig}
				elementType={formElement.config.elementType}
				value={formElement.config.value}
				invalid={!formElement.config.valid}
				shouldValidate={formElement.config.validation}
				touched={formElement.config.touched}
				changed={event => inputChangedHandler(event, formElement.id)}
			/>
		);
	});
	if (props.loading) {
		form = <Spinner />;
	}
	let errorMessage = null;
	if (props.error) {
		errorMessage = <p>{props.error.message}</p>;
	}
	let authRouter = null;
	if (props.isAuthenticated) {
		authRouter = <Redirect to={props.authRedirectPath} />;
	}

	return (
		<div className={classes.Auth}>
			{authRouter}
			{errorMessage}
			<form onSubmit={submitHandler}>
				{form}
				<Button btnType="Success">SUBMIT</Button>
			</form>
			<Button btnType="Danger" clicked={switchAuthHandler}>
				SWITCH TO {isSignup ? "SIGNIN" : "SIGNUP"}
			</Button>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
		buildingBurger: state.burgerBuilder.building,
		authRedirectPath: state.auth.authRedirectPath
	};
};
const mapDispatchToProps = dispatch => {
	return {
		onAuth: (mail, password, isSignup) => dispatch(actions.auth(mail, password, isSignup)),
		onAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
