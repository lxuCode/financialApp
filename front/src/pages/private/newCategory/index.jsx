import React from "react";

import { Grid } from "@mui/material";

import PrivateSidebar from "../../../components/PrivateSidebar";
import CategoryForm from "./CategoryForm";

const styles = {
	main: {
		height: "100vh",
		overflow: "auto",
	},
};
const NewCategory = () => {
	return (
		<Grid container>
			<PrivateSidebar />
			<Grid item xs sx={styles.main}>
				<CategoryForm />
			</Grid>
		</Grid>
	);
};

export default NewCategory;
