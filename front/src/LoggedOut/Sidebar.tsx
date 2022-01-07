import React from "react";

import { Link } from "react-router-dom";
import {
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import CreateIcon from "@mui/icons-material/Create";
import HelpIcon from "@mui/icons-material/Help";
import HomeIcon from "@mui/icons-material/Home";

const styles = {
	root: {
		height: "100vh",
		backgroundColor: "yellowgreen",
		overflow: "auto",
	},
	item: {
		paddingTop: (theme: Theme) => theme.spacing(0),
		paddingBottom: (theme: Theme) => theme.spacing(0),
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
	{ text: "Accueil", path: "/", icon: <HomeIcon /> },
	{ text: "Créer un compte", path: "/signup", icon: <CreateIcon /> },
	{ text: "FAQ", path: "/FAQ", icon: <HelpIcon /> },
	{ text: "Mes dépenses annuelles", path: "/FAQ", icon: <HelpIcon /> },
	// { text: "Contact", icon: <InfoIcon /> },
];

const Sidebar = () => {
	return (
		<Box sx={styles.root}>
			<List>
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
