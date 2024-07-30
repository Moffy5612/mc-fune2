local fission = peripheral.wrap("back")
local env = peripheral.wrap("left")

while true do
    local status = data.get_value("fissionStatus")
    if data.get_value("autoControl") then 
        local damage = fission.getDamagePercent()
        local waste = fission.getWasteFilledPercentage()
        local coolant = fission.getCoolantFilledPercentage()
        local time = env.getTime() % 24000
        local sunny = env.isSunny()

        local boilerWater = data.get_value("boilerWater") / data.get_value("boilerWaterCap") * 100
        local turbine1Steam = data.get_value("turbine1Steam") / data.get_value("turbine1SteamCap") * 100
        local turbine2Steam = data.get_value("turbine2Steam") / data.get_value("turbine2SteamCap") * 100
        local turbine3Steam = data.get_value("turbine3Steam") / data.get_value("turbine3SteamCap") * 100
        

        if damage >= 1 or waste >= 20 or time >= 12000 or not sunny or coolant <= 0.4 or boilerWater <= 80 or turbine1Steam >= 95 or turbine2Steam >= 95 or turbine3Steam >= 95 then 
            if damage >= 1 then
                if redstone.getOutput("back") then data.add_log("ALERT: fission reactor was shut down due to damage.") end
            end
            if waste >= 20 then
                if redstone.getOutput("back") then data.add_log("ALERT: fission reactor was shut down due to large amount of waste.") end
            end
            if time >= 12000 or not sunny then
                if redstone.getOutput("back") then data.add_log("ALERT: fission reactor was shut down due to sunlight.") end
            end
            if coolant <= 50 then
                if redstone.getOutput("back") then data.add_log("ALERT: fission reactor was shut down due to less coolant.") end
            end
            if boilerWater <= 80 then
                if redstone.getOutput("back") then data.add_log("ALERT: fission reactor was shut down due to less water in boiler.") end
            end
            if turbine1Steam >= 95 then
                if redstone.getOutput("back") then data.add_log("ALERT: fission reactor was shut down due to large amount of steam in turbine 1.") end
            end
            if turbine2Steam >= 95 then
                if redstone.getInput("back") then data.add_log("ALERT: fission reactor was shut down due to large amount of steam in turbine 2.") end
            end
            if turbine3Steam >= 95 then
                if redstone.getInput("back") then data.add_log("ALERT: fission reactor was shut down due to large amount of steam in turbine 3.") end
            end

            redstone.setOutput("back", false) 

        elseif damage <= 0 and waste <= 0 and time < 12000 and sunny and coolant > 0.4 and boilerWater >= 99 and turbine1Steam < 95 and turbine2Steam < 95 and turbine3Steam < 95 then 
            if not redstone.getInput("back") then data.add_log("fission reactor activated.") end
            redstone.setOutput("back", true) 
        end
    end
    os.sleep(0.05)
end
