import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "@redux-saga/core";

import { watcherSaga } from "./sagas/rootSaga";
import userReducer from "./features/user";
import spendingReducer from "./features/spending";

const rootReducer = combineReducers({
	user: userReducer,
	spending: spendingReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, {}, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watcherSaga);

export default store;
