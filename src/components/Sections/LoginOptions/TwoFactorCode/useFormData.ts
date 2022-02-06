import { useState, useEffect } from "react"
import { UserT } from "../../../../misc/types"

const useFormData = ({ user, testing }: Params) => {
	const [formData, setFormData] = useState<FormInputs>({
		email: "",
		twoFactorCode: "",
	})

	useEffect(() => {
		if (testing) {
			setFormData({
				email: "mr.corvy@gmail.com",
				twoFactorCode: 123456,
			})

			return
		}

		if (user) {
			setFormData({
				email: user.email,
				twoFactorCode: "",
			})
		}
	}, [])

	return { formData, setFormData }
}

type Params = {
	user: UserT | undefined
	testing?: boolean
}

type FormInputs = {
	email: String
	twoFactorCode: string | number
}

export default useFormData
