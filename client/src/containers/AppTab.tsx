import { Accordion, AccordionDetails, AccordionSummary, Fade, Grid, Typography } from "@mui/material"
import "../css/AppTab.css"
import React, { useContext, useEffect, useState } from "react"
import { AppTabProps } from "../types/AppTab"
import { ExpandMore } from "@mui/icons-material"
import { PageContext } from "../App"

const AppTab = ({id, title, xs = 16, delay, scroll = false, children}:React.PropsWithChildren<AppTabProps>) => {
    const context = useContext(PageContext)
    
    const [hidden, setHidden] = useState(id != context?.page)

    useEffect(() => {
        setHidden(id != context?.page)
    }, [context?.page])

    return(
        <Grid 
            item
            xs={context?.isMobile ? 16 : xs} 
        >
            {
                context?.isMobile && 
                <Fade in={!hidden} style={{
                    transitionDelay: (1 + delay * 0.3)+"s"
                }}>
                    <Accordion 
                        className={"container-mobile"+(hidden ? "":" column-shown")}
                        style={{
                            color: "initial",
                            backgroundColor: "var(--bg-tab)",
                        }}
                    >
                        <AccordionSummary expandIcon={<ExpandMore/>}>
                            <Typography variant="h4" style={{textAlign:"center"}}>{title ? title : ""}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <div className="tab-mobile" style={{overflowY:(scroll? "scroll":"inherit")}}>
                            {children}
                        </div>
                        </AccordionDetails>
                    </Accordion>
                </Fade>
            }
            {
                !context?.isMobile && 
                <div 
                    className={"container"+(hidden ? "":" column-shown")}
                    style={{
                        transitionDelay: (1 + delay * 0.3)+"s"
                    }} 
                >
                    <Typography variant="h4" style={{textAlign:"center"}}>{title ? title : ""}</Typography>
                    <div className="tab" style={{overflowY:(scroll? "scroll":"inherit"), height:(scroll? 300 : undefined)}}>
                        {children}
                    </div>
                </div>
            }
            
        </Grid>
    )
}

export default AppTab