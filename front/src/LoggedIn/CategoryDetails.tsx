import { useEffect, useMemo, useState } from "react";

import {
	Box,
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from "react-router";

import { deleteSpending, getSpendings } from "../services/spendings";
import CustomTable from "../components/CustomTable";
import EditDialog from "./EditDialog";

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
	dialogStack: {
		width: "100%",
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

	const handleCloseDeleteDialog = () => {
		setOpenDeleteDialog(false);
	};

	const handleDelete = async () => {
		try {
			const res = await deleteSpending(spendingId);
			await fetchSpendings();
			handleCloseDeleteDialog();
		} catch (error) {
			console.log(error);
		}
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
				<Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
					<DialogTitle>Supprimer la dépense</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Veuillez confirmer la suppression de la dépense.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCloseDeleteDialog}>Annuler</Button>
						<Button onClick={handleDelete}>Supprimer</Button>
					</DialogActions>
				</Dialog>

				{openEditDialog ? (
					<EditDialog handleClose={handleCloseEditDialog} />
				) : (
					<></>
				)}
			</Container>
		</Box>
	);
};

export default CategoryDetails;
