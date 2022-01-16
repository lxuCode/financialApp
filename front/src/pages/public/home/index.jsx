import React from "react";

import { Grid } from "@mui/material";

import LoginForm from "./LoginForm";
import PublicSidebar from "../../../components/PublicSidebar";

const styles = {
	main: {
		backgroundColor: "#eaeaf4",
		height: "100vh",
		overflow: "auto",
	},
};

const Home = () => {
	return (
		<Grid container>
			<PublicSidebar />
			<Grid item xs sx={styles.main}>
				<LoginForm />
			</Grid>
		</Grid>
	);
};

export default Home;
