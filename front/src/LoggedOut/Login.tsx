import React from "react";

import { Container, TextField, Typography } from "@mui/material";

const Login = () => {
	return (
		<Container>
			<TextField label="Username" variant="outlined" />
			<TextField label="Password" variant="outlined" />
			<Typography>Créer un compte</Typography>
		</Container>
	);
};

export default Login;
