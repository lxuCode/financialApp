import React, { useEffect, useState } from "react";

import axios, { AxiosError } from "axios";
import {
	Box,
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	TextField,
	Typography,
	Snackbar,
	Alert,
} from "@mui/material";
import { useSelector } from "react-redux";

import CategoryCard from "./CategoryCard";
import { getCategories } from "../services/categories";
import { useNavigate } from "react-router";

const styles = {
	root: {
		height: "100vh",
		overflow: "auto",
	},
	container: {
		width: "90%",
		pt: 3,
		pb: 4,
	},
	title: {
		textAlign: "center",
		marginBottom: 3,
	},
} as const;

interface CategoryProps {
	_id: string;
	name: string;
	isActive: Boolean;
	owner: string;
	totalSpending: number;
}

const SpendingOverview = () => {
	const username = useSelector(
		(state: { user: { user: String } }) => state.user.user
	);

	const [openDialog, setOpenDialog] = useState(false);
	const [categoryName, setCategoryName] = useState("");
	const [categories, setCategories] = useState<Array<CategoryProps>>([]);
	const [openCategorySubmitSuccess, setOpenCategorySubmitSuccess] = useState(
		false
	);
	const [openCategorySubmitFailed, setOpenCategorySubmitFailed] = useState(
		false
	);
	const [snackbarMessage, setSnackbarMessage] = useState<String>("");

	const navigate = useNavigate();

	const fetchCategories = async () => {
		const categories = await getCategories(username);
		setCategories(categories);
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	const handleCategoryName = (event) => {
		setCategoryName(event.target.value);
	};

	const handleOpenDialog = (): void => {
		setOpenDialog(true);
	};

	const handleCloseDialog = (): void => {
		setOpenDialog(false);
	};

	const handleSubmit = async (): Promise<void> => {
		const newCategory = {
			username: username,
			categoryName: categoryName,
		};
		try {
			const res = await axios.post(
				"http://localhost:5000/categories",
				newCategory,
				{
					withCredentials: true,
				}
			);
			handleCloseDialog();
			setSnackbarMessage(res.data);
			setOpenCategorySubmitSuccess(true);
			fetchCategories();
		} catch (error: any | unknown) {
			setSnackbarMessage(error.response.data);
			setOpenCategorySubmitFailed(true);
			handleCloseDialog();
		}
	};

	const handleCloseSnackbarSuccess = () => {
		setOpenCategorySubmitSuccess(false);
	};

	const handleCloseSnackbarFailed = () => {
		setOpenCategorySubmitFailed(false);
	};

	return (
		<Box sx={styles.root}>
			<Container sx={styles.container}>
				<Typography variant="h3" sx={styles.title}>
					Mes dépenses par catégories
				</Typography>
				<Button onClick={handleOpenDialog} variant="contained" sx={{ my: 3 }}>
					Nouvelle catégorie
				</Button>
				{categories && (
					<Grid container spacing={5}>
						{categories.map((category, index) => (
							<Grid key={index} item xs={4}>
								<CategoryCard
									categoryName={category.name}
									totalSpending={category.totalSpending}
									onClick={() => navigate(`/${category._id}/details`)}
								/>
							</Grid>
						))}
					</Grid>
				)}
				<Dialog open={openDialog} onClose={handleCloseDialog}>
					<DialogTitle>Nouvelle catégorie</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Veuillez saisir le nom de la nouvelle catégorie.
						</DialogContentText>
						<TextField
							data-cy="new-category-name"
							label="Nom de la catégorie"
							value={categoryName}
							variant="outlined"
							autoFocus
							margin="dense"
							fullWidth
							onChange={(event) => handleCategoryName(event)}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCloseDialog}>Annuler</Button>
						<Button onClick={handleSubmit} disabled={!categoryName}>
							Soumettre
						</Button>
					</DialogActions>
				</Dialog>
				<Snackbar
					data-cy="snackbar-success"
					anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
					open={openCategorySubmitSuccess}
					autoHideDuration={5000}
					onClose={handleCloseSnackbarSuccess}
				>
					<Alert data-cy="alert-success" onClose={() => {}} severity="success">
						{snackbarMessage}
					</Alert>
				</Snackbar>
				<Snackbar
					data-cy="snackbar-failed"
					anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
					open={openCategorySubmitFailed}
					autoHideDuration={5000}
					onClose={handleCloseSnackbarFailed}
				>
					<Alert data-cy="alert-failed" onClose={() => {}} severity="warning">
						{snackbarMessage}
					</Alert>
				</Snackbar>
			</Container>
		</Box>
	);
};

export default SpendingOverview;
