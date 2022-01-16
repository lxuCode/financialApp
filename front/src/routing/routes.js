import CategoryDetails from "../pages/private/categoryDetails";
import Dashboard from "../pages/private/dashboard";
import NewCategory from "../pages/private/newCategory";
import NewSpending from "../pages/private/newSpending";
import Home from "../pages/public/home";
import Register from "../pages/public/register";

const appPublicRoutes = [
	{ path: "/", element: <Home /> },
	{ path: "/register", element: <Register /> },
];

const appPrivateRoutes = [
	{ path: "/myAccount", element: <Dashboard /> },
	{ path: "/nouvelle-depense", element: <NewSpending /> },
	{ path: "/nouvelle-categorie", element: <NewCategory /> },
	{ path: "/:categoryId/details", element: <CategoryDetails /> },
];

export { appPublicRoutes, appPrivateRoutes };
