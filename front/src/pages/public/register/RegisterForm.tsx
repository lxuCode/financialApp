import React, { useReducer } from "react";

import {
	Avatar,
	Button,
	Grid,
	Link,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch } from "react-redux";

import { register } from "../../../services/user";
import {
	openSuccessSnackbar,
	openWarningSnackbar,
} from "../../../redux/features/snackbar";

const styles = {
	paper: {
		height: "70vh",
		width: "350px",
		margin: "50px auto 30px auto",
		padding: "30px 50px",
	},
	formWrapper: {
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

const RegisterForm = () => {
	const registerInfoReducer = (state, action) => {
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
	const initialStateRegisterInfo = {
		email: "",
		username: "",
		password: "",
	};
	const [registerInfo, dispatchRegisterInfo] = useReducer(
		registerInfoReducer,
		initialStateRegisterInfo
	);

	const dispatch = useDispatch();

	const handleSubmit = async (): Promise<void> => {
		try {
			const res = await register(registerInfo);
			dispatch(openSuccessSnackbar(res));
		} catch (err) {
			dispatch(openWarningSnackbar());
		}
	};

	return (
		<Paper elevation={10} sx={styles.paper}>
			<Grid sx={styles.formWrapper}>
				<Avatar sx={styles.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<h2>Se créer un compte</h2>
				<TextField
					variant="standard"
					label="Email"
					placeholder="Entrer votre email"
					fullWidth
					value={registerInfo.email}
					onChange={(event) =>
						dispatchRegisterInfo({
							type: "UPDATE_EMAIL",
							payload: event.target.value,
						})
					}
				/>
				<TextField
					variant="standard"
					label="Nom d'utilisateur"
					placeholder="Entrer votre nom d'utilisateur"
					fullWidth
					value={registerInfo.username}
					onChange={(event) =>
						dispatchRegisterInfo({
							type: "UPDATE_USERNAME",
							payload: event.target.value,
						})
					}
				/>
				<TextField
					variant="standard"
					label="Mot de passe"
					placeholder="Entrer votre mot de passe"
					type="password"
					fullWidth
					value={registerInfo.password}
					onChange={(event) =>
						dispatchRegisterInfo({
							type: "UPDATE_PASSWORD",
							payload: event.target.value,
						})
					}
				/>
				<Button
					type="submit"
					color="primary"
					variant="contained"
					fullWidth
					sx={styles.submitButton}
					onClick={handleSubmit}
				>
					Créer mon compte
				</Button>
				<Typography>
					<Link href="#">Déjà inscrit ?</Link>
				</Typography>
			</Grid>
		</Paper>
	);
};

export default RegisterForm;
