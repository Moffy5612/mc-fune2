import { Grid, Typography } from "@mui/material"
import { useContext } from "react"
import { PageContext } from "../App"

const MenuComponent = ({id, imgsrc, title, connection}:{id:number, imgsrc:string, title:string, connection:boolean}) => {
    
    const context = useContext(PageContext)

    return(
        <Grid item className="menu-content" onClick={()=>{if(connection)context?.setPage(id)}} xs={context?.isMobile ? 16 : 4}>
            <img alt={imgsrc} src={imgsrc}></img>
            <Typography variant="h2" align="center" className="title">{title}</Typography>
            <Typography variant="h6" className={connection?"connection-ok":"connection-error"}> Server Connection: {connection?"OK":"Error"}</Typography>
        </Grid>
    )
}

export default MenuComponent