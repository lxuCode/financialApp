import React, { useContext } from "react";

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";

import { CategoryDetailsContext } from "./categoryDetailsContext";

const DeleteDialog = ({ open, closeDialog, handleDelete }) => {
	const { spendingId } = useContext(CategoryDetailsContext);

	return (
		<Dialog open={open}>
			<DialogTitle>Confirmer la suppression</DialogTitle>
			<DialogContent>La suppression est irréversible.</DialogContent>
			<DialogActions>
				<Button onClick={closeDialog}>Annuler</Button>
				<Button onClick={() => handleDelete(spendingId)}>Supprimer</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DeleteDialog;
