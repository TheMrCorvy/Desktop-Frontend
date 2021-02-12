import React, { useState } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import TranslateButton from "../NavbarComponents/NavbarButtons/TranslateButton"
import ToggleDarkTheme from "../NavbarComponents/NavbarButtons/ToggleDarkTheme"

/************************************************************************************ mui related */
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Button,
	Tooltip,
	Fab,
	Hidden,
	SwipeableDrawer,
	List,
	Divider,
	ListItem,
	ListItemIcon,
	ListItemText,
} from "@material-ui/core"

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

import InboxIcon from "@material-ui/icons/MoveToInbox"
import MailIcon from "@material-ui/icons/Mail"

import MenuIcon from "@material-ui/icons/Menu"

/************************************************************************************ redux related */
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		navbarItem: {
			marginRight: theme.spacing(1),
			marginLeft: theme.spacing(1),
		},
		title: {
			flexGrow: 1,
		},
		appBar: {
			top: "auto",
			bottom: 0,
		},
		grow: {
			flexGrow: 1,
		},
		fabButton: {
			position: "absolute",
			zIndex: 1,
			top: -30,
			left: 0,
			right: 0,
			margin: "0 auto",
		},
	})
)

const Navbar = () => {
	const { theme } = useSelector((state: RootState) => state.theme)

	const { lng } = useSelector((state: RootState) => state.lng)

	const classes = useStyles()

	const [open, setOpen] = useState(false)

	return (
		<>
			<div className={classes.root}>
				<Hidden smDown>
					<AppBar position="fixed" color={theme === "dark" ? "primary" : "secondary"}>
						<Toolbar>
							<Tooltip title={translate("home", lng)}>
								<IconButton
									edge="start"
									className={classes.navbarItem}
									color="inherit"
									aria-label="logo"
								>
									<FontAwesomeIcon icon={["fas", "key"]} />
								</IconButton>
							</Tooltip>

							<Typography variant="h6" className={classes.title}>
								{translate("app_name", lng)}
							</Typography>

							<TranslateButton className={classes.navbarItem} />

							<Button color="inherit" className={classes.navbarItem}>
								{translate("navbar_login_btn", lng)}
							</Button>
							<Button color="inherit" className={classes.navbarItem}>
								{translate("navbar_register_btn", lng)}
							</Button>

							<ToggleDarkTheme className={classes.navbarItem} />

							<Tooltip title={translate("navbar_download_btn", lng)}>
								<IconButton
									edge="start"
									className={classes.navbarItem}
									color="inherit"
									aria-label="logo"
								>
									<FontAwesomeIcon icon={["fas", "cloud-download-alt"]} />
								</IconButton>
							</Tooltip>
						</Toolbar>
					</AppBar>
				</Hidden>

				<Hidden mdUp>
					<AppBar position="fixed" color="secondary" className={classes.appBar}>
						<Toolbar>
							<TranslateButton edge="start" />

							<ToggleDarkTheme />

							<Fab color="primary" aria-label="add" className={classes.fabButton}>
								<FontAwesomeIcon icon={["fas", "key"]} size="2x" />
							</Fab>
							<div className={classes.grow} />

							<IconButton
								edge="end"
								color="inherit"
								aria-label="open drawer"
								onClick={() => setOpen(true)}
							>
								<MenuIcon />
							</IconButton>
						</Toolbar>
					</AppBar>
					<SwipeableDrawer
						anchor="right"
						open={open}
						onClose={() => setOpen(false)}
						onOpen={() => setOpen(true)}
					>
						<div
							role="presentation"
							onClick={() => setOpen(false)}
							onKeyDown={() => setOpen(false)}
						>
							<List>
								{["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
									<>
										<ListItem button key={text}>
											<ListItemIcon>
												{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
											</ListItemIcon>
											<ListItemText primary={text} />
										</ListItem>
										<Divider />
									</>
								))}
							</List>
						</div>
					</SwipeableDrawer>
				</Hidden>
			</div>
		</>
	)
}

export default Navbar
