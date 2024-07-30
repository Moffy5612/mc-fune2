local prev = data.get_value("transformed")

while true do
    local t = data.get_value("transformed")

    if t and not prev then
        rednet.send(12, "true", "ship-transform")
        rednet.receive("ship-transform")
    elseif prev and not t then
        rednet.send(12, "false", "ship-transform")
        rednet.receive("ship-transform")
    end

    redstone.setOutput("back",not data.get_value("transformed"))
    prev = t
    sleep(0.05)
end