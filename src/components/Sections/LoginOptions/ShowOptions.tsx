import { FC } from "react"

import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"

import TwoFactorCode from "./TwoFactorCode"
import EmailCode from "./EmailCode"
import SecurityCode from "./SecurityCode"

import useUser from "./useUser"

import { ApiResponseLoginT } from "../../../misc/types"

const ShowOptions: FC<Props> = ({ option, isRobot, onAuthSuccess, endpointAlt, testing }) => {
	const { token } = useSelector((state: RootState) => state.token)
	const { user } = useUser(token)

	const endpoint = endpointAlt ? "/verify-info" : "/login"

	if (option === 0) {
		return (
			<TwoFactorCode
				isRobot={isRobot}
				testing={testing}
				endpoint={endpoint}
				onAuthSuccess={onAuthSuccess}
				user={user}
			/>
		)
	}
	if (option === 1) {
		return (
			<EmailCode
				onAuthSuccess={onAuthSuccess}
				isRecovery={false}
				isRobot={isRobot}
				testing={testing}
				endpoint={endpoint}
				user={user}
			/>
		)
	}
	if (option === 2) {
		return (
			<EmailCode
				onAuthSuccess={onAuthSuccess}
				isRecovery={true}
				isRobot={isRobot}
				testing={testing}
				endpoint={endpoint}
				user={user}
			/>
		)
	}
	if (option === 3) {
		return (
			<SecurityCode
				isRobot={isRobot}
				testing={testing}
				endpoint={endpoint}
				onAuthSuccess={onAuthSuccess}
				user={user}
			/>
		)
	}

	return (
		<TwoFactorCode
			isRobot={isRobot}
			testing={testing}
			endpoint={endpoint}
			onAuthSuccess={onAuthSuccess}
			user={user}
		/>
	)
}

type Props = {
	option: number
	onAuthSuccess: (res: ApiResponseLoginT) => void
	isRobot: boolean
	endpointAlt?: boolean
	testing?: boolean
}

export default ShowOptions
