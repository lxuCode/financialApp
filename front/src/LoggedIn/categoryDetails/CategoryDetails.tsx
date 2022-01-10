import { useEffect, useMemo, useState } from "react";

import {
	Alert,
	AlertColor,
	Box,
	Button,
	Container,
	Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

import { getSpendings } from "../../services/spendings";
import CustomTable from "../../components/CustomTable";
import EditDialog from "./EditDialog";
import CustomSnackbar from "../../components/CustomSnackbar";
import DeleteDialog from "./DeleteDialog";

const styles = {
	root: {
		height: "100vh",
		overflow: "auto",
	},
	container: {
		width: "90%",
		pt: 3,
		pb: 4,
	},
	title: {
		textAlign: "center",
		marginBottom: 3,
	},
} as const;

interface SpendingProps {
	_id: string;
	name: string;
	date: Date;
	amount: number;
	comment: string;
}

const CategoryDetails = () => {
	const COLUMNS = [
		{
			Header: "Date",
			accessor: "date",
			width: "12%",
		},
		{
			Header: "Nom",
			accessor: "name",
			width: "30%",
		},
		{
			Header: "Montant",
			accessor: "amount",
			width: "10%",
		},
		{
			Header: "Commentaire",
			accessor: "comment",
			width: "50%",
		},
		{
			Header: "Actions",
			accessor: "_id",
			Cell: (cellObj) => (
				<>
					<Button
						startIcon={<EditIcon />}
						onClick={() => {
							handleOpenEditDialog();
						}}
					/>
					<Button
						startIcon={<DeleteIcon />}
						onClick={() => {
							handleOpenDeleteDialog();
							setSpendingId(cellObj.value);
						}}
					/>
				</>
			),
		},
	];

	const snackbar = useSelector(
		(store: {
			snackbar: { isOpen: boolean; severity: AlertColor; message: string };
		}) => store.snackbar
	);

	const { categoryId } = useParams();
	const [spendings, setSpendings] = useState<SpendingProps[]>([]);
	const [openEditDialog, setOpenEditDialog] = useState(false);
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [spendingId, setSpendingId] = useState(null);

	const fetchSpendings = async () => {
		const spendings = await getSpendings(categoryId);
		setSpendings(spendings);
	};

	useEffect(() => {
		fetchSpendings();
	}, []);

	const columns = useMemo(() => COLUMNS, [COLUMNS]);
	const data = useMemo(() => spendings, [spendings]);

	const handleOpenEditDialog = () => {
		setOpenEditDialog(true);
	};

	const handleCloseEditDialog = async () => {
		setOpenEditDialog(false);
		//can be optimized
		await fetchSpendings();
	};

	const handleOpenDeleteDialog = () => {
		setOpenDeleteDialog(true);
	};

	const handleCloseDeleteDialog = async () => {
		setOpenDeleteDialog(false);
		await fetchSpendings();
	};

	return (
		<Box sx={styles.root}>
			<Container sx={styles.container}>
				<Typography variant="h3" sx={styles.title}>
					Mes dépenses par catégories
				</Typography>
				{spendings.length === 0 ? (
					<Typography>Il n'y a pas de dépense pour cette catégorie.</Typography>
				) : (
					<CustomTable columns={columns} data={data} />
				)}

				{openEditDialog ? (
					<EditDialog handleClose={handleCloseEditDialog} />
				) : (
					<></>
				)}

				{openDeleteDialog ? (
					<DeleteDialog
						handleClose={handleCloseDeleteDialog}
						spendingId={spendingId}
					/>
				) : (
					<></>
				)}

				<CustomSnackbar open={snackbar.isOpen}>
					<Alert severity={snackbar.severity}>{snackbar.message}</Alert>
				</CustomSnackbar>
			</Container>
		</Box>
	);
};

export default CategoryDetails;
