import { useEffect, useState } from "react"

import { UserT } from "../../../../misc/types"

const useFormData = (user: UserT | undefined) => {
	const [formData, setFormData] = useState({
		mainEmail: "",
		mailToSendCode: "",
	})

	useEffect(() => {
		if (user) {
			setFormData({
				mainEmail: user.email,
				mailToSendCode: user.recovery_email,
			})
		}
	}, [])

	return { formData, setFormData }
}

export default useFormData
