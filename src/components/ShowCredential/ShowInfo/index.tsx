import React, { useEffect, useState } from "react"

import { Grid } from "@material-ui/core"

import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"

import { translate } from "../../../lang"

import CredentialProperties from "../CredentialProperties"
import CredentialSQA from "../CredentialSQA"
import CredentialCodes from "../CredentialCodes"

import { CredentialT } from "../../../misc/types"

type Props = {
	credential: CredentialT
	locked: boolean
	visible: boolean
}

const ShowInfo = ({ credential, locked, visible }: Props) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const [multipleCodes, setMultipleCodes] = useState<string[] | null>(null)

	const [cryptoAccess, setCryptoAccess] = useState<string[] | null>(null)

	useEffect(() => {
		if (!locked && credential.security_codes?.multiple_security_codes) {
			const codes = credential.security_codes?.multiple_security_codes

			if (codes) {
				const arr = codes.match(/\S+/g)

				setMultipleCodes(arr)
			}
		}

		if (locked && credential.security_codes?.multiple_security_codes) {
			const length = credential.security_codes?.multiple_code_length

			setMultipleCodes([...Array(length)].map((value: undefined) => "•••••"))
		}

		if (!locked && credential.security_codes?.crypto_currency_access_code) {
			const words = credential.security_codes?.crypto_currency_access_code

			if (words) {
				const arr = words.match(/\S+/g)

				setCryptoAccess(arr)
			}
		}

		if (locked && credential.security_codes?.crypto_currency_access_code) {
			const length = credential.security_codes?.crypto_code_length

			setCryptoAccess([...Array(length)].map((value: undefined) => "•••••"))
		}
	}, [credential, locked])

	return (
		<>
			{credential.user_name && (
				<Grid item xs={12} md={6}>
					<CredentialProperties
						visible={visible}
						locked={locked}
						label="Name"
						opening=""
						char_count={credential.char_count}
						ending=""
						body={credential.user_name}
					/>
				</Grid>
			)}
			{credential.email && (
				<Grid item xs={12} md={6}>
					<CredentialProperties
						visible={visible}
						locked={locked}
						label="Email"
						opening={credential.email.opening}
						char_count={credential.email.char_count}
						ending={credential.email.ending}
						body={credential.email.email}
					/>
				</Grid>
			)}
			{credential.password && (
				<Grid item xs={12} md={6}>
					<CredentialProperties
						visible={visible}
						locked={locked}
						label="Password"
						opening=""
						char_count={credential.password.char_count}
						ending=""
						body={credential.password.password}
					/>
				</Grid>
			)}
			{credential.username && (
				<Grid item xs={12} md={6}>
					<CredentialProperties
						visible={visible}
						locked={locked}
						label="Username"
						opening=""
						char_count={credential.username.char_count}
						ending=""
						body={credential.username.username}
					/>
				</Grid>
			)}
			{credential.phone_number && (
				<Grid item xs={12} md={6}>
					<CredentialProperties
						visible={visible}
						locked={locked}
						label="Phone Number"
						opening={credential.phone_number.opening}
						char_count={credential.phone_number.char_count}
						ending={credential.phone_number.ending}
						body={credential.phone_number.phone_number}
					/>
				</Grid>
			)}
			{credential.security_codes?.unique_security_code && (
				<Grid item xs={12} md={6}>
					<CredentialProperties
						visible={visible}
						locked={locked}
						label="Unique Security Code"
						opening=""
						char_count={5}
						ending=""
						body={credential.security_codes.unique_security_code}
					/>
				</Grid>
			)}
			{credential.security_question_answer && (
				<Grid item xs={12} md={6}>
					<CredentialSQA
						locked={locked}
						visible={visible}
						question={
							!locked
								? credential.security_question_answer.security_question
								: undefined
						}
						answer={
							!locked
								? credential.security_question_answer.security_answer
								: undefined
						}
					/>
				</Grid>
			)}
			{multipleCodes && (
				<Grid item xs={12} md={6}>
					<CredentialCodes
						visible={visible}
						body={multipleCodes}
						locked={locked}
						label={translate("encryption_examples", lng, 8)}
					/>
				</Grid>
			)}
			{cryptoAccess && (
				<Grid item xs={12} md={6}>
					<CredentialCodes
						visible={visible}
						body={cryptoAccess}
						locked={locked}
						label={translate("encryption_examples", lng, 9)}
						isCrypto
					/>
				</Grid>
			)}
		</>
	)
}

export default ShowInfo
