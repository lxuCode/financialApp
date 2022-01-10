export const SNACKBAR_OPEN_SUCCESS = "SNACKBAR_OPEN_SUCCESS";
export const SNACKBAR_OPEN_WARNING = "SNACKBAR_OPEN_WARNING";
export const SNACKBAR_CLOSE = "SNACKBAR_CLOSE";

export const openSuccessSnackbar = (message) => {
	return {
		type: SNACKBAR_OPEN_SUCCESS,
		payload: message,
	};
};

export const openWarningSnackbar = (message) => {
	return {
		type: SNACKBAR_OPEN_WARNING,
		payload: message,
	};
};

export const closeSnackbar = () => {
	return {
		type: SNACKBAR_CLOSE,
	};
};

const initialState = {
	isOpen: false,
	severity: "success",
	message: "",
};

const snackbarReducer = (state = initialState, action) => {
	switch (action.type) {
		case SNACKBAR_OPEN_SUCCESS:
			return {
				...state,
				isOpen: true,
				severity: "success",
				message: action.payload,
			};
		case SNACKBAR_OPEN_WARNING:
			return {
				...state,
				isOpen: true,
				severity: "warning",
				message: action.payload,
			};
		case SNACKBAR_CLOSE:
			return {
				...state,
				isOpen: false,
				message: "",
			};
		default:
			return { ...state };
	}
};

export default snackbarReducer;
