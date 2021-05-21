import { EditCredentialI, EDIT_CREDENTIAL } from "../types"

import { CredentialT } from "../../misc/types"

export const editCredential = (credential: CredentialT): EditCredentialI => {
	return {
		type: EDIT_CREDENTIAL,
		payload: credential,
	}
}

/**
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
