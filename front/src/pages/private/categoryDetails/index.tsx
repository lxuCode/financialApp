import React, { useEffect, useState } from "react";

import { Grid, Paper } from "@mui/material";
import { useParams } from "react-router";

import PrivateSidebar from "../../../components/PrivateSidebar";
import SpendingPaper from "./SpendingPaper";
import CategoryPaper from "./CategoryPaper";
import {
	deleteSpending,
	getSpendings,
	updateSpending,
} from "../../../services/spendings";
import { CategoryDetailsContext } from "./categoryDetailsContext";
import DeleteDialog from "./DeleteDialog";

const styles = {
	main: {
		height: "100vh",
		overflow: "auto",
		padding: "30px 50px",
		backgroundColor: "rgb(247,249,252)",
	},
	content: {
		marginTop: "30px",
	},
	title: {},
};

interface SpendingProps {
	_id: string;
	name: string;
	date: Date;
	amount: number;
	comment: string;
}

const CategoryDetails = () => {
	const [spendings, setSpendings] = useState<SpendingProps[]>([]);
	const [isEditable, setIsEditable] = useState<boolean>(true);
	const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
	const [spendingId, setSpendingId] = useState(undefined);
	const { categoryId } = useParams();

	const fetchSpendings = async () => {
		const spendings = await getSpendings(categoryId);
		setSpendings(spendings);
	};

	useEffect(() => {
		fetchSpendings();
	}, []);

	const handleEdit = async (spendingEdited) => {
		try {
			const res = await updateSpending(spendingEdited);
			// dispatch(openSuccessSnackbar(res));
		} catch (error) {
			// dispatch(openWarningSnackbar(error));
			console.log(error);
		} finally {
			fetchSpendings();
			setIsEditable(true);
		}
	};

	const handleOpenDeleteDialog = () => {
		setOpenDeleteDialog(true);
	};

	const handleCloseDeleteDialog = () => {
		setOpenDeleteDialog(false);
	};

	const handleDelete = async (spendingId) => {
		try {
			const res = await deleteSpending(spendingId);
			// dispatch(openSuccessSnackbar(res));
		} catch (error: any | unknown) {
			// dispatch(openWarningSnackbar(error.response.data));
		} finally {
			fetchSpendings();
			handleCloseDeleteDialog();
		}
	};

	return (
		<Grid container>
			<PrivateSidebar />
			<CategoryDetailsContext.Provider value={{ spendingId, setSpendingId }}>
				<Grid item xs sx={styles.main}>
					<h2 style={styles.title}>Dépenses</h2>
					<hr />
					<Grid container sx={styles.content} spacing={3}>
						<Grid item xs={12} sx={{ marginBottom: "50px" }}>
							<CategoryPaper />
						</Grid>
						{spendings.map((spending, index) => (
							<Grid item xs={12} key={index}>
								<SpendingPaper
									spending={spending}
									isEditable={isEditable}
									setIsEditable={setIsEditable}
									handleOpenDeleteDialog={handleOpenDeleteDialog}
									handleEdit={handleEdit}
								/>
							</Grid>
						))}
					</Grid>
					<DeleteDialog
						open={openDeleteDialog}
						closeDialog={handleCloseDeleteDialog}
						handleDelete={handleDelete}
					/>
				</Grid>
			</CategoryDetailsContext.Provider>
		</Grid>
	);
};

export default CategoryDetails;
