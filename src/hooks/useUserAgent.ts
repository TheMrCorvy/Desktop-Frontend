const getUserAgent = () => {
	const userAgentInfo = navigator.userAgent

	const multipleStrings = userAgentInfo.split("(")

	const finalStrings = multipleStrings[1].split(")")

	return finalStrings[0]
}

export default getUserAgent
