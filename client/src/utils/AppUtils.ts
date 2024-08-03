import { Dispatch, SetStateAction } from "react";

const setLogs = (logs: any, setLogsFn: Dispatch<SetStateAction<string[]>>) => {
    if(Object.keys(logs).length === 0)setLogsFn([])
    else setLogsFn(logs)
}

const AppUtils = {
    setLogs
}

export default AppUtils