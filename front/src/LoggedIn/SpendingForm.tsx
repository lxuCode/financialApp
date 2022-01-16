import React, { useEffect, useReducer, useState } from "react";

import {
	Alert,
	AlertColor,
	Box,
	Button,
	Container,
	FormControl,
	MenuItem,
	Stack,
	TextField,
	Typography,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import CustomSnackbar from "../components/CustomSnackbar";
import { materialUiDateInput } from "../helpers/date";
import { getCategories } from "../services/categories";
import { addSpending } from "../services/spendings";
import {
	openSuccessSnackbar,
	openWarningSnackbar,
} from "../redux/features/snackbar";

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
	const snackbar = useSelector(
		(store: {
			snackbar: { isOpen: boolean; severity: AlertColor; message: string };
		}) => store.snackbar
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
					<CustomSnackbar open={snackbar.isOpen}>
						<Alert severity={snackbar.severity}>{snackbar.message}</Alert>
					</CustomSnackbar>
				</Container>
			</Box>
		)
	);
};

export default SpendingForm;
