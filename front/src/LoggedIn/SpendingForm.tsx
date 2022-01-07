import React, { useEffect, useReducer, useState } from "react";

import {
	Alert,
	Box,
	Button,
	Container,
	FormControl,
	MenuItem,
	Snackbar,
	Stack,
	TextField,
	Typography,
} from "@mui/material";

import { useSelector } from "react-redux";
import { materialUiDateInput } from "../helpers/date";
import { getCategories } from "../services/categories";
import axios from "axios";

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
	const username = useSelector(
		(state: { user: { user: string } }) => state.user.user
	);
	const [categories, setCategories] = useState<Array<CategoryProps>>([]);
	const [openSubmitSuccess, setOpenSubmitSuccess] = useState<boolean>(false);
	const [openSubmitFailed, setOpenSubmitFailed] = useState<boolean>(false);
	const [snackbarMessage, setSnackbarMessage] = useState<String>("");

	useEffect(() => {
		const fetchCategories = async () => {
			const categories = await getCategories(username);
			setCategories(categories);
		};
		fetchCategories();
	}, []);

	const handleSubmit = async () => {
		try {
			const res = await axios.post(
				"http://localhost:5000/spendings",
				newSpending,
				{
					withCredentials: true,
				}
			);
			setSnackbarMessage(res.data);
			setOpenSubmitSuccess(true);
		} catch (error: any | unknown) {
			setSnackbarMessage(error.response.data);
			setOpenSubmitFailed(true);
			console.log(error);
		}
	};

	const handleCloseSnackbarSuccess = () => {
		setOpenSubmitSuccess(false);
	};

	const handleCloseSnackbarFailed = () => {
		setOpenSubmitFailed(false);
	};

	return (
		categories.length > 0 && (
			<Box sx={styles.root}>
				<Container sx={styles.container}>
					<Typography variant="h3" sx={styles.title}>
						Nouvelle dépense
					</Typography>
					<Stack spacing={2}>
						<FormControl fullWidth>
							<TextField
								select
								label="Categorie"
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
						</FormControl>
						<TextField
							variant="outlined"
							label="Date"
							type="date"
							defaultValue={newSpending.date}
							onChange={(event) =>
								dispatchNewSpending({
									type: "UPDATE_DATE",
									payload: event.target.value,
								})
							}
							fullWidth
							size="small"
							required
							InputLabelProps={{
								shrink: true,
							}}
							inputProps={{ "data-cy": "spending-date" }}
						/>
						<TextField
							data-cy="spending-name"
							variant="outlined"
							label="Nom de la dépense"
							value={newSpending.name}
							onChange={(event) => {
								dispatchNewSpending({
									type: "UPDATE_NAME",
									payload: event.target.value,
								});
							}}
							fullWidth
							size="small"
							required
						/>
						<TextField
							data-cy="spending-amount"
							variant="outlined"
							label="Montant de la dépense"
							type="number"
							value={newSpending.amount}
							onChange={(event) => {
								dispatchNewSpending({
									type: "UPDATE_AMOUNT",
									payload: event.target.value,
								});
							}}
							required
							fullWidth
							size="small"
						/>
						<TextField
							data-cy="spending-comment"
							variant="outlined"
							label="Commentaire"
							value={newSpending.comment}
							onChange={(event) => {
								dispatchNewSpending({
									type: "UPDATE_COMMENT",
									payload: event.target.value,
								});
							}}
							multiline
							minRows={5}
							fullWidth
							size="small"
						/>
						<Button
							variant="contained"
							onClick={() => {
								handleSubmit();
							}}
							disabled={
								!newSpending.categoryId ||
								!newSpending.name ||
								!newSpending.amount
							}
						>
							Ajouter
						</Button>
					</Stack>
					<Snackbar
						data-cy="snackbar-success"
						anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
						open={openSubmitSuccess}
						autoHideDuration={5000}
						onClose={handleCloseSnackbarSuccess}
					>
						<Alert
							data-cy="alert-success"
							onClose={handleCloseSnackbarSuccess}
							severity="success"
						>
							{snackbarMessage}
						</Alert>
					</Snackbar>
					<Snackbar
						data-cy="snackbar-failed"
						anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
						open={openSubmitFailed}
						autoHideDuration={5000}
						onClose={handleCloseSnackbarFailed}
					>
						<Alert
							data-cy="alert-failed"
							onClose={handleCloseSnackbarFailed}
							severity="error"
						>
							Une erreur est survenue. La dépense n'a pas été enregistrée.
						</Alert>
					</Snackbar>
				</Container>
			</Box>
		)
	);
};

export default SpendingForm;
