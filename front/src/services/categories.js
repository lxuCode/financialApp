import axios from "axios";

const getCategories = async (username) => {
	try {
		const res = await axios.get(
			`http://localhost:5000/categories/all/${username}`,
			{ withCredentials: true }
		);
		console.log("res : ", res);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export { getCategories };
