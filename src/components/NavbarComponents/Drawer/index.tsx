import React, { FC, useEffect, useState } from "react"

import {
	SwipeableDrawer,
	List,
	Divider,
	ListItem,
	ListItemIcon,
	ListItemText,
} from "@material-ui/core"

import InboxIcon from "@material-ui/icons/MoveToInbox"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../redux/store"
import { toggleDrawer } from "../../../redux/actions/drawerActions"

let deferredPrompt: any

const Drawer: FC = () => {
	const { open } = useSelector((state: RootState) => state.open)

	const dispatch = useDispatch()

	const [installable, setInstallable] = useState(false)

	useEffect(() => {
		window.addEventListener("beforeinstallprompt", (e: Event) => {
			// Prevent the mini-infobar from appearing on mobile
			/***************************************************************** e.preventDefault()*/
			// Stash the event so it can be triggered later.
			deferredPrompt = e
			// Update UI notify the user they can install the PWA
			setInstallable(true)
		})

		window.addEventListener("appinstalled", () => {
			// Log install to analytics
			console.log("INSTALL: Success")
		})
	}, [])

	const handleInstallClick = () => {
		// Hide the app provided install promotion
		setInstallable(false)
		// Show the install prompt
		deferredPrompt.prompt()
		// Wait for the user to respond to the prompt
		deferredPrompt.userChoice.then((choiceResult: any) => {
			if (choiceResult.outcome === "accepted") {
				console.log("User accepted the install prompt")
			} else {
				console.log("User dismissed the install prompt")
			}
		})
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
			>
				<List>
					{installable && (
						<ListItem button onClick={() => handleInstallClick}>
							<ListItemIcon>
								<InboxIcon />
							</ListItemIcon>
							<ListItemText primary="install web app" />
						</ListItem>
					)}
					{!installable && (
						<ListItem button>
							<ListItemIcon>
								<InboxIcon />
							</ListItemIcon>
							<ListItemText primary="app is not installable" />
						</ListItem>
					)}
					<Divider />
				</List>
			</div>
		</SwipeableDrawer>
	)
}

export default Drawer
