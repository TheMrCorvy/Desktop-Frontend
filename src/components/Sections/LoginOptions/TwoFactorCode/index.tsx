import React from "react"
import { Box, Grid } from "@material-ui/core"

const TwoFactorCode = ({ testing }: { testing?: boolean }) => {
	return (
		<Box component="div">
			<Grid container justify="center" spacing={3}>
				<Grid item xs={6}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio recusandae
					aspernatur, tenetur inventore exercitationem, dignissimos obcaecati non maiores
					beatae cupiditate totam fuga autem, similique repellat veritatis sed suscipit
					est deserunt!
				</Grid>
				<Grid item xs={12}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio recusandae
					aspernatur, tenetur inventore exercitationem, dignissimos obcaecati non maiores
					beatae cupiditate totam fuga autem, similique repellat veritatis sed suscipit
					est deserunt!
				</Grid>
				<Grid item xs={12}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio recusandae
					aspernatur, tenetur inventore exercitationem, dignissimos obcaecati non maiores
					beatae cupiditate totam fuga autem, similique repellat veritatis sed suscipit
					est deserunt!
				</Grid>
			</Grid>
		</Box>
	)
}

export default TwoFactorCode
