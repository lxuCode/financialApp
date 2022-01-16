import React from "react";

import { Box, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const styles = {
	wrapper: {
		position: "relative",
	},
	icons: {
		position: "absolute",
		top: "5px",
		right: "10px",
	},
	paper: {
		height: "100px",
		display: "flex",
		padding: "15px 50px",
		justifyContent: "space-between",
		alignItems: "center",
	},
	left: {
		display: "flex",
		flexDirection: "column",
	},
	right: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-end",
	},
	mainInfo: {
		fontWeight: 600,
		fontSize: "24px",
	},
	secondaryInfo: {
		color: "rgb(130,130,130)",
		fontSize: "14px",
	},
};
const CategoryPaper = () => {
	return (
		<Box sx={styles.wrapper}>
			<DeleteIcon sx={styles.icons} />
			<Paper sx={styles.paper}>
				<Box sx={styles.left}>
					<span style={styles.mainInfo}>Catégorie</span>
					<span style={styles.secondaryInfo}>Objectif: moins de 3 3500€</span>
				</Box>
				<Box sx={styles.right}>
					<span style={styles.mainInfo}>3 000€</span>
					<span style={styles.secondaryInfo}>
						dépensés depuis le début du mois
					</span>
				</Box>
			</Paper>
		</Box>
	);
};

export default CategoryPaper;
