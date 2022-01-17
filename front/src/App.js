import {
	Navigate,
	BrowserRouter as Router,
	Route,
	Routes,
} from "react-router-dom";

import { appPrivateRoutes, appPublicRoutes } from "./routing/routes";
import PrivateRoute from "./routing/PrivateRoute";

function App() {
	return (
		<Router>
			<Routes>
				{/* handle public routes */}
				{appPublicRoutes.map((publicRoute, index) => (
					<Route
						key={index}
						path={publicRoute.path}
						element={publicRoute.element}
					/>
				))}
				{/* handle private routes */}
				{appPrivateRoutes.map((privateRoute, index) => (
					<Route
						key={index}
						path={privateRoute.path}
						element={<PrivateRoute>{privateRoute.element}</PrivateRoute>}
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
