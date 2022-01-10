import axios from "axios";

const addSpending = async (newSpending) => {
	const res = await axios.post("http://localhost:5000/spendings", newSpending, {
		withCredentials: true,
	});

	return res.data;
};
const getSpendings = async (categoryId) => {
	try {
		const res = await axios.get(
			`http://localhost:5000/spendings/all/${categoryId}`,
			{
				withCredentials: true,
			}
		);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

const updateSpending = async (updatedSpending) => {
	try {
		const res = await axios.put(
			`http://localhost:5000/spendings`,
			updatedSpending,
			{
				withCredentials: true,
			}
		);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

const deleteSpending = async (spendingId) => {
	try {
		const res = await axios.delete(
			`http://localhost:5000/spendings/${spendingId}`,
			{
				withCredentials: true,
			}
		);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export { addSpending, getSpendings, deleteSpending, updateSpending };
