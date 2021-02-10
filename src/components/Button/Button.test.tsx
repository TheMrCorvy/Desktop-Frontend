import React from "react"
import { render, screen } from "@testing-library/react"
import Button from "./index"

test("renders learn react link", () => {
	render(<Button text="algo" />)
	const linkElement = screen.getByText(/algo/i)
	expect(linkElement).toBeInTheDocument()
})
