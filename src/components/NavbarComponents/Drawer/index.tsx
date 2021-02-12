import React, { FC } from "react"

import {
	SwipeableDrawer,
	List,
	Divider,
	ListItem,
	ListItemIcon,
	ListItemText,
} from "@material-ui/core"

import InboxIcon from "@material-ui/icons/MoveToInbox"
import MailIcon from "@material-ui/icons/Mail"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../redux/store"
import { toggleDrawer } from "../../../redux/actions/drawerActions"

const Drawer: FC = () => {
	const { open } = useSelector((state: RootState) => state.open)

	const dispatch = useDispatch()

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
	)
}

export default Drawer
