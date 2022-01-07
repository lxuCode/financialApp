import React from "react";

import { Box } from "@mui/material";

import Sidebar from "./Sidebar";

const styles = {
	layout: {
		display: "flex",
		backgroundColor: "#fcfcfc",
	},
	left: {
		flex: 2.2,
	},
	body: {
		flex: 9.8,
	},
};

interface ComponentProps {
	children: JSX.Element;
}

const LoggedOutLayout = ({ children }: ComponentProps) => {
	return (
		<Box sx={styles.layout}>
			<Box sx={styles.left}>
				<Sidebar />
			</Box>
			<Box sx={styles.body}>{children}</Box>
		</Box>
	);
};

export default LoggedOutLayout;
