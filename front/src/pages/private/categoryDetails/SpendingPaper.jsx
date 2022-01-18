import React, { useContext, useReducer, useState } from "react";

import { Box, Paper, TextField, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

import { CategoryDetailsContext } from "./categoryDetailsContext";

const styles = {
	paper: {
		display: "flex",
		padding: "15px 50px",
	},
	left: {
		display: "flex",
		justifyContent: "space-between",
		width: "85%",
	},
	info: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	},
	name: {
		fontWeight: 700,
		lineHeight: "1.5em",
	},
	date: {
		color: "#777",
		fontSize: "12px",
	},
	amount: {
		display: "flex",
		alignItems: "center",
		fontWeight: 600,
	},
	input: {
		"& .MuiInput-input": {
			paddingBottom: "0px",
		},
	},
	icon: {
		display: "flex",
		justifyContent: "flex-end",
		alignItems: "center",
		width: "15%",
	},
	rightIcon: {
		color: "#ffbfb4;",
		marginLeft: "15px",
	},
};
const SpendingPaper = ({
	spending,
	isEditable,
	setIsEditable,
	handleOpenDeleteDialog,
	handleEdit,
}) => {
	const [editMode, setEditMode] = useState(false);
	const { setSpendingId } = useContext(CategoryDetailsContext);

	const spendingReducer = (state, action) => {
		switch (action.type) {
			case "UPDATE_NAME":
				return { ...state, name: action.payload };
			case "UPDATE_AMOUNT":
				return { ...state, amount: action.payload };
			default:
				return { ...state };
		}
	};

	const [spendingEdited, dispatchSpendingEdited] = useReducer(
		spendingReducer,
		spending
	);

	const handleEditMode = () => {
		setEditMode(true);
		setIsEditable(false);
	};

	const handleEditClick = async () => {
		handleEdit(spendingEdited);
		setEditMode(false);
	};

	const handleUndo = () => {
		setEditMode(false);
		setIsEditable(true);
	};

	const handleDeleteClick = () => {
		handleOpenDeleteDialog();
		setSpendingId(spending._id);
	};

	return (
		<Paper sx={styles.paper}>
			<Box sx={styles.left}>
				<Box sx={styles.info}>
					<span style={styles.date}>{spending.date}</span>
					{editMode ? (
						<TextField
							variant="standard"
							value={spendingEdited.name}
							placeholder="ok"
							size="small"
							sx={styles.input}
							onChange={(event) => {
								dispatchSpendingEdited({
									type: "UPDATE_NAME",
									payload: event.target.value,
								});
							}}
							data-cy="spendingNewName"
						/>
					) : (
						<span style={styles.name}>{spending.name}</span>
					)}
				</Box>
				{editMode ? (
					<TextField
						variant="standard"
						placeholder="ok"
						size="small"
						sx={styles.input}
						value={spendingEdited.amount}
						onChange={(event) => {
							dispatchSpendingEdited({
								type: "UPDATE_AMOUNT",
								payload: event.target.value,
							});
						}}
						data-cy="spendingNewAmount"
					/>
				) : (
					<span style={styles.amount}>{spending.amount} €</span>
				)}
			</Box>
			<Box sx={styles.icon}>
				{isEditable ? (
					<>
						<EditIcon onClick={handleEditMode} id="editIcon" />
						<DeleteIcon
							onClick={() => handleDeleteClick()}
							sx={styles.rightIcon}
						/>
					</>
				) : editMode ? (
					<>
						<CheckIcon onClick={handleEditClick} id="confirmEditIcon" />
						<ClearIcon sx={styles.rightIcon} onClick={handleUndo} />
					</>
				) : (
					<></>
				)}
			</Box>
		</Paper>
	);
};

export default SpendingPaper;
