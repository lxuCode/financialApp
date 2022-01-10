import React, { useReducer, useState } from "react";

import axios from "axios";

import {
	Alert,
	AlertColor,
	Button,
	Container,
	Snackbar,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
	openSuccessSnackbar,
	openWarningSnackbar,
} from "../redux/features/snackbar";
import CustomSnackbar from "../components/CustomSnackbar";
import { register } from "../services/user";

const SignUp = () => {
	const userRegisterInfoReducer = (state, action) => {
		const { type, payload } = action;

		switch (type) {
			case "UPDATE_EMAIL":
				return {
					...state,
					email: payload,
				};
			case "UPDATE_USERNAME":
				return {
					...state,
					username: payload,
				};
			case "UPDATE_PASSWORD":
				return {
					...state,
					password: payload,
				};
			default:
				return state;
		}
	};
	const initialStateUserRegisterInfo = {
		email: "",
		username: "",
		password: "",
	};
	const [userRegisterInfo, dispatchUserRegisterInfo] = useReducer(
		userRegisterInfoReducer,
		initialStateUserRegisterInfo
	);

	const dispatch = useDispatch();
	const snackbar = useSelector(
		(store: {
			snackbar: { isOpen: boolean; severity: AlertColor; message: string };
		}) => store.snackbar
	);

	const handleSubmit = async (): Promise<void> => {
		try {
			const res = await register(userRegisterInfo);
			dispatch(openSuccessSnackbar(res));
		} catch (err) {
			dispatch(openWarningSnackbar());
		}
	};

	return (
		<>
			<Container sx={{ py: 3 }} maxWidth="sm">
				<Typography variant="h3" sx={{ textAlign: "center", marginBottom: 3 }}>
					Créer un compte
				</Typography>
				<Stack spacing={2}>
					<TextField
						label="Email"
						variant="outlined"
						size="small"
						value={userRegisterInfo.email}
						onChange={(event) => {
							dispatchUserRegisterInfo({
								type: "UPDATE_EMAIL",
								payload: event.target.value,
							});
						}}
					/>
					<TextField
						label="Username"
						variant="outlined"
						size="small"
						value={userRegisterInfo.username}
						onChange={(event) => {
							dispatchUserRegisterInfo({
								type: "UPDATE_USERNAME",
								payload: event.target.value,
							});
						}}
					/>
					<TextField
						label="Password"
						variant="outlined"
						size="small"
						value={userRegisterInfo.password}
						onChange={(event) => {
							dispatchUserRegisterInfo({
								type: "UPDATE_PASSWORD",
								payload: event.target.value,
							});
						}}
					/>
					<Button variant="contained" onClick={handleSubmit}>
						Créer mon compte
					</Button>
				</Stack>
			</Container>
			<CustomSnackbar open={snackbar.isOpen}>
				<Alert severity={snackbar.severity}>{snackbar.message}</Alert>
			</CustomSnackbar>
		</>
	);
};

export default SignUp;
