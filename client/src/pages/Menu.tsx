import { Box, Grid } from "@mui/material";
import MenuComponent from "../containers/MenuComponent";
import "../css/Menu.css"

const Menu = ({hidden, connection, isMobile}:{hidden:boolean, connection:boolean, isMobile:boolean}) => {

    return(
        <Box className={"page"+(hidden ? "":" page-shown")}>
            <header>
                <h1>Web Page of Fune</h1>
            </header>
            <Grid spacing={8} container>
                <MenuComponent id={1} imgsrc="./assets/fune.png" title="Fune" connection={connection} isMobile={isMobile}/>
                <MenuComponent id={2} imgsrc="./assets/fission.png" title="Fission" connection={connection} isMobile={isMobile}/>
            </Grid>
        </Box>
    )
}

export default Menu;