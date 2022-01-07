const convertToTwoDigits = (number, min, max) => {
	if (number < min || number > max) {
		throw new Error(`Number should be between ${min} and ${max}`);
	} else {
		return number < 10 ? `0${number}` : number;
	}
};

const materialUiDateInput = (date) => {
	const year = date.getUTCFullYear();
	const month = convertToTwoDigits(date.getUTCMonth() + 1, 1, 12);
	const dayDate = convertToTwoDigits(date.getUTCDate(), 1, 31);

	return `${year}-${month}-${dayDate}`;
};

export { materialUiDateInput };
