local turbine = peripheral.wrap("back")

rednet.open("top")
multishell.launch({},"/system.lua")

while true do
    local data = {
        turbine1Steam = turbine.getSteam()["amount"],
        turbine1SteamCap = turbine.getSteamCapacity(),
        turbine1ProductionRate = turbine.getProductionRate()
    }

    rednet.send(10, textutils.serialiseJSON(data), "boiler")
    os.sleep(0.05)
end

