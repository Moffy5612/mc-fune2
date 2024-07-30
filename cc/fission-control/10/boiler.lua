while true do
    id, msg = rednet.receive("boiler")
    local dataJson = textutils.unserialiseJSON(msg)
    for k, v in pairs(dataJson) do
        data.set_value(k, v)
    end
    os.sleep(0.01)
end