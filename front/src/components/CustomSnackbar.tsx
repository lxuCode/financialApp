import React from "react";

import { Snackbar } from "@mui/material";
import { useDispatch } from "react-redux";
import { closeSnackbar } from "../redux/features/snackbar";

const CustomSnackbar = ({ open, children }) => {
	const dispatch = useDispatch();

	const handleClose = () => {
		dispatch(closeSnackbar());
	};

	return (
		<Snackbar
			anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			open={open}
			onClose={handleClose}
			autoHideDuration={5000}
		>
			{children}
		</Snackbar>
	);
};

export default CustomSnackbar;
