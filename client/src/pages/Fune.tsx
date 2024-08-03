import React, { useContext, useEffect, useState } from "react";
import { MapContainer} from "react-leaflet";
import L from "leaflet"

import "../css/Fune.css"
import "leaflet/dist/leaflet.css"
import FuneMap from "../containers/FuneMap";
import { Button, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import AppTab from "../containers/AppTab";
import { addAppEffect, PageContext } from "../App";
import { ReactState } from "../types/App";
import AppBox from "../containers/AppBox";
import AppInline from "../containers/AppInline";
import AppGrid from "../containers/AppGrid";
import AppLogTab from "../containers/AppLogTab";
import AppUtils from "../utils/AppUtils";

const Fune = ({id}:{id: number}) => {

    const context = useContext(PageContext)

    const[socket, setSocket]:ReactState<WebSocket | undefined> = useState()
    const[transformed, setTransformed] = useState(false)

    const[degree,setDegree]=useState(0.0)

    const[funeX,setFuneX]=useState(0)
    const[funeY,setFuneY]=useState(0)
    const[funeZ,setFuneZ]=useState(0)

    const[cmd, setCmd]=useState("to")

    const[formX,setFormX]=useState("-6")
    const[formY,setFormY]=useState("200")
    const[formZ,setFormZ]=useState("200")
    const[formDegree,setFormDegree]=useState("0")

    const[logs, setLogs]:ReactState<string[]>=useState([] as string[])

    const getDirection=()=>{
        if(degree >= -135 && degree < -45)return "North"
        else if(degree <= 135 && degree > 45)return "South"
        else if(degree <= 45 && degree > -45)return "East"
        else return "West"
    }

    const onAutoCruiseSubmit=(event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()

        let str = cmd

        if(str === "to"){
            if(!(Number(formX) && Number(formY) && Number(formZ))){
                alert("x, y, and z must all be numbers.")
                return
            }
            if(Number(formY) < -40 || Number(formY) > 250){
                alert("Please enter the y coordinate in the range of -40 to 250.")
                return
            }
            str += ` ${formX} ${formY} ${formZ}`
        }
        else if(cmd === "rotate"){
            if(!Number(formDegree)){
                alert("degree must be a number.")
                return
            }
            if(Number(formDegree) < -180 || Number(formDegree) > 180){
                alert("Please enter the y coordinate in the range of -180 to 180.")
                return
            }
            str += ` ${formDegree}`
        }

        let data = {
            id: 1,
            data: str
        }

        if(socket)socket.send(JSON.stringify(data))
    }

    useEffect(()=>{
        addAppEffect({
            id: 1,
            applyEffect: (ws, shipdata)=>{
                if(!socket){
                    setSocket(ws)
                }
                setTransformed(shipdata.transformed)
                setFuneX(shipdata.pos.x as number)
                setFuneY(shipdata.pos.y as number)
                setFuneZ(shipdata.pos.z as number)
                setDegree(shipdata.degree)
                AppUtils.setLogs(shipdata.logs, setLogs)
            }
        })
    })

    return(
        <AppBox id={id} title="Fune">
            <AppTab id={id} xs={6} title="Map" delay={0}>
                <MapContainer
                        crs={L.CRS.Simple}
                        scrollWheelZoom={false}
                        doubleClickZoom={false}
                        zoom={0}
                        center={[-funeZ / 2, funeX / 2]}
                    >
                        <FuneMap funeX={funeX} funeZ={funeZ} degree={degree} transformed={transformed} socket={socket}></FuneMap>
                </MapContainer>
            </AppTab>
            <AppGrid xs={6}>
                <AppTab id={id} xs={16} title="Info" delay={1}>
                    <Typography variant="h5">Position</Typography>
                        <AppInline>
                            <Typography variant="h6" style={{marginLeft:(context?.isMobile ? 30 : 80)}}>x : {funeX}</Typography>
                            <Typography variant="h6" style={{marginLeft:30}}>y : {funeY}</Typography>
                            <Typography variant="h6" style={{marginLeft:30}}>z : {funeZ}</Typography>
                        </AppInline>
                        <Typography variant="h5" style={{marginTop:20}}>Degree</Typography>
                        <Typography variant="h6" style={{marginLeft:80}}>{degree} degree</Typography>
                        <Typography variant="h5" style={{marginTop:20}}>Direction</Typography>
                        <Typography variant="h4" style={{marginLeft:80}}>{getDirection()}</Typography>
                </AppTab>
                <Grid item container xs={16} spacing={2}>
                    <AppTab id={id} xs={6} title="Control" delay={2} scroll>
                        <form onSubmit={onAutoCruiseSubmit}>
                            <FormControl variant="standard">
                                <RadioGroup value={cmd} onChange={(event)=>{setCmd((event.target as HTMLInputElement).value)}} defaultValue={"to"}>
                                        <FormControlLabel control={<Radio />} label="auto-cruise to:" value={"to"}/>
                                        <AppInline>
                                            <input type="text" style={{width:"30%", marginLeft:5}} placeholder="x" onChange={(event)=>{setFormX(event.target.value)}}></input>
                                            <input type="text" style={{width:"30%", marginLeft:5}} placeholder="y" onChange={(event)=>{setFormY(event.target.value)}}></input>
                                            <input type="text" style={{width:"30%", marginLeft:5}} placeholder="z" onChange={(event)=>{setFormZ(event.target.value)}}></input>
                                        </AppInline>
                                        <FormControlLabel control={<Radio />} label="return base" value={"base"} sx={{marginTop:2}}/>
                                        <AppInline style={{marginTop:2}}>
                                            <FormControlLabel control={<Radio />} label="rotate to:" value={"rotate"}/>
                                            <input type="text" style={{width:"30%", height:"50%", margin:"auto 0px"}} placeholder="degree" onChange={(event)=>{setFormDegree(event.target.value)}}></input>
                                        </AppInline>
                                        <FormControlLabel control={<Radio />} label="open roof" value={"open"}/>
                                        <FormControlLabel control={<Radio />} label="close roof" value={"close"}/>
                                        <FormControlLabel control={<Radio />} label="ship transform" value={"transform"}/>
                                        <Button type="submit" variant="outlined">send</Button>
                                </RadioGroup>
                            </FormControl>
                        </form>
                    </AppTab>
                    <AppLogTab id={id} delay={3} xs={6} logs={logs}></AppLogTab>
                </Grid>
            </AppGrid>
        </AppBox>
    )
}

export default Fune;