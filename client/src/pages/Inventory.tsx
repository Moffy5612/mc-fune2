import { Button, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { addAppEffect } from "../App"
import AppTab from "../containers/AppTab"
import { ReactState } from "../types/App"
import "../css/Inventory.css"
import AppBox from "../containers/AppBox"
import AppGrid from "../containers/AppGrid"
import AppLogTab from "../containers/AppLogTab"
import AppUtils from "../utils/AppUtils"

const Inventory = ({id}:{id: number}) => {
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
                AppUtils.setLogs(data.logs, setLogs)
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
        <AppBox id={id} title="Inventory">
            <AppTab id={id} xs={6} title="Info" delay={0}>
                    <div className="inline">
                        <Button onClick={onToggleTransport} variant="contained">toggle</Button>
                        <Typography variant="h6" style={{marginLeft:20}}>auto transport: </Typography>
                        <Typography variant="h6" style={{color: transport? "seagreen" : "crimson", marginLeft:10}} >{transport ? "on" : "off"}</Typography>
                    </div>
                </AppTab>
                <AppGrid xs={6}>
                    <AppLogTab id={id} logs={logs} delay={1}></AppLogTab>
                    <AppTab id={id} delay={1} scroll>
                        
                    </AppTab>
                </AppGrid>
        </AppBox>
    )
}

export default Inventory