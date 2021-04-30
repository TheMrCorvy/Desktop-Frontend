import React, { FC, useState } from "react"

import { IconButton, Tooltip, Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core"

import DeleteIcon from "@material-ui/icons/Delete"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

import { forgetCredential } from "../../misc/indexedDB"

type Props = {
	credentialId: number
	testing?: boolean
}

const DeleteCredential: FC<Props> = ({ credentialId, testing }) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const [open, setOpen] = useState(false)

	const deleteCredential = async () => {
		let data: any

		data = await forgetCredential(credentialId)

		console.log(credentialId)
		console.log(data)

		setOpen(false)
	}

	const openDialog = () => {
		setOpen(true)
	}

	const closeDialog = () => {
		setOpen(false)
	}

	return (
		<>
			<Tooltip title="Delete" placement="bottom">
				<IconButton aria-label="delete" color="primary" onClick={openDialog}>
					<DeleteIcon />
				</IconButton>
			</Tooltip>
			<Dialog
				open={open}
				onClose={closeDialog}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					Are you sure you want to delete this credential?
				</DialogTitle>
				<DialogActions>
					<Button onClick={closeDialog} color="secondary">
						{translate("go_back", lng)}
					</Button>
					<Button onClick={deleteCredential} color="primary" autoFocus>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default DeleteCredential
