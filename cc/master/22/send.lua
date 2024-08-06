while true do 
    id, msg = rednet.receive("master")
    local send = {
        id=id
        data=textutils.unserialiseJSON(msg)
    }
    ws.send(textutils.serialiseJSON(send))
end