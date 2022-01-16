import React, { useEffect, useState } from "react";

import { Grid, Paper, Typography } from "@mui/material";

import PrivateSidebar from "../../../components/PrivateSidebar";
import CategoryCardOverview from "./CategoryCardOverview";
import { getCategories } from "../../../services/categories";
import { useNavigate } from "react-router";

const styles = {
	main: {
		height: "100vh",
		overflow: "auto",
		padding: "30px 50px",
		backgroundColor: "rgb(247,249,252)",
	},
	content: {
		marginTop: "30px",
	},
	title: {},
} as const;

interface CategoryProps {
	_id: string;
	name: string;
	objective: number;
	isActive: Boolean;
	owner: string;
	totalSpending: number;
}

const Dashboard = () => {
	const navigate = useNavigate();
	const [categories, setCategories] = useState<Array<CategoryProps>>([]);

	const fetchCategories = async () => {
		const categories = await getCategories();
		setCategories(categories);
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	const handleClickCard = (categoryId) => {
		navigate(`/${categoryId}/details`);
	};

	console.log(categories);

	return (
		<Grid container>
			<PrivateSidebar />
			<Grid item xs sx={styles.main}>
				<h2 style={styles.title}>Dashboard</h2>
				<hr />
				<Grid container sx={styles.content} spacing={4}>
					{categories.map((category, index) => (
						<Grid item xs={4} key={index}>
							<CategoryCardOverview
								category={category}
								onClick={() => handleClickCard(category._id)}
							/>
						</Grid>
					))}
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Dashboard;
