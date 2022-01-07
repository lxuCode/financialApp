import React from "react";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import BarChartIcon from "@mui/icons-material/BarChart";
import EuroSymbolIcon from "@mui/icons-material/EuroSymbol";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import StarIcon from "@mui/icons-material/Star";

const styles = {
	root: {
		height: "100vh",
		backgroundColor: (theme) => theme.palette.primary.light,
		overflow: "auto",
	},
	item: {
		paddingTop: (theme: Theme) => theme.spacing(0),
		paddingBottom: (theme: Theme) => theme.spacing(0),
		color: "white",
	},
	icon: {
		marginRight: (theme: Theme) => theme.spacing(2),
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
		icon: <HomeIcon />,
	},
	{
		text: "Ajouter une dépense",
		path: "/nouvelle-depense",
		icon: <EuroSymbolIcon />,
	},
	{
		text: "Mes dépenses annuelles",
		path: "depenses-annuelles",
		icon: <BarChartIcon />,
	},
	{
		text: "Mes objectifs",
		path: "objectifs",
		icon: <StarIcon />,
	},
];

const Sidebar = () => {
	const navigate = useNavigate();

	const handleLogout = async (): Promise<void> => {
		const res = await axios.post(
			"http://localhost:5000/users/logout",
			{},
			{
				withCredentials: true,
			}
		);
		console.log("logout res", res);
		if (res.data) {
			navigate("/");
		}
	};

	return (
		<Box sx={styles.root}>
			<List>
				<ListItem sx={styles.item}>
					<ListItemButton onClick={handleLogout}>
						<Box sx={styles.icon}>
							<LogoutIcon />
						</Box>
						<ListItemText primary="Se déconnecter" />
					</ListItemButton>
				</ListItem>
				{sidebarItems.map((item, index) => (
					<ListItem sx={styles.item} key={index}>
						<ListItemButton component={Link} to={item.path}>
							<Box sx={styles.icon}>{item.icon}</Box>
							<ListItemText primary={item.text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);
};

export default Sidebar;
