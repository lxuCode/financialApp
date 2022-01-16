import React from "react";

import { Alert, AlertColor, Grid } from "@mui/material";
import { useSelector } from "react-redux";

import CustomSnackbar from "../../../components/CustomSnackbar";
import PrivateSidebar from "../../../components/PrivateSidebar";
import SpendingForm from "./SpendingForm";

const styles = {
	main: {
		height: "100vh",
		overflow: "auto",
	},
};

const NewSpending = () => {
	const snackbar = useSelector(
		(store: {
			snackbar: { isOpen: boolean; severity: AlertColor; message: string };
		}) => store.snackbar
	);

	return (
		<Grid container>
			<PrivateSidebar />
			<Grid item xs sx={styles.main}>
				<SpendingForm />
				<CustomSnackbar open={snackbar.isOpen}>
					<Alert severity={snackbar.severity}>{snackbar.message}</Alert>
				</CustomSnackbar>
			</Grid>
		</Grid>
	);
};

export default NewSpending;
