import React from "react";

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Stack,
	TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { updateSpending } from "../../services/spendings";
import {
	updateSpendingAmount,
	updateSpendingComment,
	updateSpendingName,
} from "../../redux/features/spending";
import {
	openSuccessSnackbar,
	openWarningSnackbar,
} from "../../redux/features/snackbar";

const EditDialog = ({ handleClose }) => {
	const spending = useSelector(
		(store: { spending: { name: String; amount: Number; comment: String } }) =>
			store.spending
	);

	const dispatch = useDispatch();

	const handleEdit = async () => {
		try {
			const res = await updateSpending(spending);
			dispatch(openSuccessSnackbar(res));
		} catch (error) {
			dispatch(openWarningSnackbar(error));
			console.log(error);
		} finally {
			handleClose();
		}
	};

	return (
		<Dialog open fullWidth>
			<DialogTitle>Modifier la dépense</DialogTitle>
			<DialogContent>
				<Stack spacing={2}>
					<TextField
						variant="outlined"
						size="small"
						label="Nom"
						fullWidth
						value={spending?.name}
						margin="dense"
						onChange={(event) => {
							dispatch(updateSpendingName(event.target.value));
						}}
					/>
					<TextField
						variant="outlined"
						size="small"
						label="Montant"
						fullWidth
						value={spending?.amount}
						margin="dense"
						type="number"
						onChange={(event) =>
							dispatch(updateSpendingAmount(event.target.value))
						}
					/>
					<TextField
						variant="outlined"
						size="small"
						label="Commentaire"
						fullWidth
						value={spending?.comment}
						margin="dense"
						onChange={(event) => {
							dispatch(updateSpendingComment(event.target.value));
						}}
					/>
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Annuler</Button>
				<Button onClick={handleEdit}>Modifier</Button>
			</DialogActions>
		</Dialog>
	);
};

export default EditDialog;
