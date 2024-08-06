local fission = peripheral.wrap("back")

data.set_value("logs",{})

while true do
    local d = {
        fissionCoolant=fission.getCoolant(),
        fissionCoolantCap=fission.getCoolantCapacity(),

        fissionFuel=fission.getFuel()["amount"],
        fissionFuelCap=fission.getFuelCapacity(),

        fissionHeatedCoolant=fission.getHeatedCoolant(),
        fissionHeatedCoolantCap=fission.getHeatedCoolantCapacity(),

        fissionWaste=fission.getWaste()["amount"],
        fissionWasteCap=fission.getWasteCapacity(),

        fissionBurnRate=fission.getBurnRate(),
        fissionStatus=fission.getStatus(),
        fissionTemperature=fission.getTemperature(),
        fissionDamage=fission.getDamagePercent()
    }

    for k, v in pairs(d) do
        data.set_value(k, v)
    end

    local tab = data.get_all()
    rednet.send(22, textutils.serialiseJSON(tab), "master")

    os.sleep(0.05)
end
