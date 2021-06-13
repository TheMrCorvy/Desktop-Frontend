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

import { forgetCredential, getUser, putUser, getCredentials } from "../../misc/indexedDB"

import { maxSlots } from "../../misc/staticData"

type Props = {
	credentialId: number
}

/*
 * 1: error calling the api
 * 2: indexed DB error
 * 3: other / unkown error
 */
type ErrorOptions = 1 | 2 | 3

/**
 * @alias DeleteCredential
 *
 * @description This component will be the one that actially gives the order to delete a credential. It will delete it from the Indexed DB & call the api to delete it from the real DB.
 *
 * @property {number} credentialId The id of the credential to delete
 *
 * @example
 *
 *		<DeleteCredential credentialId={32} />
 */

const DeleteCredential: FC<Props> = ({ credentialId }) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const [open, setOpen] = useState(false)

	const [error, setError] = useState(false)

	const [errorOption, setErrorOption] = useState<ErrorOptions>(1)

	const history = useHistory()

	const deleteCredential = async () => {
		await forgetCredential(credentialId)

		const user = await getUser()

		const credentials = await getCredentials()

		if (user === undefined || credentials === undefined) {
			fatalError(2)

			return
		}

		const checkRole = {
			free:
				user.role === "free" &&
				user.slots_available + 1 + credentials.length <= maxSlots.free,
			semi_premium:
				user.role === "semi-premium" &&
				user.slots_available + 1 + credentials.length <= maxSlots.semi_premium,
			premium: user.role === "premium" ? true : false,
			admin: user.role === "admin" ? true : false,
		}

		if (checkRole.free || checkRole.semi_premium || checkRole.premium || checkRole.admin) {
			putUser({ ...user, slots_available: user.slots_available + 1 }).then((updatedUser) => {
				if (updatedUser === undefined) {
					fatalError(2)
				}
			})
		} else {
			closeDialog()

			history.goBack()
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
			: translate("error_messages", lng, 6)

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
					dialogText = translate("error_messages", lng, 4)
					break
				case 2:
					dialogText = translate("error_messages", lng, 7)
					break
				case 3:
					dialogText = translate("error_messages", lng, 8)
					break

				default:
					dialogText = translate("error_messages", lng, 8)
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
