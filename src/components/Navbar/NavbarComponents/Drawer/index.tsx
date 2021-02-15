import React, { FC } from "react"

import {
	SwipeableDrawer,
	List,
	Divider,
	ListItemText,
	ListItemIcon,
	ListItem,
} from "@material-ui/core"

import InboxIcon from "@material-ui/icons/MoveToInbox"
import MailIcon from "@material-ui/icons/Mail"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../../redux/store"
import { toggleDrawer } from "../../../../redux/actions/drawerActions"

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
					<ListItem button>
						<ListItemIcon>
							<InboxIcon />
						</ListItemIcon>
						<ListItemText primary="mucho texto" />
					</ListItem>
					<Divider />
					<ListItem>
						<ListItemIcon>
							<MailIcon />
						</ListItemIcon>
						<ListItemText primary="poco texto" />
					</ListItem>
				</List>
			</div>
		</SwipeableDrawer>
	)
}

export default Drawer
