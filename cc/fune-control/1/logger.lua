function getShipDegree()
    local rotMatrix = ship.getRotationMatrix()
    
    local radian = math.acos(rotMatrix[1][1])
    local sign = 1
    if rotMatrix[3][1] >= 0 then
    sign = -1
    end
    local degree =  math.deg(math.pi / 2 - radian * sign)
    if degree > 180 then degree = degree - 360 end

    return degree
end

data.set_value("logs",{})

while true do
    local shipdata = {
        pos=ship.getWorldspacePosition();
        degree=getShipDegree();
        transformed=data.get_value("transformed");
        logs=data.get_value("logs")
    }
    rednet.send(22,textutils.serialiseJSON(shipdata),"master")
    os.sleep(0.05)
end
