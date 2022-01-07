import CategoryDetails from "../LoggedIn/CategoryDetails";
import SpendingForm from "../LoggedIn/SpendingForm";
import SpendingOverview from "../LoggedIn/SpendingOverview";
import Home from "../LoggedOut/Home";
import Login from "../LoggedOut/Login";
import SignUp from "../LoggedOut/SignUp";

const appPublicRoutes = [
	{ path: "/", element: <Home /> },
	{ path: "/login", element: <Login /> },
	{ path: "/signup", element: <SignUp /> },
];

const appPrivateRoutes = [
	{ path: "/myAccount", element: <SpendingOverview /> },
	{ path: "/nouvelle-depense", element: <SpendingForm /> },
	{ path: "/:categoryId/details", element: <CategoryDetails /> },
];

export { appPublicRoutes, appPrivateRoutes };
