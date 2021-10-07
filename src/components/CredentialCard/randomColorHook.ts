import {
	deepPurple,
	indigo,
	purple,
	red,
	blue,
	lightBlue,
	teal,
	green,
	orange,
	deepOrange,
} from "@material-ui/core/colors"

const colorsToPick = [
	red[500],
	purple[500],
	deepPurple[500],
	indigo[500],
	blue[500],
	lightBlue[500],
	teal[500],
	green[500],
	orange[900],
	deepOrange[500],
]

const minimum = 0
const maximum = colorsToPick.length

const useRandomColor = () => {
	return colorsToPick[Math.floor(Math.random() * maximum) + minimum]
}

export default useRandomColor
