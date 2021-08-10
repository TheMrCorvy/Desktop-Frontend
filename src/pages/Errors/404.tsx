import { FC } from "react"
import { Link } from "react-router-dom"

import { Container, Grid, Typography, Button } from "@material-ui/core"

import useStyles from "./styles"

import HomeIcon from "@material-ui/icons/Home"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

const NotFound: FC = () => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const classes = useStyles()

	return (
		<Container maxWidth="xl" className={classes.container} data-testid="test_not_found_page">
			<Grid container justify="center" className={classes.centerAll} spacing={0}>
				<Grid item xs={12}>
					<Typography variant="h3" paragraph gutterBottom>
						{translate("error_404", lng)}
					</Typography>
					<Link to="/" className={classes.button}>
						<Button
							variant="contained"
							color="primary"
							startIcon={<HomeIcon />}
							disableElevation
						>
							{translate("home", lng)}
						</Button>
					</Link>
				</Grid>
			</Grid>
		</Container>
	)
}

export default NotFound
