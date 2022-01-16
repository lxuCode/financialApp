import React, { useReducer } from "react";

import { Button, Grid, Paper, TextField } from "@mui/material";

import { addCategory } from "../../../services/categories";
import { useDispatch } from "react-redux";
import {
	openSuccessSnackbar,
	openWarningSnackbar,
} from "../../../redux/features/snackbar";

const styles = {
	paper: {
		maxWidth: "750px",
		height: "450px",
		margin: "50px auto",
		padding: "30px",
	},
	formWrapper: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	textField: {
		marginTop: "20px",
	},
	submitButton: {
		marginTop: "20px",
	},
} as const;

const CategoryForm = () => {
	const categoryInitial = {
		name: "",
		objective: "",
	};

	const categoryReducer = (state, action) => {
		switch (action.type) {
			case "UPDATE_NAME":
				return { ...state, name: action.payload };
			case "UPDATE_OBJECTIVE":
				return { ...state, objective: action.payload };
			default:
				return { ...state };
		}
	};

	const [newCategory, dispatchNewCategory] = useReducer(
		categoryReducer,
		categoryInitial
	);

	const dispatch = useDispatch();

	const handleSubmit = async (): Promise<void> => {
		try {
			const res = await addCategory(newCategory);
			dispatch(openSuccessSnackbar(res));
			// await fetchCategories();
		} catch (error: any | unknown) {
			dispatch(openWarningSnackbar(error.response.data));
		} finally {
			// handleCloseDialog();
			// setCategoryName("");
		}
	};

	return (
		<Paper elevation={9} sx={styles.paper}>
			<Grid sx={styles.formWrapper}>
				<h2>Créer une catégorie</h2>
				<TextField
					variant="standard"
					label="Nom de la catégorie"
					placeholder="Entrer le nom de la nouvell catégorie"
					fullWidth
					value={newCategory.name}
					onChange={(event) => {
						dispatchNewCategory({
							type: "UPDATE_NAME",
							payload: event.target.value,
						});
					}}
				/>
				<TextField
					variant="standard"
					label="Montant objectif"
					placeholder="Entrer le montant objectif à ne pas dépasser"
					fullWidth
					sx={styles.textField}
					value={newCategory.objective}
					onChange={(event) => {
						dispatchNewCategory({
							type: "UPDATE_OBJECTIVE",
							payload: event.target.value,
						});
					}}
				/>
				<Button
					variant="contained"
					sx={styles.submitButton}
					onClick={handleSubmit}
				>
					Valider
				</Button>
			</Grid>
		</Paper>
	);
};

export default CategoryForm;
