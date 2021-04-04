import React, { useState, useEffect } from "react"
import { CredentialT } from "../../misc/types"

import { Grid, Typography } from "@material-ui/core"

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"

import UnlockData from "../UnlockData"
import CredentialProperties from "./CredentialProperties"
import CredentialSQA from "./CredentialSQA"
import CredentialCodes from "./CredentialCodes"

type Props = {
	credential: CredentialT
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		title: {
			display: "flex",
			textAlign: "center",
			alignItems: "center",
			textTransform: "capitalize",
		},
		lockIcon: {
			display: "flex",
			textAlign: "center",
			alignItems: "center",
			justifyContent: "center",
		},
	})
)

const ShowCredential = ({ credential }: Props) => {
	const [locked, setLocked] = useState(true)
	const [multipleCodes, setMultipleCodes] = useState<string[] | null>(null)
	const [cryptoAccess, setCryptoAccess] = useState<string[] | null>(null)

	const classes = useStyles()

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
			<Grid item xs={10} sm={11} className={classes.title}>
				<Typography variant="h6">{credential.company_name}</Typography>
			</Grid>
			<Grid item xs={2} sm={1} className={classes.lockIcon}>
				<UnlockData toggleLock={() => setLocked(!locked)} locked={locked} />
			</Grid>
			{credential.user_name && (
				<Grid item xs={12} md={6}>
					<CredentialProperties
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
						body={multipleCodes}
						locked={locked}
						label="Multiple Security Codes"
					/>
				</Grid>
			)}
			{cryptoAccess && (
				<Grid item xs={12} md={6}>
					<CredentialCodes
						body={cryptoAccess}
						locked={locked}
						label="Crypto Currency Access Codes"
						isCrypto
					/>
				</Grid>
			)}
		</>
	)
}
export default ShowCredential
