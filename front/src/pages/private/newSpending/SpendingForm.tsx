import React, { useEffect, useReducer, useState } from "react";

import { Button, Grid, MenuItem, Paper, TextField } from "@mui/material";
import { useDispatch } from "react-redux";

import { getCategories } from "../../../services/categories";
import { materialUiDateInput } from "../../../helpers/date";
import { addSpending } from "../../../services/spendings";
import {
	openSuccessSnackbar,
	openWarningSnackbar,
} from "../../../redux/features/snackbar";

const styles = {
	paper: {
		maxWidth: "750px",
		margin: "50px auto",
		padding: "30px 50px",
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
		margin: "16px 0 16px 0",
	},
} as const;

interface CategoryProps {
	_id: string;
	name: string;
	isActive: Boolean;
	owner: string;
}

const SpendingForm = () => {
	const newSpendingInitialState = {
		categoryId: "",
		date: materialUiDateInput(new Date()),
		name: "",
		amount: null,
		comment: "",
	};
	const newSpendingReducer = (state, action) => {
		switch (action.type) {
			case "UPDATE_CATEGORY":
				return { ...state, categoryId: action.payload };
			case "UPDATE_DATE":
				return { ...state, date: action.payload };
			case "UPDATE_NAME":
				return { ...state, name: action.payload };
			case "UPDATE_AMOUNT":
				return { ...state, amount: action.payload };
			case "UPDATE_COMMENT":
				return { ...state, comment: action.payload };
			default:
				return state;
		}
	};

	const [newSpending, dispatchNewSpending] = useReducer(
		newSpendingReducer,
		newSpendingInitialState
	);

	const dispatch = useDispatch();

	const [categories, setCategories] = useState<Array<CategoryProps>>([]);

	useEffect(() => {
		const fetchCategories = async () => {
			const categories = await getCategories();
			setCategories(categories);
		};
		fetchCategories();
	}, []);

	const handleSubmit = async () => {
		try {
			const res = await addSpending(newSpending);
			dispatch(openSuccessSnackbar(res));
		} catch (error: any | unknown) {
			dispatch(openWarningSnackbar(error.response.data));
		}
	};

	return (
		<Paper elevation={10} sx={styles.paper}>
			<Grid sx={styles.formWrapper}>
				<h2>Ajouter une dépense</h2>

				<TextField
					select
					label="Categorie"
					variant="standard"
					fullWidth
					value={newSpending.categoryId}
					onChange={(event) => {
						dispatchNewSpending({
							type: "UPDATE_CATEGORY",
							payload: event.target.value,
						});
					}}
					size="small"
					required
					inputProps={{
						"data-cy": "spending-category",
					}}
				>
					{categories.map((category, index) => (
						<MenuItem value={category._id} key={index}>
							{category.name}
						</MenuItem>
					))}
				</TextField>
				<TextField
					variant="standard"
					label="Date"
					type="date"
					fullWidth
					sx={styles.textField}
					defaultValue={newSpending.date}
					onChange={(event) =>
						dispatchNewSpending({
							type: "UPDATE_DATE",
							payload: event.target.value,
						})
					}
					size="small"
					required
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<TextField
					variant="standard"
					label="Nom de la dépense"
					placeholder="Nommer la dépense"
					fullWidth
					sx={styles.textField}
					value={newSpending.name}
					onChange={(event) => {
						dispatchNewSpending({
							type: "UPDATE_NAME",
							payload: event?.target.value,
						});
					}}
				/>
				<TextField
					variant="standard"
					label="Montant"
					placeholder="Entrer le montant de la dépense"
					fullWidth
					sx={styles.textField}
					value={newSpending.amount}
					onChange={(event) => {
						dispatchNewSpending({
							type: "UPDATE_AMOUNT",
							payload: event.target.value,
						});
					}}
				/>
				<TextField
					variant="outlined"
					label="Commentaire"
					placeholder="Saisir un commentaire"
					fullWidth
					multiline
					rows={5}
					sx={styles.textField}
					value={newSpending.comment}
					onChange={(event) => {
						dispatchNewSpending({
							type: "UPDATE_COMMENT",
							payload: event.target.value,
						});
					}}
				/>
				<Button
					type="submit"
					color="primary"
					variant="contained"
					fullWidth
					sx={styles.submitButton}
					onClick={handleSubmit}
				>
					Valider
				</Button>
			</Grid>
		</Paper>
	);
};

export default SpendingForm;
