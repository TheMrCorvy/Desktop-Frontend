import { FC } from "react"
import { Link } from "react-router-dom"

/************************************************************************************ mui related */
import {
	SwipeableDrawer,
	List,
	Divider,
	ListItemText,
	ListItemIcon,
	ListItem,
} from "@material-ui/core"

import useStyles from "./styles"

/************************************************************************************ redux related */
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../redux/store"

import { toggleDrawer } from "../../../redux/actions/drawerActions"
import { logOut } from "../../../redux/actions/authTokenActions"
import { toggleLoading, setErrorLoading } from "../../../redux/actions/loadingActions"

import { useApi } from "../../../hooks/useApi"

import { translate } from "../../../lang"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Drawer: FC = () => {
	const { open } = useSelector((state: RootState) => state.open)

	const { token } = useSelector((state: RootState) => state.token)

	const { lng } = useSelector((state: RootState) => state.lng)

	const dispatch = useDispatch()

	const classes = useStyles()

	const callApi = useApi

	const callLogout = () => {
		if (token) {
			dispatch(toggleLoading(true))

			callApi({
				lng,
				endpoint: "/auth/logout",
				method: "GET",
				token,
			}).then((response) => {
				if (response.status === 200) {
					dispatch(toggleLoading(false))

					dispatch(logOut())
				} else {
					console.error(response)

					if (response.message) {
						dispatch(setErrorLoading(response.message))
					} else {
						dispatch(setErrorLoading("Error..."))
					}
				}
			})
		}
	}

	return (
		<SwipeableDrawer
			anchor="right"
			open={open}
			onClose={() => dispatch(toggleDrawer(false))}
			onOpen={() => dispatch(toggleDrawer(true))}
		>
			<div
				role="presentation"
				onClick={() => dispatch(toggleDrawer(false))}
				onKeyDown={() => dispatch(toggleDrawer(false))}
				data-testid="test_drawer"
			>
				<List>
					<Link to="/" className={classes.link}>
						<ListItem button className={classes.listItem}>
							<ListItemIcon>
								<FontAwesomeIcon icon={["fas", "home"]} size="2x" />
							</ListItemIcon>
							<ListItemText primary={translate("home", lng)} />
						</ListItem>
					</Link>
					<Divider />
					<Link to="/downloads" className={classes.link}>
						<ListItem button className={classes.listItem}>
							<ListItemIcon>
								<FontAwesomeIcon icon={["fas", "cloud-download-alt"]} size="2x" />
							</ListItemIcon>
							<ListItemText primary={translate("downloads", lng)} />
						</ListItem>
					</Link>
					<Divider />
					{!token ? (
						<>
							<Link to="/login" className={classes.link}>
								<ListItem button className={classes.listItem}>
									<ListItemIcon>
										<FontAwesomeIcon icon={["fas", "sign-in-alt"]} size="2x" />
									</ListItemIcon>
									<ListItemText primary={translate("navbar_login_btn", lng)} />
								</ListItem>
							</Link>
							<Divider />
							<Link to="/register" className={classes.link}>
								<ListItem button className={classes.listItem}>
									<ListItemIcon>
										<FontAwesomeIcon icon={["fas", "door-open"]} size="2x" />
									</ListItemIcon>
									<ListItemText primary={translate("navbar_register_btn", lng)} />
								</ListItem>
							</Link>
						</>
					) : (
						<>
							<Link to="/my-credentials" className={classes.link}>
								<ListItem button className={classes.listItem}>
									<ListItemIcon>
										<FontAwesomeIcon icon={["fas", "lock"]} size="2x" />
									</ListItemIcon>
									<ListItemText
										primary={translate("navbar_my_credentials_btn", lng)}
									/>
								</ListItem>
							</Link>
							<Divider />
							<Link to="/my-account" className={classes.link}>
								<ListItem button className={classes.listItem}>
									<ListItemIcon>
										<FontAwesomeIcon icon={["fas", "key"]} size="2x" />
									</ListItemIcon>
									<ListItemText
										primary={translate("navbar_my_account_btn", lng)}
									/>
								</ListItem>
							</Link>
							<Divider />
							<ListItem button className={classes.listItem} onClick={callLogout}>
								<ListItemIcon>
									<FontAwesomeIcon icon={["fas", "sign-out-alt"]} size="2x" />
								</ListItemIcon>
								<ListItemText primary={translate("navbar_log_out_btn", lng)} />
							</ListItem>
						</>
					)}
				</List>
			</div>
		</SwipeableDrawer>
	)
}

export default Drawer
