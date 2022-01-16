import React from "react";

import { Alert, AlertColor, Grid } from "@mui/material";
import { useSelector } from "react-redux";

import RegisterForm from "./RegisterForm";
import PublicSidebar from "../../../components/PublicSidebar";
import CustomSnackbar from "../../../components/CustomSnackbar";

const styles = {
	main: {
		height: "100vh",
		overflow: "auto",
		backgroundColor: "#eaeaf4",
	},
};
const Register = () => {
	const snackbar = useSelector(
		(store: {
			snackbar: { isOpen: boolean; severity: AlertColor; message: string };
		}) => store.snackbar
	);

	return (
		<Grid container>
			<PublicSidebar />
			<Grid item xs sx={styles.main}>
				<RegisterForm />
				<CustomSnackbar open={snackbar.isOpen}>
					<Alert severity={snackbar.severity}>{snackbar.message}</Alert>
				</CustomSnackbar>
			</Grid>
		</Grid>
	);
};

export default Register;
