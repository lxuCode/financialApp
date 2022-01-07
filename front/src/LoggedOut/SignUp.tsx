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

	const [snackbar, setSnackbar] = useState<{
		open: boolean;
		severity: AlertColor | undefined;
		message: string;
	}>({
		open: false,
		severity: undefined,
		message: "",
	});

	const handleSubmit = async (): Promise<void> => {
		try {
			const res = await axios.post(
				"http://localhost:5000/users/register",
				userRegisterInfo
			);
			if (res) {
				setSnackbar({
					open: true,
					severity: "success",
					message: "Votre compte a bien été crée !",
				});
			}
		} catch (err) {
			setSnackbar({
				open: true,
				severity: "error",
				message: "Une erreur est survenue, veuillez réessayer.",
			});
		}
	};

	const handleCloseSnackbar = (): void => {
		setSnackbar({ ...snackbar, open: false });
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
			<Snackbar
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				open={snackbar.open}
				autoHideDuration={5000}
				onClose={handleCloseSnackbar}
			>
				<Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</>
	);
};

export default SignUp;
