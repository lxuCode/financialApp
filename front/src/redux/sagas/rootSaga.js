import { takeLatest } from "redux-saga/effects";

import { LOGIN_REQUEST } from "../features/user";
import { handleLogin } from "./handlers/user";

export function* watcherSaga() {
	yield takeLatest(LOGIN_REQUEST, handleLogin);
}
