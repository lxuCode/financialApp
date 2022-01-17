import { createContext, Dispatch, SetStateAction } from "react";

interface IThemeContext {
	spendingId: String | undefined;
	setSpendingId?: Dispatch<SetStateAction<undefined>>;
}

const defaultState = {
	spendingId: undefined,
};
const CategoryDetailsContext = createContext<IThemeContext>(defaultState);

export { CategoryDetailsContext };
