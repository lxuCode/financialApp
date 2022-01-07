export const LOGIN_REQUEST = "LOGIN_REQUEST";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILED = "LOGIN_FAILED";

export const login = (userAccountInfo, navigate) => {
	return {
		type: LOGIN_REQUEST,
		payload: { ...userAccountInfo, navigate },
	};
};

export const loginSuccess = (login) => {
	return {
		type: LOGIN_SUCCESS,
		payload: login,
	};
};

export const loginFailed = (error) => {
	return {
		type: LOGIN_FAILED,
		payload: error,
	};
};

const initialState = {
	user: undefined,
	isLoading: false,
	error: false,
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				isLoading: false,
				user: action.payload,
				error: false,
			};
		case LOGIN_FAILED:
			console.log("failed", action.payload);
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default userReducer;
