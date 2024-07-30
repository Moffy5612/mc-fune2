import { ArrowBack } from "@mui/icons-material";
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { MapContainer} from "react-leaflet";
import L from "leaflet"

import "../css/Fune.css"
import "leaflet/dist/leaflet.css"
import FuneMap from "../containers/FuneMap";
import { Box, Button, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import AppTab from "../containers/AppTab";
import { addAppEffect, PageContext } from "../App";

const Fune = ({isMobile, hidden}:{isMobile:boolean, hidden:boolean}) => {

    const context = useContext(PageContext)

    const[socket, setSocket]:[WebSocket | undefined, Dispatch<SetStateAction<WebSocket | undefined>>] = useState()
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

    const[logs, setLogs]:[string[],Dispatch<SetStateAction<string[]>>]=useState([] as string[])

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
                if(Object.keys(shipdata.logs).length === 0)setLogs([])
                else setLogs(shipdata.logs)
            }
        })
    })

    return(
        <Box className={"page"+(hidden ? "":" page-shown")} alignContent={"center"}>
            <header>
                <h1>Fune</h1>
                <ArrowBack className="back" fontSize="large" onClick={()=>{context?.setPage(0)}}/>
            </header>
            <Grid container spacing={2} className={"fune-content"}>
                <AppTab hidden={hidden} xs={isMobile ? 16 : 6} title="Map" isMobile={isMobile} delay={0}>
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
                <Grid item container xs={isMobile ? 16 : 6} spacing={2}>
                    <AppTab hidden={hidden} xs={16} title="Info" isMobile={isMobile} delay={1}>
                        <Typography variant="h5">Position</Typography>
                            <div className={ (isMobile ? "" : " inline")}>
                                <Typography variant="h6" style={{marginLeft:(isMobile ? 30 : 80)}}>x : {funeX}</Typography>
                                <Typography variant="h6" style={{marginLeft:30}}>y : {funeY}</Typography>
                                <Typography variant="h6" style={{marginLeft:30}}>z : {funeZ}</Typography>
                            </div>
                            <Typography variant="h5" style={{marginTop:20}}>Degree</Typography>
                            <Typography variant="h6" style={{marginLeft:80}}>{degree} degree</Typography>
                            <Typography variant="h5" style={{marginTop:20}}>Direction</Typography>
                            <Typography variant="h4" style={{marginLeft:80}}>{getDirection()}</Typography>
                    </AppTab>
                    <Grid item container xs={16} spacing={2}>
                        <AppTab hidden={hidden} xs={isMobile ? 16 : 6} title="Control" isMobile={isMobile} delay={2} scroll>
                            <form onSubmit={onAutoCruiseSubmit}>
                                <FormControl variant="standard">
                                    <RadioGroup value={cmd} onChange={(event)=>{setCmd((event.target as HTMLInputElement).value)}} defaultValue={"to"}>
                                            <FormControlLabel control={<Radio />} label="auto-cruise to:" value={"to"}/>
                                            <div className={(isMobile ? "" : " inline")}>
                                                <input type="text" style={{width:"30%", marginLeft:5}} placeholder="x" onChange={(event)=>{setFormX(event.target.value)}}></input>
                                                <input type="text" style={{width:"30%", marginLeft:5}} placeholder="y" onChange={(event)=>{setFormY(event.target.value)}}></input>
                                                <input type="text" style={{width:"30%", marginLeft:5}} placeholder="z" onChange={(event)=>{setFormZ(event.target.value)}}></input>
                                            </div>
                                            <FormControlLabel control={<Radio />} label="return base" value={"base"} sx={{marginTop:2}}/>
                                            <div className="inline" style={{marginTop:2}}>
                                                <FormControlLabel control={<Radio />} label="rotate to:" value={"rotate"}/>
                                                <input type="text" style={{width:"30%", height:"50%", margin:"auto 0px"}} placeholder="degree" onChange={(event)=>{setFormDegree(event.target.value)}}></input>
                                            </div>
                                            <FormControlLabel control={<Radio />} label="open roof" value={"open"}/>
                                            <FormControlLabel control={<Radio />} label="close roof" value={"close"}/>
                                            <FormControlLabel control={<Radio />} label="ship transform" value={"transform"}/>
                                            <Button type="submit" variant="outlined">send</Button>
                                    </RadioGroup>
                                </FormControl>
                            </form>
                        </AppTab>
                        <AppTab hidden={hidden} xs={isMobile ? 16 : 6} title="Log" isMobile={isMobile} delay={3} scroll>
                            {logs.map((log)=>{return (<p style={{margin:3}}>{log}</p>) })}
                        </AppTab>
                    </Grid>
                    
                </Grid>
            </Grid>
        </Box>
    )
}

export default Fune;