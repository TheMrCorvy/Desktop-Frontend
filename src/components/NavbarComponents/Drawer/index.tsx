import React, { FC } from "react"

import { SwipeableDrawer, List, Divider } from "@material-ui/core"

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
					<Divider />
				</List>
			</div>
		</SwipeableDrawer>
	)
}

export default Drawer
