import { useState, useEffect } from "react"

const useSnackbar = () => {
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: "",
	})

	useEffect(() => {
		if (snackbar.open) {
			const snackTime = setTimeout(() => {
				setSnackbar({ ...snackbar, open: false })
			}, 30000)

			return () => clearTimeout(snackTime)
		}
	}, [snackbar])

	return { snackbar, setSnackbar }
}

export default useSnackbar
