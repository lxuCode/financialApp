import { grey } from "@mui/material/colors";
import { categoriesOriginal } from "../fixtures/categories";

describe("Spending", () => {
	beforeEach(() => {
		cy.intercept(
			"/categories/all/*",
			{
				method: "GET",
			},
			categoriesOriginal
		).as("getCategories");

		cy.visit("/");
		cy.get("[data-cy=username]").type("tester");
		cy.get("[data-cy=password]").type("tester");
		cy.get("button").contains("Se connecter").click();
		cy.wait("@getCategories");
		cy.contains("Ajouter une dépense").click();
		cy.wait("@getCategories");
	});

	it("When some required fields are not fullfill, the 'Ajouter' button is disable", () => {
		cy.get("button").contains("Ajouter").should("be.disabled");
	});

	it("When all required fields are fullfill, user can submit the spending", () => {
		cy.intercept(
			"/spendings",
			{ method: "POST" },
			{ statusCode: 200, body: "La dépense a bien été ajoutée." }
		);

		cy.get("[data-cy=spending-category]").parent().click();
		cy.get("[role=option]").contains("Alimentation").click();
		cy.get("[data-cy=spending-date]").parent().click().type("2022-01-05");
		cy.get("[data-cy=spending-name]").type("Courses");
		cy.get("[data-cy=spending-amount]").type("50");
		cy.get("button").contains("Ajouter").click();

		cy.get("[data-cy=snackbar-success]").within(() => {
			cy.get("[data-cy=alert-success]").contains(
				"La dépense a bien été ajoutée."
			);
		});
	});
});
