import { CREATE_CREDENTIAL, EditCredentialI, EDIT_CREDENTIAL } from "../types"

import { AccessCredentialPropT, CredentialPropValueT, ReduxCredentialT } from "../../misc/types"

type CredentialProp = {
	oldCredential: ReduxCredentialT
	prop: AccessCredentialPropT
	newValue: CredentialPropValueT
}
// I'll use edit credential to manage the writing on the inputs, either for editing or creating a new one
export const editCredential = (editing: CredentialProp): EditCredentialI => {
	return {
		type: EDIT_CREDENTIAL,
		payload: { ...editing.oldCredential, [editing.prop]: editing.newValue },
	}
}

// this action will be fired when the user enters the create credential view, so the inputs will be empty
export const createCredential = (): EditCredentialI => {
	return {
		type: CREATE_CREDENTIAL,
		payload: {},
	}
}

/**
 * This comment is just for me to avoid forgeting the logic...
 *
 * Acá viene la logica de todo, básicamente esta función tiene que recibir como parámetros los siguientes:
 *
 * 1) El nombre de la propiedad
 * 2) Cómo acceder a la propiedad (algo.algo_2.algo_3: [array])
 * 3) El valor de la propiedad
 *
 * Entonces, habiendo recibido todo esto hay que hacer una copia del estado actual, y despacharlo para que se actualize
 * incluyendo lo que sea que se modificó
 *
 * También es posible que reciba de como parámetro el estado viejo, lo copie, añada la propiedad modificada, y entonces
 * lo despache
 *
 * Otra opción sería que con cada cambio que haya, se lea el estado actual, se envie una copia con las modificaciones, y
 * entonces acá solo habría que despacharlo, esta última opción me parece más fácil
 */
