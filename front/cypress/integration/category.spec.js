import {
	categoriesOriginal,
	categoriesAfterSubmit,
} from "../fixtures/categories";
import { spendingsOriginal, spendingsAfterEdit } from "../fixtures/spendings";

describe("categoryDetails", () => {
	beforeEach(() => {
		cy.intercept(
			"/categories/all",
			{
				method: "GET",
				times: 1,
			},
			categoriesOriginal
		).as("getCategories");

		cy.visit("/");
		//login
		cy.get("[data-cy=username]").type("tester");
		cy.get("[data-cy=password]").type("tester");
		cy.get("button").contains("Se connecter").should("be.enabled").click();
		cy.wait("@getCategories");
	});

	it("User is able to see his category cards", () => {
		cy.get(".MuiPaper-root")
			.should("have.length", 2)
			.within(() => {
				cy.contains("Loyer");
				cy.contains("560 €");
				cy.contains("Alimentation");
				cy.contains("320 €");
			});
	});

	it("User is able to click on a category card and see details related to the category", () => {
		cy.intercept(
			"/categories/*",
			{
				method: "GET",
				times: 1,
			},
			{ name: "Loyer", totalSpending: 560 }
		).as("getCategory");
		cy.intercept(
			"/spendings/all/*",
			{
				method: "GET",
				times: 1,
			},
			spendingsOriginal
		).as("getSpendings");
		cy.get(".MuiPaper-root").first().click();
		cy.wait(["@getSpendings", "@getCategory"]);

		cy.get(".categoryItem").each((item, index) => {
			cy.wrap(item).should("contain.text", spendingsOriginal[index].name);
			cy.wrap(item).should("contain.text", spendingsOriginal[index].amount);
		});
	});

	it("User can modify spending details", () => {
		cy.intercept(
			"/categories/*",
			{
				method: "GET",
				times: 2,
			},
			{ name: "Loyer", totalSpending: 560 }
		).as("getCategory");
		cy.intercept(
			"/spendings/all/*",
			{
				method: "GET",
				times: 1,
			},
			spendingsOriginal
		).as("getSpendings");
		cy.intercept(
			"/spendings",
			{ method: "PUT", times: 1 },
			{
				...spendingsOriginal[1],
				name: "déco 1",
				amount: 350,
			}
		);

		cy.get(".MuiPaper-root").first().click();
		cy.wait("@getSpendings");
		cy.wait("@getCategory");

		cy.intercept(
			"/spendings/all/*",
			{
				method: "GET",
				times: 1,
			},
			spendingsAfterEdit
		).as("getSpendingsAfterEdit");
		cy.get(".categoryItem")
			.eq(1)
			.within(() => {
				cy.get("#editIcon").click();
				cy.get("[data-cy=spendingNewName]").type(" 1");
				cy.get("[data-cy=spendingNewAmount]").type(
					"{backspace}{backspace}{backspace}350"
				);
				cy.get("#confirmEditIcon").click();
			});

		// cy.wait("@getCategory");
		cy.wait("@getSpendingsAfterEdit");

		cy.get(".categoryItem").eq(1).contains("déco 1");
		cy.get(".categoryItem").eq(1).contains("350 €");
	});

	// it("When a category that doesn't exist yet is submitted, a success snackbar appears and a card with the newly created category appears", () => {
	// 	cy.intercept("POST", "/categories", {
	// 		statusCode: 200,
	// 		body: "La catégorie a bien été créée.",
	// 	});
	// 	cy.intercept(
	// 		"/categories/all/*",
	// 		{
	// 			method: "GET",
	// 			times: 1,
	// 		},
	// 		categoriesAfterSubmit
	// 	).as("getCategories");
	// 	cy.get("button").contains("Nouvelle catégorie").click();
	// 	cy.get("[data-cy=new-category-name]").type("Loisirs");
	// 	cy.get("button").contains("Soumettre").click();

	// 	cy.wait("@getCategories");

	// 	// snackbar appears
	// 	cy.get(".MuiSnackbar-root").within(() => {
	// 		cy.get(".MuiAlert-message").contains("La catégorie a bien été créée.");
	// 	});

	// 	// newly created category appears
	// 	cy.get(".MuiGrid-container").within(() => {
	// 		cy.get(".MuiPaper-root")
	// 			.should("have.length", 3)
	// 			.within(() => {
	// 				cy.get(".MuiTypography-h5").contains("Loyer");
	// 				cy.get(".MuiTypography-h6").contains("Total: 560 €");
	// 				cy.get(".MuiTypography-h5").contains("Alimentation");
	// 				cy.get(".MuiTypography-h6").contains("Total: 320 €");
	// 				cy.get(".MuiTypography-h5").contains("Loisirs");
	// 				cy.get(".MuiTypography-h6").contains("Total: 0 €");
	// 			});
	// 	});
	// });

	// it("When a category with an existing name is submitted, a warning snackbar appears and the category is not created", () => {
	// 	cy.intercept("POST", "/categories", {
	// 		statusCode: 400,
	// 		body: "La catégorie existe déjà.",
	// 	});

	// 	cy.get("button").contains("Nouvelle catégorie").click();
	// 	cy.get("[data-cy=new-category-name]").type("Loyer");
	// 	cy.get("button").contains("Soumettre").click();

	// 	// snackbar appears
	// 	cy.get(".MuiSnackbar-root").within(() => {
	// 		cy.get(".MuiAlert-message").contains("La catégorie existe déjà.");
	// 	});

	// 	// category is not created
	// 	cy.get(".MuiGrid-container").within(() => {
	// 		cy.get(".MuiPaper-root")
	// 			.should("have.length", 2)
	// 			.within(() => {
	// 				cy.get(".MuiTypography-h5").contains("Loyer");
	// 				cy.get(".MuiTypography-h6").contains("Total: 560 €");
	// 				cy.get(".MuiTypography-h5").contains("Alimentation");
	// 				cy.get(".MuiTypography-h6").contains("Total: 320 €");
	// 			});
	// 	});
	// });
});
