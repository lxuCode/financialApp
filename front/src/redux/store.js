import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "@redux-saga/core";

import { watcherSaga } from "./sagas/rootSaga";
import userReducer from "./features/user";

const rootReducer = combineReducers({
	user: userReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, {}, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watcherSaga);

export default store;
