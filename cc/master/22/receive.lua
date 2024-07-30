while true do
    msg = ws.receive()

    local data = textutils.unserialiseJSON(msg)
    print(textutils.serialise(data))
    if data["id"] then
        rednet.send(data["id"], data["data"], "master")
    end
end