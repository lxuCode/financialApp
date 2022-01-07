import React, { useEffect, useState } from "react";

import axios from "axios";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
		undefined
	);

	useEffect(() => {
		const fetchAuth = async () => {
			try {
				const res = await axios.get(
					"http://localhost:5000/users/isAuthenticated",
					{
						withCredentials: true,
					}
				);
				setIsAuthenticated(res.data);
			} catch (err) {
				setIsAuthenticated(false);
			}
		};

		fetchAuth();
	}, []);

	return isAuthenticated !== undefined ? (
		isAuthenticated ? (
			<>{children}</>
		) : (
			<Navigate to={{ pathname: "/" }} />
		)
	) : (
		<></>
	);
};

export default PrivateRoute;
