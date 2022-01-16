import React, { useEffect, useState } from "react";

import { Grid, Paper } from "@mui/material";
import { useParams } from "react-router";

import PrivateSidebar from "../../../components/PrivateSidebar";
import SpendingPaper from "./SpendingPaper";
import CategoryPaper from "./CategoryPaper";
import { getSpendings } from "../../../services/spendings";

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
};

interface SpendingProps {
	_id: string;
	name: string;
	date: Date;
	amount: number;
	comment: string;
}

const CategoryDetails = () => {
	const [spendings, setSpendings] = useState<SpendingProps[]>([]);
	const [isEditable, setIsEditable] = useState<boolean>(true);
	const { categoryId } = useParams();

	const fetchSpendings = async () => {
		const spendings = await getSpendings(categoryId);
		setSpendings(spendings);
	};

	useEffect(() => {
		fetchSpendings();
	}, []);

	return (
		<Grid container>
			<PrivateSidebar />
			<Grid item xs sx={styles.main}>
				<h2 style={styles.title}>Dépenses</h2>
				<hr />
				<Grid container sx={styles.content} spacing={3}>
					<Grid item xs={12} sx={{ marginBottom: "50px" }}>
						<CategoryPaper />
					</Grid>
					{spendings.map((spending, index) => (
						<Grid item xs={12} key={index}>
							<SpendingPaper
								spending={spending}
								isEditable={isEditable}
								setIsEditable={setIsEditable}
							/>
						</Grid>
					))}
				</Grid>
			</Grid>
		</Grid>
	);
};

export default CategoryDetails;
