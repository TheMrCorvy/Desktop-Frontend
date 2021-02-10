import React, { FC } from "react"
import logo from "./logo.svg"
import "./App.css"
import { useDispatch, useSelector } from "react-redux"

import { RootState } from "./redux/store"
import { setLanguage } from "./redux/actions/langActions"
import { translate } from "./lang"

const App: FC = () => {
	const { language } = useSelector((state: RootState) => state.language)
	const dispatch = useDispatch()

	const chooseLanguage = (value: string) => {
		dispatch(setLanguage(value))
	}

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>{translate("prueba", language)}</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
				<button onClick={() => chooseLanguage("en")}>en</button>
				<button onClick={() => chooseLanguage("es")}>es</button>
				<button onClick={() => chooseLanguage("jp")}>jp</button>
			</header>
		</div>
	)
}

export default App
