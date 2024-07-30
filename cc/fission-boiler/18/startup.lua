local boiler = peripheral.wrap("back")

rednet.open("top")
multishell.launch({},"/system.lua")

while true do
    local data = {
        boilerCoolant = boiler.getCooledCoolant()["amount"],
        boilerCoolantCap =  boiler.getCooledCoolantCapacity(),
        boilerHeatedCoolant = boiler.getHeatedCoolant()["amount"],
        boilerHeatedCoolantCap = boiler.getHeatedCoolantCapacity(),
        boilerSteam = boiler.getSteam()["amount"],
        boilerSteamCap = boiler.getSteamCapacity(),
        boilerWater = boiler.getWater()["amount"],
        boilerWaterCap = boiler.getWaterCapacity()
    }
    
    rednet.send(10, textutils.serialiseJSON(data), "boiler")
    os.sleep(0.05)
end