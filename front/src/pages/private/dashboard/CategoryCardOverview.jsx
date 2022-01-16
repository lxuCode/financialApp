import { Box, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import React from "react";

const styles = {
	paper: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		// backgroundImage: "linear-gradient(to bottom right, #e1deee, #6fd7ff)",
		height: "180px",
		// padding: "10px 40px",
		borderRadius: "5px",
		cursor: "pointer",
		// boxShadow: "0px 0px 5px 0px rgb(230, 230, 240)",
		"&:hover": {
			boxShadow: "0px 0px 5px 2px rgb(210, 210, 220)",
		},
	},
	cardTitle: {
		textAlign: "center",
		fontWeight: 600,
		padding: "5px 0",
		backgroundColor: "rgb(245,245,245)",
		borderRadius: "5px 5px 0 0",
	},
	cardContent: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "0 50px 30px 50px",
	},
	amountBox: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",

		flexGrow: 1,
		marginRight: "20px",
	},
	spentAmount: {
		fontSize: "24px",
		fontWeight: 600,
		// color: "white",
	},
	objectiveAmount: {
		fontSize: "14px",
		color: "#888",
	},
	diffAmount: {
		color: "green",
		fontSize: "24px",
		fontWeight: 600,
	},
};
const CategoryCardOverview = ({ category, onClick }) => {
	return (
		<Paper sx={styles.paper} onClick={onClick}>
			<Typography variant="h6" sx={styles.cardTitle}>
				{category.name}
			</Typography>
			<Box sx={styles.cardContent}>
				<Box sx={styles.left}>
					<span
						style={styles.spentAmount}
					>{`${category.totalSpending} €`}</span>
					<br />
					<span style={styles.objectiveAmount}>{category.objective} €</span>
				</Box>

				<Box sx={{ position: "relative", display: "inline-flex" }}>
					<CircularProgress
						sx={{ backgroundColor: "#bad2f0", borderRadius: "50%" }}
						size={80}
						variant="determinate"
						value={50}
					/>
					<Box
						sx={{
							top: 0,
							left: 0,
							bottom: 0,
							right: 0,
							position: "absolute",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Typography
							variant="caption"
							component="div"
							color="text.secondary"
						>
							{`50%`}
						</Typography>
					</Box>
				</Box>
			</Box>
		</Paper>
	);
};

export default CategoryCardOverview;
