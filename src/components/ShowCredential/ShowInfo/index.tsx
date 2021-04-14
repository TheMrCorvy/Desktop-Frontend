import React, { FC, useEffect, useState } from "react"

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

const ShowInfo: FC<Props> = ({ credential, locked, visible }) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const [multipleCodes, setMultipleCodes] = useState<string[] | null>(null)

	const [cryptoAccess, setCryptoAccess] = useState<string[] | null>(null)

	useEffect(() => {
		if (!locked || visible) {
			if (credential.security_codes?.multiple_security_codes) {
				const codes = credential.security_codes?.multiple_security_codes

				if (codes) {
					const arr = codes.match(/\S+/g)

					setMultipleCodes(arr)
				}
			}

			if (credential.security_codes?.crypto_currency_access_code) {
				const words = credential.security_codes?.crypto_currency_access_code

				if (words) {
					const arr = words.match(/\S+/g)

					setCryptoAccess(arr)
				}
			}
		} else {
			if (credential.security_codes?.multiple_security_codes) {
				const length = credential.security_codes?.multiple_code_length

				setMultipleCodes([...Array(length)].map(() => "•••••"))
			}

			if (credential.security_codes?.crypto_currency_access_code) {
				const length = credential.security_codes?.crypto_code_length

				setCryptoAccess([...Array(length)].map(() => "•••••"))
			}
		}
	}, [credential, locked, visible])

	const sQuestion = () => {
		if (visible || !locked) {
			return credential.security_question_answer?.security_question
		} else {
			return undefined
		}
	}

	const sAnswer = () => {
		if (visible || !locked) {
			return credential.security_question_answer?.security_answer
		} else {
			return undefined
		}
	}

	return (
		<>
			{credential.user_name && (
				<Grid item xs={12} md={6} data-testid="test_credential_name">
					<CredentialProperties
						visible={visible}
						locked={locked}
						label={translate("auth_form_texts", lng, 14)}
						opening=""
						char_count={credential.char_count}
						ending=""
						body={credential.user_name}
					/>
				</Grid>
			)}
			{credential.email && (
				<Grid item xs={12} md={6} data-testid="test_credential_email">
					<CredentialProperties
						visible={visible}
						locked={locked}
						label={translate("auth_form_texts", lng, 0)}
						opening={credential.email.opening}
						char_count={credential.email.char_count}
						ending={credential.email.ending}
						body={credential.email.email}
					/>
				</Grid>
			)}
			{credential.password && (
				<Grid item xs={12} md={6} data-testid="test_credential_pass">
					<CredentialProperties
						visible={visible}
						locked={locked}
						label={translate("auth_form_texts", lng, 11)}
						opening=""
						char_count={credential.password.char_count}
						ending=""
						body={credential.password.password}
					/>
				</Grid>
			)}
			{credential.username && (
				<Grid item xs={12} md={6} data-testid="test_credential_username">
					<CredentialProperties
						visible={visible}
						locked={locked}
						label={translate("auth_form_texts", lng, 12)}
						opening=""
						char_count={credential.username.char_count}
						ending=""
						body={credential.username.username}
					/>
				</Grid>
			)}
			{credential.phone_number && (
				<Grid item xs={12} md={6} data-testid="test_credential_phone">
					<CredentialProperties
						visible={visible}
						locked={locked}
						label={translate("auth_form_texts", lng, 7)}
						opening={credential.phone_number.opening}
						char_count={credential.phone_number.char_count}
						ending={credential.phone_number.ending}
						body={credential.phone_number.phone_number}
					/>
				</Grid>
			)}
			{credential.security_codes?.unique_security_code && (
				<Grid item xs={12} md={6} data-testid="test_credential_unique_code">
					<CredentialProperties
						visible={visible}
						locked={locked}
						label={translate("auth_form_texts", lng, 13)}
						opening=""
						char_count={5}
						ending=""
						body={credential.security_codes.unique_security_code}
					/>
				</Grid>
			)}
			{credential.security_question_answer && (
				<Grid item xs={12} md={6} data-testid="test_credential_sqa">
					<CredentialSQA
						locked={locked}
						visible={visible}
						question={sQuestion()}
						answer={sAnswer()}
					/>
				</Grid>
			)}
			{multipleCodes && (
				<Grid item xs={12} md={6} data-testid="test_credential_multiple_code">
					<CredentialCodes
						visible={visible}
						body={multipleCodes}
						locked={locked}
						label={translate("encryption_examples", lng, 8)}
					/>
				</Grid>
			)}
			{cryptoAccess && (
				<Grid item xs={12} md={6} data-testid="test_credential_crypto_access">
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
