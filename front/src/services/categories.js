import axios from "axios";

const getCategories = async () => {
	try {
		const res = await axios.get(`http://localhost:5000/categories/all`, {
			withCredentials: true,
		});
		console.log("res : ", res);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

const addCategory = async (newCategory) => {
	const res = await axios.post(
		"http://localhost:5000/categories",
		newCategory,
		{
			withCredentials: true,
		}
	);

	return res.data;
};

export { addCategory, getCategories };
