import React from "react";

import { Alert, Snackbar } from "@mui/material";

const CustomSnackbar = ({ open, onClose, children }) => {
	return (
		<Snackbar
			anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			open={open}
			onClose={onClose}
			autoHideDuration={5000}
		>
			{children}
		</Snackbar>
	);
};

export default CustomSnackbar;
