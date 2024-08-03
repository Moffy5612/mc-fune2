import AppTab from "./AppTab"

const AppLogTab = ({id, delay, logs, xs}: {id: number, delay: number, logs: string[], xs?: number}) => {
    return (
        <AppTab id={id} delay={delay} xs={xs} title="Log" scroll>
            {logs.map((log)=>{return (<p style={{margin:3}}>{log}</p>) })}
        </AppTab>
    )
}

export default AppLogTab