import React from "react";

import { Link } from "react-router-dom";
import { Grid, List, ListItem, ListItemText } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import HelpIcon from "@mui/icons-material/Help";
import HomeIcon from "@mui/icons-material/Home";

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
		text: "Accueil",
		path: "/",
		icon: <HomeIcon sx={styles.itemIcon} />,
	},
	{
		text: "Créer un compte",
		path: "/register",
		icon: <CreateIcon sx={styles.itemIcon} />,
	},
	{
		text: "FAQ",
		path: "/FAQ",
		icon: <HelpIcon sx={styles.itemIcon} />,
	},
];

const PublicSidebar = () => {
	return (
		<Grid item sx={styles.sidebar}>
			<List>
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

export default PublicSidebar;
