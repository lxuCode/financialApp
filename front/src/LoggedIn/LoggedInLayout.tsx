import React from "react";

import { Box } from "@mui/material";

import Sidebar from "./Sidebar";

const styles = {
	layout: {
		display: "flex",
		backgroundColor: "#f8f8f8",
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

const LoggedInLayout = ({ children }: ComponentProps) => {
	return (
		<Box sx={styles.layout}>
			<Box sx={styles.left}>
				<Sidebar />
			</Box>
			<Box sx={styles.body}>{children}</Box>
		</Box>
	);
};

export default LoggedInLayout;
