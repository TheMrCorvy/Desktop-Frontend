import { FC, useEffect } from "react"
import { useLocation } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { clearError } from "../redux/actions/errorHandlingActions"

const ScrollTop: FC = () => {
	const { err } = useSelector((state: RootState) => state.err)

	const dispatch = useDispatch()

	const { pathname } = useLocation()

	useEffect(() => {
		window.scrollTo(0, 0)

		if (err) {
			dispatch(clearError())
		}
	}, [pathname])

	return null
}

export default ScrollTop
