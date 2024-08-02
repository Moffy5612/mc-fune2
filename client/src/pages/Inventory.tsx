import { Box, Button, Grid, Typography } from "@mui/material"
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { addAppEffect, PageContext } from "../App"
import { ArrowBack } from "@mui/icons-material"
import AppTab from "../containers/AppTab"
import { ReactState } from "../types/App"
import "../css/Inventory.css"

const Inventory = ({isMobile, hidden}:{isMobile:boolean, hidden:boolean}) => {

    const context = useContext(PageContext)

    const [socket, setSocket]:ReactState<WebSocket | undefined> = useState()
    const [transport, setTransport] = useState(false)

    const[logs, setLogs]:ReactState<string[]>=useState([] as string[])

    useEffect(()=>{
        addAppEffect({
            id: 27,
            applyEffect(ws, data) {
                if(!socket){
                    setSocket(ws)
                }
                setTransport(data.transport)
                if(Object.keys(data.logs).length === 0)setLogs([])
                else setLogs(data.logs)
            },
        })
    })

    const onToggleTransport = ()=>{
        const data = {
            id: 27,
            data: "transport"
        }
        socket?.send(JSON.stringify(data))
    }

    return(
        <Box  className={"page"+(hidden ? "":" page-shown")} alignContent={"center"}>
            <header>
                <h1>Inventory</h1>
                <ArrowBack className="back" fontSize="large" onClick={()=>{context?.setPage(0)}}/>
            </header>
            <Grid container spacing={2} className="inventory-content">
                <AppTab hidden={hidden} xs={isMobile ? 16 : 6} title="Info" isMobile={isMobile} delay={0}>
                    <div className="inline">
                        <Button onClick={onToggleTransport} variant="contained">toggle</Button>
                        <Typography variant="h6" style={{marginLeft:20}}>auto transport: </Typography>
                        <Typography variant="h6" style={{color: transport? "seagreen" : "crimson", marginLeft:10}} >{transport ? "on" : "off"}</Typography>
                    </div>
                </AppTab>
                <Grid item container xs={isMobile ? 16 : 6}>
                    <AppTab hidden={hidden} xs={16} title="Logs" isMobile={isMobile} delay={1} scroll>
                        {logs.map((log)=>{return (<p style={{margin:3}}>{log}</p>) })}
                    </AppTab>
                    <AppTab hidden={hidden} xs={16}  isMobile={isMobile} delay={1} scroll>
                        
                    </AppTab>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Inventory