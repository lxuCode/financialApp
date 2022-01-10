import axios from "axios";

const register = async (newUser) => {
	const res = await axios.post("http://localhost:5000/users/register", newUser);

	return res.data;
};

export { register };
