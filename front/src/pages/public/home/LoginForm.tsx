import React, { useReducer } from "react";

import {
	Alert,
	AlertColor,
	Avatar,
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	Link,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { login } from "../../../redux/features/user";
import CustomSnackbar from "../../../components/CustomSnackbar";

const styles = {
	paper: {
		height: "70vh",
		width: "350px",
		margin: "50px auto 30px auto",
		padding: "30px 50px",
	},
	loginWrapper: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		backgroundColor: "#1bbd7e",
	},
	checkbox: {
		alignSelf: "flex-start",
	},
	submitButton: {
		margin: "16px 0 16px 0",
	},
} as const;

const LoginForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const credentialsReducer = (state, action) => {
		switch (action.type) {
			case "UPDATE_USERNAME":
				return {
					...state,
					username: action.payload,
				};
			case "UPDATE_PASSWORD":
				return {
					...state,
					password: action.payload,
				};
			default:
				return state;
		}
	};

	const credentialsInitialState = {
		username: "",
		password: "",
	};

	const [credentials, dispatchCredentials] = useReducer(
		credentialsReducer,
		credentialsInitialState
	);

	const snackbar = useSelector(
		(store: {
			snackbar: { isOpen: boolean; severity: AlertColor; message: string };
		}) => store.snackbar
	);

	const handleSubmit = async (): Promise<void> => {
		// setOpenIncorrectUserInfo(true);
		dispatch(login(credentials, navigate));
	};

	return (
		<Paper elevation={10} sx={styles.paper}>
			<Grid sx={styles.loginWrapper}>
				<Avatar sx={styles.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<h2>Connexion</h2>

				<TextField
					variant="standard"
					label="Nom d'utilisateur"
					placeholder="Entrer votre nom d'utilisateur"
					fullWidth
					value={credentials.username}
					onChange={(event) => {
						dispatchCredentials({
							type: "UPDATE_USERNAME",
							payload: event.target.value,
						});
					}}
					data-cy="username"
				/>
				<TextField
					variant="standard"
					label="Mot de passe"
					placeholder="Entrer votre mot de passe"
					type="password"
					fullWidth
					value={credentials.password}
					onChange={(event) => {
						dispatchCredentials({
							type: "UPDATE_PASSWORD",
							payload: event.target.value,
						});
					}}
					data-cy="password"
				/>
				{/* <FormControlLabel
						control={<Checkbox name="checked" color="primary" />}
						label="Connexion automatique"
						sx={styles.checkbox}
					/> */}
				<Button
					type="submit"
					color="primary"
					variant="contained"
					fullWidth
					sx={styles.submitButton}
					onClick={handleSubmit}
				>
					Se connecter
				</Button>
				<Typography>
					<Link href="#">Mot de passe oublié</Link>
				</Typography>
				<Typography>
					<Link href="#">Créer un compte</Link>
				</Typography>
			</Grid>
			<CustomSnackbar open={snackbar.isOpen}>
				<Alert severity={snackbar.severity}>{snackbar.message}</Alert>
			</CustomSnackbar>
		</Paper>
	);
};

export default LoginForm;
