rednet.open("left")

while true do
    if peripheral.find("dynamicValve") ~= nil then
            rednet.broadcast("reboot", "system")
        break
    end
    os.sleep(0.05)
end

local ws = assert(http.websocket("ws://localhost:56121"))

multishell.launch({ws=ws},"/send.lua")
multishell.launch({ws=ws},"/receive.lua")

