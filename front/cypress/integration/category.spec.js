import {
	categoriesOriginal,
	categoriesAfterSubmit,
} from "../fixtures/categories";

describe("home", () => {
	beforeEach(() => {
		cy.intercept(
			"/categories/all/*",
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

	it("When a category that doesn't exist yet is submitted, a success snackbar appears and a card with the newly created category appears", () => {
		cy.intercept("POST", "/categories", {
			statusCode: 200,
			body: "La catégorie a bien été créée.",
		});
		cy.intercept(
			"/categories/all/*",
			{
				method: "GET",
				times: 1,
			},
			categoriesAfterSubmit
		).as("getCategories");
		cy.get("button").contains("Nouvelle catégorie").click();
		cy.get("[data-cy=new-category-name]").type("Loisirs");
		cy.get("button").contains("Soumettre").click();

		cy.wait("@getCategories");

		// snackbar appears
		cy.get(".MuiSnackbar-root").within(() => {
			cy.get(".MuiAlert-message").contains("La catégorie a bien été créée.");
		});

		// newly created category appears
		cy.get(".MuiGrid-container").within(() => {
			cy.get(".MuiPaper-root")
				.should("have.length", 3)
				.within(() => {
					cy.get(".MuiTypography-h5").contains("Loyer");
					cy.get(".MuiTypography-h6").contains("Total: 560 €");
					cy.get(".MuiTypography-h5").contains("Alimentation");
					cy.get(".MuiTypography-h6").contains("Total: 320 €");
					cy.get(".MuiTypography-h5").contains("Loisirs");
					cy.get(".MuiTypography-h6").contains("Total: 0 €");
				});
		});
	});

	it("When a category with an existing name is submitted, a warning snackbar appears and the category is not created", () => {
		cy.intercept("POST", "/categories", {
			statusCode: 400,
			body: "La catégorie existe déjà.",
		});

		cy.get("button").contains("Nouvelle catégorie").click();
		cy.get("[data-cy=new-category-name]").type("Loyer");
		cy.get("button").contains("Soumettre").click();

		// snackbar appears
		cy.get(".MuiSnackbar-root").within(() => {
			cy.get(".MuiAlert-message").contains("La catégorie existe déjà.");
		});

		// category is not created
		cy.get(".MuiGrid-container").within(() => {
			cy.get(".MuiPaper-root")
				.should("have.length", 2)
				.within(() => {
					cy.get(".MuiTypography-h5").contains("Loyer");
					cy.get(".MuiTypography-h6").contains("Total: 560 €");
					cy.get(".MuiTypography-h5").contains("Alimentation");
					cy.get(".MuiTypography-h6").contains("Total: 320 €");
				});
		});
	});
});
