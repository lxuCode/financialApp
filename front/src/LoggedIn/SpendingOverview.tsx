import React, { useEffect, useReducer, useState } from "react";

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
	Alert,
} from "@mui/material";
import { useSelector } from "react-redux";

import CategoryCard from "./CategoryCard";
import { addCategory, getCategories } from "../services/categories";
import { useNavigate } from "react-router";
import CustomSnackbar from "../components/CustomSnackbar";

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

	const initialSnackbar = {
		open: false,
		severity: "warning",
		message: "",
	};

	const snackbarReducer = (state, action) => {
		const { type, payload } = action;

		switch (type) {
			case "UPDATE_ALL":
				return { ...state, ...payload };
			case "UPDATE_OPEN":
				return { ...state, open: payload };
			case "UPDATE_SEVERITY":
				return { ...state, severity: payload };
			case "UPDATE_MESSAGE":
				return { ...state, message: payload };
			default:
				return { ...state };
		}
	};

	const [openDialog, setOpenDialog] = useState(false);
	const [categoryName, setCategoryName] = useState("");
	const [categories, setCategories] = useState<Array<CategoryProps>>([]);
	const [snackbar, dispatchSnackbar] = useReducer(
		snackbarReducer,
		initialSnackbar
	);
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
			const res = await addCategory(newCategory);
			dispatchSnackbar({
				type: "UPDATE_ALL",
				payload: {
					open: true,
					severity: "success",
					message: res.data,
				},
			});

			fetchCategories();
		} catch (error: any | unknown) {
			dispatchSnackbar({
				type: "UPDATE_ALL",
				payload: {
					open: true,
					severity: "warning",
					message: error.response.data,
				},
			});
		} finally {
			handleCloseDialog();
			setCategoryName("");
		}
	};

	const onCloseSnackbar = () => {
		dispatchSnackbar({ type: "UPDATE_OPEN", payload: false });
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

				<CustomSnackbar open={snackbar.open} onClose={onCloseSnackbar}>
					<Alert severity={snackbar.severity}>{snackbar.message}</Alert>
				</CustomSnackbar>
			</Container>
		</Box>
	);
};

export default SpendingOverview;
