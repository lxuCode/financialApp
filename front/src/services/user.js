import axios from "axios";

const register = async (newUser) => {
	const res = await axios.post("http://localhost:5000/users/register", newUser);

	return res.data;
};

const logout = async () => {
	const res = await axios.post(
		"http://localhost:5000/users/logout",
		{},
		{
			withCredentials: true,
		}
	);

	return res;
};

export { logout, register };
