import {
	Card,
	CardActions,
	CardContent,
	Chip,
	Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface ComponentProps {
	categoryName: string;
	totalSpending: number;
	onClick: any;
}

const styles = {
	card: {
		boxShadow: 0,
		backgroundColor: "red",
		border: "1px solid #f6f6f6",
		":hover": {
			boxShadow: 3,
		},
	},
};

const CategoryCard = ({
	categoryName,
	totalSpending,
	onClick,
}: ComponentProps) => {
	return (
		<Card sx={styles.card}>
			<CardContent sx={{ minHeight: 10, height: "100%" }}>
				<Typography variant="h5" sx={{ textAlign: "center" }}>
					{categoryName}
				</Typography>
				<Typography variant="h6" sx={{ textAlign: "center" }}>
					{`Total: ${totalSpending} €`}
				</Typography>
			</CardContent>
			<CardActions>
				<Chip
					icon={<VisibilityIcon />}
					label="Voir plus"
					onClick={onClick}
					color="primary"
					size="small"
				/>
			</CardActions>
		</Card>
	);
};

export default CategoryCard;
