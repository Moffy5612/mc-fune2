import { ArrowBack } from "@mui/icons-material"
import { Box, Button, Grid, Typography } from "@mui/material"
import { addAppEffect, PageContext } from "../App"
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import "../css/Fission.css"
import AppTab from "../containers/AppTab"
import { ReactState } from "../types/App"

const Fission = ({isMobile, hidden}:{isMobile:boolean, hidden:boolean}) => {

    const context = useContext(PageContext)

    const [socket, setSocket]:ReactState<WebSocket | undefined> = useState()
    
    const [boilerWater, setBoilerWater] = useState(0);
    const [autoControl, setAutoControl] = useState(false);
    const [turbine3ProductionRate, setTurbine3ProductionRate] = useState(0);
    const [turbine1ProductionRate, setTurbine1ProductionRate] = useState(0);
    const [fissionHeatedCoolantCap, setFissionHeatedCoolantCap] = useState(0);
    const [turbine3Steam, setTurbine3Steam] = useState(0);
    const [turbine1SteamCap, setTurbine1SteamCap] = useState(0);
    const [fissionFuel, setFissionFuel] = useState(0);
    const [boilerCoolantCap, setBoilerCoolantCap] = useState(0);
    const [boilerSteam, setBoilerSteam] = useState(0);
    const [turbine2SteamCap, setTurbine2SteamCap] = useState(0);
    const [boilerWaterCap, setBoilerWaterCap] = useState(0);
    const [fissionFuelCap, setFissionFuelCap] = useState(0);
    const [logs, setLogs]:[string[],Dispatch<SetStateAction<string[]>>]=useState([] as string[])
    const [turbine3SteamCap, setTurbine3SteamCap] = useState(0);
    const [turbine2Steam, setTurbine2Steam] = useState(0);
    const [fissionWaste, setFissionWaste] = useState(0);
    const [turbine1Steam, setTurbine1Steam] = useState(0);
    const [boilerHeatedCoolant, setBoilerHeatedCoolant] = useState(0);
    const [fissionCoolantName, setFissionCoolantName] = useState("");
    const [fissionCoolantAmount, setFissionCoolantAmount] = useState(0);
    const [boilerSteamCap, setBoilerSteamCap] = useState(0);
    const [fissionTemperature, setFissionTemperature] = useState(0);
    const [fissionStatus, setFissionStatus] = useState(false);
    const [fissionBurnRate, setFissionBurnRate] = useState(0);
    const [boilerHeatedCoolantCap, setBoilerHeatedCoolantCap] = useState(0);
    const [fissionCoolantCap, setFissionCoolantCap] = useState(0);
    const [turbine2ProductionRate, setTurbine2ProductionRate] = useState(0);
    const [fissionHeatedCoolantName, setFissionHeatedCoolantName] = useState("");
    const [fissionHeatedCoolantAmount, setFissionHeatedCoolantAmount] = useState(0);
    const [boilerCoolant, setBoilerCoolant] = useState(0);
    const [fissionWasteCap, setFissionWasteCap] = useState(0);
    const [fissionDamage, setFissionDamage] = useState(0);

    const [newBurnRate, setNewBurnRate]:ReactState<number|undefined> = useState()

    useEffect(()=>{
        addAppEffect({
            id: 10,
            applyEffect: (ws, data) => {
                if(!socket){
                    setSocket(ws)
                }
                setBoilerWater(data.boilerWater);
                setAutoControl(data.autoControl);
                setTurbine3ProductionRate(data.turbine3ProductionRate);
                setTurbine1ProductionRate(data.turbine1ProductionRate);
                setFissionHeatedCoolantCap(data.fissionHeatedCoolantCap);
                setTurbine3Steam(data.turbine3Steam);
                setTurbine1SteamCap(data.turbine1SteamCap);
                setFissionFuel(data.fissionFuel);
                setBoilerCoolantCap(data.boilerCoolantCap);
                setBoilerSteam(data.boilerSteam);
                setTurbine2SteamCap(data.turbine2SteamCap);
                setBoilerWaterCap(data.boilerWaterCap);
                setFissionFuelCap(data.fissionFuelCap);
                setTurbine3SteamCap(data.turbine3SteamCap);
                setTurbine2Steam(data.turbine2Steam);
                setFissionWaste(data.fissionWaste);
                setTurbine1Steam(data.turbine1Steam);
                setBoilerHeatedCoolant(data.boilerHeatedCoolant);
                setFissionCoolantName(data.fissionCoolant.name);
                setFissionCoolantAmount(data.fissionCoolant.amount);
                setBoilerSteamCap(data.boilerSteamCap);
                setFissionTemperature(data.fissionTemperature);
                setFissionStatus(data.fissionStatus);
                setFissionBurnRate(data.fissionBurnRate);
                setBoilerHeatedCoolantCap(data.boilerHeatedCoolantCap);
                setFissionCoolantCap(data.fissionCoolantCap);
                setTurbine2ProductionRate(data.turbine2ProductionRate);
                setFissionHeatedCoolantName(data.fissionHeatedCoolant.name);
                setFissionHeatedCoolantAmount(data.fissionHeatedCoolant.amount);
                setBoilerCoolant(data.boilerCoolant);
                setFissionWasteCap(data.fissionWasteCap);
                setFissionDamage(data.fissionDamage)
                if(Object.keys(data.logs).length === 0)setLogs([])
                else setLogs(data.logs)
            },
        })
    },[])

    const getPercentage = (amount:number, capacity:number) => {
        return Math.round(amount / capacity * 10000) / 100
    }

    const activate = () => {
        if(autoControl)sendCmd("auto")
        sendCmd("activate")
    }

    const scram = () => {
        if(autoControl)sendCmd("auto")
        sendCmd("scram")
    }

    const sendCmd = (val :string) => {
        if(socket){
            const data = {
                id: 10,
                data: val
            }
            socket.send(JSON.stringify(data))
        }
    }

    const changeBurnRate = () => {
        if(newBurnRate){
            if(newBurnRate > 1435 || newBurnRate < 0){
                alert("Please enter new burn rate in the range of 0 to 1435.")
            } else {
                if(socket){
                    const data = {
                        id: 10,
                        data: "rate "+newBurnRate
                    }
                    socket.send(JSON.stringify(data))
                }
            }
        }
    }

    const activateBtnStyle = {
        margin: "auto",
        color: "antiquewhite",
        backgroundColor: "seagreen",
        fontSize: 38
    }

    const scramBtnStyle = {
        margin: "auto",
        color: "antiquewhite",
        backgroundColor: "crimson",
        fontSize: 38
    }

    const disabledBtnStyle = {
        margin: "auto",
        backgroundColor: "gray",
        fontSize: 38
    }

    return(
        <Box className={"page"+(hidden ? "":" page-shown")} alignContent={"center"}>
            <header>
                <h1>Fission</h1>
                <ArrowBack className="back" fontSize="large" onClick={()=>{context?.setPage(0)}}/>
            </header>
            <Grid container spacing={2} className="fission-content">
                <Grid item container xs={isMobile ? 16 : 6}>
                    <AppTab isMobile={isMobile} hidden={hidden} delay={0} xs={16} title="Info">
                        <div className="inline">
                            <h2>Status: </h2>
                            <h2 style={{marginLeft:20, color:(fissionStatus ? "seagreen" : "crimson")}}>{fissionStatus ? "Enabled" : "Disabled"}</h2>
                        </div>
                        <br></br>
                        <div className="inline">
                            <h2>Auto-Controled Mode: </h2>
                            <h2 style={{marginLeft:20, color:(autoControl ? "seagreen" : "crimson")}}>{autoControl ? "Enabled" : "Disabled"}</h2>
                        </div>
                        <br></br>
                        <hr></hr>
                        <div style={{height:isMobile ? 200 : 490, overflowY:"scroll"}}>
                            <h2>Fission Reactor</h2>
                            <div style={{marginLeft: 10}}>
                                <table className={isMobile? "tableMobile" : undefined}> 
                                    <tr>
                                        <th><Typography variant="h6">・Burn Rate: </Typography></th>
                                        <td className="tdValue"><Typography variant="h6">{fissionBurnRate} mB/t</Typography></td>
                                    </tr>
                                    <tr>
                                        <th><Typography variant="h6">・Temperature: </Typography></th>
                                        <td className="tdValue"><Typography variant="h6">{Math.round(fissionTemperature * 10000) / 10000} K</Typography></td>
                                    </tr>
                                    <tr>
                                        <th><Typography variant="h6">・Damage: </Typography></th>
                                        <td className="tdValue"><Typography variant="h6">{Math.round(fissionDamage * 10000) / 10000} %</Typography></td>
                                    </tr>
                                    <br></br>
                                    <tr>
                                        <th><Typography variant="h6">・Coolant: </Typography></th>
                                        <td className="tdValue"><Typography variant="h6">{fissionCoolantAmount} mB </Typography></td>
                                        <td className="tdSlash"><Typography variant="h6">/</Typography></td>
                                        <td className="tdValue"><Typography variant="h6">{fissionCoolantCap} mB</Typography></td>
                                        <td className="tdPercentage"><Typography variant="h6">({getPercentage(fissionCoolantAmount, fissionCoolantCap)}%)</Typography></td>
                                        <td><Typography variant="h6">{fissionCoolantName}</Typography></td>
                                    </tr>
                                    <tr>
                                        <th><Typography variant="h6">・Fuel: </Typography></th>
                                        <td className="tdValue"><Typography variant="h6">{fissionFuel} mB</Typography></td>
                                        <td className="tdSlash"><Typography variant="h6">/</Typography></td>
                                        <td className="tdValue"><Typography variant="h6">{fissionFuelCap} mB</Typography></td>
                                        <td className="tdPercentage"><Typography variant="h6">({getPercentage(fissionFuel, fissionFuel)}%)</Typography></td>
                                    </tr>
                                    <tr>
                                        <th><Typography variant="h6">・Heated Coolant: </Typography></th>
                                        <td className="tdValue"><Typography variant="h6">{fissionHeatedCoolantAmount} mB</Typography></td>
                                        <td className="tdSlash"><Typography variant="h6">/</Typography></td>
                                        <td className="tdValue"><Typography variant="h6">{fissionHeatedCoolantCap} mB</Typography></td> 
                                        <td className="tdPercentage"><Typography variant="h6">({getPercentage(fissionHeatedCoolantAmount, fissionHeatedCoolantCap)}%)</Typography></td>
                                        <td><Typography variant="h6">{fissionHeatedCoolantName}</Typography></td>                                
                                    </tr>
                                    <tr>
                                        <th><Typography variant="h6">・Waste: </Typography></th>
                                        <td className="tdValue"><Typography variant="h6">{fissionWaste} mB</Typography></td>
                                        <td className="tdSlash"><Typography variant="h6">/</Typography></td>
                                        <td className="tdValue"><Typography variant="h6">{fissionWaste} mB</Typography></td>
                                        <td className="tdPercentage"><Typography variant="h6">({getPercentage(fissionWaste, fissionWasteCap)}%)</Typography></td>                             
                                    </tr>
                                </table>
                            </div>
                            <h2>Boiler</h2>
                            <div style={{marginLeft: 10}}>
                                <table className={isMobile? "tableMobile" : ""}>
                                    <tr>
                                        <th><Typography variant="h6">・Heated Coolant: </Typography></th>
                                        <td className="tdValue"><Typography variant="h6">{boilerHeatedCoolant} mB</Typography></td>
                                        <td className="tdSlash"><Typography variant="h6">/</Typography></td>
                                        <td className="tdValue"><Typography variant="h6">{boilerHeatedCoolantCap} mB</Typography></td>
                                        <td className="tdPercentage"><Typography variant="h6">({getPercentage(boilerHeatedCoolant, boilerHeatedCoolantCap)}%)</Typography></td>                             
                                    </tr>
                                    <tr>
                                        <th><Typography variant="h6">・Water: </Typography></th>
                                        <td className="tdValue"><Typography variant="h6">{boilerWater} mB</Typography></td>
                                        <td className="tdSlash"><Typography variant="h6">/</Typography></td>
                                        <td className="tdValue"><Typography variant="h6">{boilerWaterCap} mB</Typography></td> 
                                        <td className="tdPercentage"><Typography variant="h6">({getPercentage(boilerWater, boilerWaterCap)}%)</Typography></td>                             
                                    </tr>
                                    <tr>
                                        <th><Typography variant="h6">・Coolant: </Typography></th>
                                        <td className="tdValue"><Typography variant="h6">{boilerCoolant} mB</Typography></td>
                                        <td className="tdSlash"><Typography variant="h6">/</Typography></td>
                                        <td className="tdValue"><Typography variant="h6">{boilerCoolantCap} mB</Typography></td>
                                        <td className="tdPercentage"><Typography variant="h6">({getPercentage(boilerCoolant, boilerCoolantCap)}%)</Typography></td>                             
                                    </tr>
                                    <tr>
                                        <th><Typography variant="h6">・Steam: </Typography></th>
                                        <td className="tdValue"><Typography variant="h6">{boilerSteam} mB</Typography></td>
                                        <td className="tdSlash"><Typography variant="h6">/</Typography></td>
                                        <td className="tdValue"><Typography variant="h6">{boilerSteamCap} mB</Typography></td>
                                        <td className="tdPercentage"><Typography variant="h6">({getPercentage(boilerSteam, boilerSteamCap)}%)</Typography></td>                             
                                    </tr>
                                </table>
                            </div>
                            <h2>Turbine1</h2>
                            <div style={{marginLeft: 10}}>
                                <table className={isMobile? "tableMobile" : ""}>
                                    <tr>
                                        <th><Typography variant="h6">・Steam: </Typography></th>
                                        <td className="tdValue"><Typography variant="h6">{turbine1Steam} mB</Typography></td>
                                        <td className="tdSlash"><Typography variant="h6">/</Typography></td>
                                        <td className="tdValue"><Typography variant="h6">{turbine1SteamCap} mB</Typography></td>
                                        <td className="tdPercentage"><Typography variant="h6">({getPercentage(turbine1Steam, turbine1SteamCap)}%)</Typography></td>                             
                                    </tr>
                                    <tr>
                                        <td><Typography variant="h6">・Production Rate: </Typography></td>
                                        <td className="tdValue"><Typography variant="h6">{turbine1ProductionRate} FE</Typography></td>                           
                                    </tr>
                                </table>
                            </div>
                            <h2>Turbine2</h2>
                            <div style={{marginLeft: 10}}>
                                <table className={isMobile? "tableMobile" : ""}>
                                    <tr>
                                        <th><Typography variant="h6">・Steam: </Typography></th>
                                        <td className="tdValue"><Typography variant="h6">{turbine2Steam} mB</Typography></td>
                                        <td className="tdSlash"><Typography variant="h6">/</Typography></td>
                                        <td className="tdValue"><Typography variant="h6">{turbine2SteamCap} mB</Typography></td>
                                        <td className="tdPercentage"><Typography variant="h6">({getPercentage(turbine2Steam, turbine2SteamCap)}%)</Typography></td>                             
                                    </tr>
                                    <tr>
                                        <td><Typography variant="h6">・Production Rate: </Typography></td>
                                        <td className="tdValue"><Typography variant="h6">{turbine2ProductionRate} FE</Typography></td>                           
                                    </tr>
                                </table>
                            </div>
                            <h2>Turbine3</h2>
                            <div style={{marginLeft: 10}}>
                                <table className={isMobile? "tableMobile" : ""}>
                                    <tr>
                                        <th><Typography variant="h6">・Steam: </Typography></th>
                                        <td className="tdValue"><Typography variant="h6">{turbine3Steam} mB</Typography></td>
                                        <td className="tdSlash"><Typography variant="h6">/</Typography></td>
                                        <td className="tdValue"><Typography variant="h6">{turbine3SteamCap} mB</Typography></td>
                                        <td className="tdPercentage"><Typography variant="h6">({getPercentage(turbine3Steam, turbine3SteamCap)}%)</Typography></td>                             
                                    </tr>
                                    <tr>
                                        <td><Typography variant="h6">・Production Rate: </Typography></td>
                                        <td className="tdValue"><Typography variant="h6">{turbine3ProductionRate} FE</Typography></td>                           
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </AppTab>
                </Grid>
                <Grid item container xs={isMobile ? 16 : 6} spacing={2}>
                    <AppTab isMobile={isMobile} hidden={hidden} delay={1} xs={16} title="Manual Control">
                        <div className={isMobile ? "" : "inline"} style={{width: "100%", height:"100%", overflowY:isMobile? "scroll" : undefined}}>
                            <div className="btn-group" style={{borderBottom: isMobile ? "1px dotted gray" : undefined}}>
                                <Button className="button" style={(fissionStatus ? disabledBtnStyle : activateBtnStyle)} disabled={fissionStatus} onClick={activate}>Activate</Button>
                                <Button className="button" style={(!fissionStatus ? disabledBtnStyle : scramBtnStyle)} disabled={!fissionStatus} onClick={scram}>Scramble</Button>
                            </div>
                            <div style={{width:"50%", borderLeft: isMobile ? undefined : "1px dotted gray", padding:20}}>
                                <h3>Burn Rate</h3>
                                <input type="number" min="0" max="1435" style={{width:150}} placeholder="New Burn Rate" value={newBurnRate} onChange={(e)=>{setNewBurnRate(parseInt(e.target.value))}}></input> mB/t
                                <br></br>
                                <br></br>
                                <Button variant="contained" onClick={changeBurnRate}>send</Button>
                            </div>
                        </div>
                    </AppTab>
                    <AppTab isMobile={isMobile} hidden={hidden} delay={2} xs={isMobile ? 16 : 6} title="Auto Control">
                        <div style={{width:"100%", height:"100%", display:"flex", flexDirection:"column", justifyContent:"center"}}>
                            <Button style={{width:"70%", height:100, margin:"auto", fontSize:28}} variant="contained" onClick={()=>{sendCmd("auto")}}>toggle</Button>
                        </div>
                    </AppTab>
                    <AppTab isMobile={isMobile} hidden={hidden} delay={3} xs={isMobile ? 16 : 6} title="Log" scroll>
                        {logs.map((log)=>{return (<p style={{margin:3}}>{log}</p>) })}
                    </AppTab>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Fission;