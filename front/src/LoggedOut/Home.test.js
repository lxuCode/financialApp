import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import Home from "./Home";
import store from "../redux/store";
import userEvent from "@testing-library/user-event";

test("On initial render, the log in button is disable", () => {
	render(
		<Provider store={store}>
			<Home />
		</Provider>,
		{ wrapper: MemoryRouter }
	);

	expect(screen.getByRole("button", { name: "Se connecter" })).toBeDisabled();
});

test("if a username and a password is entered, the log in button is enable", async () => {
	render(
		<Provider store={store}>
			<Home />
		</Provider>,
		{ wrapper: MemoryRouter }
	);
	userEvent.type(screen.getByLabelText("Username"), "userblabla");
	userEvent.type(screen.getByLabelText("Password"), "blabla");
	//screen.debug();
	expect(
		await screen.findByRole("button", { name: "Se connecter" })
	).toBeEnabled();
});
