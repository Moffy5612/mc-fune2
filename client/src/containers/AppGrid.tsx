import { useContext } from "react"
import { PageContext } from "../App"
import { Grid } from "@mui/material"

const AppGrid = ({xs, children}: React.PropsWithChildren<{xs: number}>) => {
    const context = useContext(PageContext)

    return (
        <Grid item container xs = {context?.isMobile ? 16 : xs} spacing={2}>
            {children}
        </Grid>
    )
}

export default AppGrid