import React, { FC, useState } from "react"
import { useHistory } from "react-router-dom"

import {
	IconButton,
	Tooltip,
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	DialogContentText,
} from "@material-ui/core"

import DeleteIcon from "@material-ui/icons/Delete"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

import { forgetCredential, getUser, putUser } from "../../misc/indexedDB"

type Props = {
	credentialId: number
}

/*
 * 1: error calling the api
 * 2: error obtaining the user from indexed DB
 * 3: error updating the user in the indexed DB
 * 4: other
 */
type ErrorOptions = 1 | 2 | 3 | 4

const DeleteCredential: FC<Props> = ({ credentialId }) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const [open, setOpen] = useState(false)

	const [error, setError] = useState(false)

	const [errorOption, setErrorOption] = useState<ErrorOptions>(1)

	const history = useHistory()

	const deleteCredential = async () => {
		await forgetCredential(credentialId)

		const user = await getUser()

		if (user === undefined) {
			fatalError(2)

			return
		}

		const updatedUser = await putUser({ ...user, slots_available: user.slots_available + 1 })

		if (updatedUser === undefined) {
			fatalError(3)

			return
		}

		closeDialog()

		history.goBack()
	}

	const fatalError = (option: ErrorOptions) => {
		setErrorOption(option)

		setError(true)
	}

	const openDialog = () => {
		setOpen(true)
	}

	const closeDialog = () => {
		setOpen(false)
	}

	const renderDialog = () => {
		let dialogTitle = !error
			? translate("delete_credential_confirmation", lng)
			: "There was an error..."

		let dialogText: string

		if (!error) {
			return (
				<Dialog open={open} onClose={closeDialog} data-testid="test_delete_dialog">
					<DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
					<DialogActions>
						<Button onClick={closeDialog} color="secondary">
							{translate("go_back", lng)}
						</Button>
						<Button onClick={deleteCredential} color="primary" autoFocus>
							{translate("delete", lng)}
						</Button>
					</DialogActions>
				</Dialog>
			)
		} else {
			switch (errorOption) {
				case 1:
					dialogText = "Error calling the api"
					break
				case 2:
					dialogText = "Error obtaining the user's data"
					break
				case 3:
					dialogText = "Error updating the user's data"
					break

				default:
					dialogText = "Unknown error..."
					break
			}

			return (
				<Dialog open={open} onClose={closeDialog} data-testid="test_delete_dialog">
					<DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
					<DialogContentText>{dialogText}</DialogContentText>
					<DialogActions>
						<Button onClick={closeDialog} color="secondary">
							{translate("go_back", lng)}
						</Button>
					</DialogActions>
				</Dialog>
			)
		}
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

			{renderDialog()}
		</>
	)
}

export default DeleteCredential
