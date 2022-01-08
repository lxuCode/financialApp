const SPENDING_ALL = "SPENDING_ALL";
const SPENDING_NAME = "SPENDING_NAME";
const SPENDING_AMOUNT = "SPENDING_AMOUNT";
const SPENDING_COMMENT = "SPENDING_COMMENT";

export const updateSpending = (spendingData) => {
	console.log("spending", spendingData);
	return {
		type: SPENDING_ALL,
		payload: spendingData,
	};
};

export const updateSpendingName = (name) => {
	return {
		type: SPENDING_NAME,
		payload: name,
	};
};

export const updateSpendingAmount = (amount) => {
	return {
		type: SPENDING_AMOUNT,
		payload: amount,
	};
};

export const updateSpendingComment = (comment) => {
	return {
		type: SPENDING_COMMENT,
		payload: comment,
	};
};

const initialState = {
	name: "",
	amount: null,
	comment: "",
};

const spendingReducer = (state = initialState, action) => {
	switch (action.type) {
		case SPENDING_ALL:
			return { ...state, ...action.payload };
		case SPENDING_NAME:
			return { ...state, name: action.payload };
		case SPENDING_AMOUNT:
			return { ...state, amount: action.payload };
		case SPENDING_COMMENT:
			return { ...state, comment: action.payload };
		default:
			return { ...state };
	}
};

export default spendingReducer;
