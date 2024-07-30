while true do 
    id, msg = rednet.receive("master")
    ws.send(msg)
end