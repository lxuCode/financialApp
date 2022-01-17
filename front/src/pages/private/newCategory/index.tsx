import React from "react";

import { Alert, AlertColor, Grid } from "@mui/material";

import PrivateSidebar from "../../../components/PrivateSidebar";
import CategoryForm from "./CategoryForm";
import CustomSnackbar from "../../../components/CustomSnackbar";
import { useSelector } from "react-redux";

const styles = {
	main: {
		height: "100vh",
		overflow: "auto",
	},
};
const NewCategory = () => {
	const snackbar = useSelector(
		(store: {
			snackbar: { isOpen: boolean; severity: AlertColor; message: string };
		}) => store.snackbar
	);

	return (
		<Grid container>
			<PrivateSidebar />
			<Grid item xs sx={styles.main}>
				<CategoryForm />
				<CustomSnackbar open={snackbar.isOpen}>
					<Alert severity={snackbar.severity}>{snackbar.message}</Alert>
				</CustomSnackbar>
			</Grid>
		</Grid>
	);
};

export default NewCategory;
