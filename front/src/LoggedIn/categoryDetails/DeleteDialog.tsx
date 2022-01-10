import React from "react";

import {
	AlertColor,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";

import { deleteSpending } from "../../services/spendings";
import { useDispatch } from "react-redux";
import {
	openSuccessSnackbar,
	openWarningSnackbar,
} from "../../redux/features/snackbar";

const DeleteDialog = ({ handleClose, spendingId }) => {
	const dispatch = useDispatch();

	const handleDelete = async () => {
		try {
			const res = await deleteSpending(spendingId);
			dispatch(openSuccessSnackbar(res));
		} catch (error: any | unknown) {
			dispatch(openWarningSnackbar(error.response.data));
		} finally {
			handleClose();
		}
	};

	return (
		<Dialog open onClose={handleClose}>
			<DialogTitle>Supprimer la dépense</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Veuillez confirmer la suppression de la dépense.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Annuler</Button>
				<Button onClick={handleDelete}>Supprimer</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DeleteDialog;
