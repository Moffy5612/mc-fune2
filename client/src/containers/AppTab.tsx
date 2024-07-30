import { Accordion, AccordionDetails, AccordionSummary, Fade, Grid, Typography } from "@mui/material"
import "../css/AppTab.css"
import React from "react"
import { AppTabProps } from "../types/AppTab"
import { ExpandMore } from "@mui/icons-material"

const AppTab = ({isMobile, hidden, title, xs = 1, delay, scroll = false, children}:React.PropsWithChildren<AppTabProps>) => {
    return(
        <Grid 
            item
            xs={xs}
        >
            {
                isMobile && 
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
                !isMobile && 
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