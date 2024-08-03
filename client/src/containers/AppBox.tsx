import { ArrowBack } from "@mui/icons-material"
import { Box, Grid } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { PageContext } from "../App"

const AppBox = ({id, title, children}: React.PropsWithChildren<{id:number, title:string}>) => {
    const context = useContext(PageContext)
    
    const [hidden, setHidden] = useState(id != context?.page)

    useEffect(() => {
        setHidden(id !== context?.page)
    }, [context?.page])
    
    return (
        <Box className={"page"+(hidden ? "":" page-shown")}>
            <header>
                <h1>{title}</h1>
                <ArrowBack className="back" fontSize="large" onClick={()=>{context?.setPage(0)}}/>
            </header>
            <Grid container spacing={2} className="app-content">
                {children}
            </Grid>
        </Box>
    )
}

export default AppBox