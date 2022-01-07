import {
	Navigate,
	BrowserRouter as Router,
	Route,
	Routes,
} from "react-router-dom";

import { appPrivateRoutes, appPublicRoutes } from "./routing/routes";
import PrivateRoute from "./routing/PrivateRoute";
import LoggedInLayout from "./LoggedIn/LoggedInLayout";
import LoggedOutLayout from "./LoggedOut/LoggedOutLayout";

function App() {
	return (
		<Router>
			<Routes>
				{/* handle public routes */}
				{appPublicRoutes.map((publicRoute, index) => (
					<Route
						key={index}
						path={publicRoute.path}
						element={<LoggedOutLayout>{publicRoute.element}</LoggedOutLayout>}
					/>
				))}
				{/* handle private routes */}
				{appPrivateRoutes.map((privateRoute, index) => (
					<Route
						key={index}
						path={privateRoute.path}
						element={
							<PrivateRoute>
								<LoggedInLayout>{privateRoute.element}</LoggedInLayout>
							</PrivateRoute>
						}
					/>
				))}
				{/* handle unknown routes */}
				<Route
					path="*"
					element={<Navigate to={{ pathname: "/myAccount" }} />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
