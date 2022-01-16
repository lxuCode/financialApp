import React, { useReducer, useState } from "react";

import { useNavigate } from "react-router-dom";
import {
	Alert,
	Button,
	Container,
	Snackbar,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/features/user";

const styles = {
	container: {
		width: "90%",
		pt: 3,
		pb: 4,
	},
	title: {
		textAlign: "center",
		marginBottom: 3,
	},
} as const;

const Home = () => {
	const user = useSelector(
		(state: {
			user: { user: string; isLoading: boolean; error: undefined | boolean };
		}) => state.user
	);
	const dispatch = useDispatch();
	const [openIncorrectUserInfo, setOpenIncorrectUserInfo] = useState(false);
	const navigate = useNavigate();
	const userAccountInfoReducer = (state, action) => {
		const { type, payload } = action;
		switch (type) {
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

	const userAccountInfoInitialState = {
		username: "",
		password: "",
	};

	const [userAccountInfo, dispatchUserAccountInfo] = useReducer(
		userAccountInfoReducer,
		userAccountInfoInitialState
	);

	const handleSubmit = async (): Promise<void> => {
		setOpenIncorrectUserInfo(true);
		dispatch(login(userAccountInfo, navigate));
	};

	const handleCloseSnackbar = (): void => {
		setOpenIncorrectUserInfo(false);
	};

	return (
		<Container sx={styles.container}>
			<Typography variant="h3" sx={styles.title}>
				Bienvenu sur la page d'accueil !
			</Typography>
			<Stack spacing={2}>
				<TextField
					data-cy="username"
					label="Username"
					variant="outlined"
					size="small"
					value={userAccountInfo.username}
					onChange={(event) => {
						dispatchUserAccountInfo({
							type: "UPDATE_USERNAME",
							payload: event.target.value,
						});
					}}
				/>
				<TextField
					sx={{ backgroundColor: "white" }}
					data-cy="password"
					label="Password"
					variant="outlined"
					size="small"
					value={userAccountInfo.password}
					onChange={(event) => {
						dispatchUserAccountInfo({
							type: "UPDATE_PASSWORD",
							payload: event.target.value,
						});
					}}
				/>
				<Button
					variant="contained"
					disabled={
						!userAccountInfo.password.trim() || !userAccountInfo.username.trim()
					}
					onClick={handleSubmit}
				>
					Se connecter
				</Button>
			</Stack>
			{!user.isLoading && user.error !== false && (
				<Snackbar
					anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
					open={openIncorrectUserInfo}
					autoHideDuration={5000}
					onClose={handleCloseSnackbar}
				>
					<Alert onClose={handleCloseSnackbar} severity="warning">
						User not found. Maybe incorrect username/password ...
					</Alert>
				</Snackbar>
			)}
		</Container>
	);
};

export default Home;
