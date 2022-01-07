import axios from "axios";

export const loginRequest = async (payload) => {
	try {
		const res = await axios.post(
			"http://localhost:5000/users/login",
			{ username: payload.username, password: payload.password },
			{
				withCredentials: true,
			}
		);
		return res.data;
	} catch (error) {
		throw error;
	}
};
