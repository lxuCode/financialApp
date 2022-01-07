import { call, put } from "redux-saga/effects";
import { loginFailed, loginSuccess } from "../../features/user";
import { loginRequest } from "../requests/user";

export function* handleLogin(action) {
	try {
		console.log(action);
		const userLogin = yield call(loginRequest, action.payload);
		yield put(loginSuccess(userLogin));
		yield action.payload.navigate("myAccount");
	} catch (error) {
		yield put(loginFailed(error.message));
	}
}
