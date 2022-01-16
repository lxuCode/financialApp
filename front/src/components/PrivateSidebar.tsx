import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { Grid, List, ListItem, ListItemText } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import EuroSymbolIcon from "@mui/icons-material/EuroSymbol";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import StarIcon from "@mui/icons-material/Star";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { logout } from "../services/user";

const styles = {
	sidebar: {
		backgroundColor: "#1b1c4d",
		width: "250px",
		height: "100vh",
		overflow: "auto",
	},
	item: {
		color: "white",
	},
	itemIcon: {
		marginLeft: "15px",
	},
	itemText: {
		marginLeft: "25px",
	},
};

interface SidebarItem {
	text: string;
	path: string;
	icon: JSX.Element;
}

const sidebarItems: Array<SidebarItem> = [
	{
		text: "Home",
		path: "/myAccount",
		icon: <HomeIcon sx={styles.itemIcon} />,
	},
	{
		text: "Ajouter une dépense",
		path: "/nouvelle-depense",
		icon: <EuroSymbolIcon sx={styles.itemIcon} />,
	},
	{
		text: "Nouvelle catégorie",
		path: "/nouvelle-categorie",
		icon: <AddCircleOutlineIcon sx={styles.itemIcon} />,
	},
	{
		text: "Mes dépenses annuelles",
		path: "depenses-annuelles",
		icon: <BarChartIcon sx={styles.itemIcon} />,
	},
	{
		text: "Mes objectifs",
		path: "objectifs",
		icon: <StarIcon sx={styles.itemIcon} />,
	},
];

const PrivateSidebar = () => {
	const navigate = useNavigate();

	const handleLogout = async (): Promise<void> => {
		const res = await logout();
		if (res.data) {
			navigate("/");
		}
	};

	return (
		<Grid item sx={styles.sidebar}>
			<List>
				<ListItem button sx={styles.item} onClick={handleLogout}>
					<LogoutIcon sx={styles.itemIcon} />
					<ListItemText primary="Se déconnecter" sx={styles.itemText} />
				</ListItem>
				{sidebarItems.map((item, index) => (
					<ListItem
						button
						component={Link}
						to={item.path}
						sx={styles.item}
						key={index}
					>
						{item.icon}
						<ListItemText primary={item.text} sx={styles.itemText} />
					</ListItem>
				))}
			</List>
		</Grid>
	);
};

export default PrivateSidebar;
