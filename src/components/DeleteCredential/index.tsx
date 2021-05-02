import React, { FC, useState } from "react"
import { useHistory } from "react-router-dom"

import { IconButton, Tooltip, Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core"

import DeleteIcon from "@material-ui/icons/Delete"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

import { forgetCredential, getUser, putUser } from "../../misc/indexedDB"

type Props = {
	credentialId: number
}

const DeleteCredential: FC<Props> = ({ credentialId }) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const [open, setOpen] = useState(false)

	const history = useHistory()

	const deleteCredential = async () => {
		await forgetCredential(credentialId)

		const user = await getUser()

		if (user === undefined) {
			fatalError("Error obtaining the user.")

			closeDialog()

			return
		}

		const updatedUser = await putUser({ ...user, slots_available: user.slots_available + 1 })

		if (updatedUser === undefined) {
			fatalError("Error updating the user.")

			closeDialog()

			return
		}

		closeDialog()

		history.goBack()
	}

	const fatalError = (err: string) => {
		console.log(err)
	}

	const openDialog = () => {
		setOpen(true)
	}

	const closeDialog = () => {
		setOpen(false)
	}

	return (
		<>
			<Tooltip title={translate("delete", lng)} placement="bottom">
				<IconButton
					aria-label="delete"
					color="primary"
					onClick={openDialog}
					data-testid="test_open_delete_dialog"
				>
					<DeleteIcon />
				</IconButton>
			</Tooltip>
			<Dialog open={open} onClose={closeDialog} data-testid="test_delete_dialog">
				<DialogTitle id="alert-dialog-title">
					{translate("delete_credential_confirmation", lng)}
				</DialogTitle>
				<DialogActions>
					<Button onClick={closeDialog} color="secondary">
						{translate("go_back", lng)}
					</Button>
					<Button onClick={deleteCredential} color="primary" autoFocus>
						{translate("delete", lng)}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default DeleteCredential
