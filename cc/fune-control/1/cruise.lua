local args = {...}
local data = require("data")

local f = 150000000
local threshold = 10

function moveY(goal)
    data.add_log("start moving to y = "..goal)
    local pos = ship.getWorldspacePosition()
    while math.abs(pos.y - goal) > 0.01 do
        local fy
        if pos.y < goal then fy = f * 3
        else fy = -f * 3 end
        if math.abs(pos.y - goal) < 1 then fy = fy * math.abs(pos.y - goal) end
        ship.applyInvariantForce(0, fy, 0)
        os.sleep(0.05)
        pos = ship.getWorldspacePosition()

        if goal <= 50 and pos.y <= 50 and data.get_value("transformed") then data.set_value("transformed",false)
        elseif goal > 50 and pos.y > 50 and not data.get_value("transformed") then data.set_value("transformed",true) end
    end

    ship.teleport({["pos"]={["x"]=pos.x, ["y"]=goal, ["z"]=pos.z}})
    data.add_log("stop moving to y = "..goal)
end

function move(distanceX, distanceZ)
    local a1 = f / ship.getMass() / 1440
    local a2 = f / ship.getMass() / 977

    local dx = math.abs(distanceX)
    local dz = math.abs(distanceZ)

    local t1x = math.ceil(math.sqrt(2 * a2 / a1 / (a1 + a2) * dx))
    local t2x = math.ceil((a1 + a2) * t1x / a2)
    local t1z = math.ceil(math.sqrt(2 * a2 / a1 / (a1 + a2) * dz))
    local t2z = math.ceil((a1 + a2) * t1z / a2)

    local fx, fz
    local t1 = math.max(t1x, t1z)
    local t2 = math.max(t2x, t2z)
    for i = 1, t2, 1 do
        fx = 0
        fz = 0

        if (i - 1) < t1 then 
            fx = f
            fz = f
        elseif (i - 1) < t2 then 
            fx = -f
            fz = -f 
        end
        if distanceX < 0 then fx = fx * (-1) end
        if distanceZ < 0 then fz = fz * (-1) end

        if (math.abs(distanceX) <= math.abs(distanceZ)) then ship.applyInvariantForce(fx * math.abs(distanceX / distanceZ), 0, fz)
        else ship.applyInvariantForce(fx, 0, fz * math.abs(distanceZ / distanceX)) end

        os.sleep(0.05)
    end
end

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

function rotate(theta)
    data.add_log("rotate to "..(theta).." degree")
    local deg = getShipDegree()

    while math.abs(theta - deg) > 1 do
        deg = getShipDegree()
        local corr
        if deg < theta then corr = -1
        else corr = 1 end
        if math.abs(theta - deg) <= 1 then corr = corr * math.abs(theta - deg) end
        ship.applyInvariantTorque(0, 6000 * ship.getMass() * corr, 0)
        os.sleep(0.05)
    end
end

function moveTo(goalX, goalY ,goalZ)
    local pos
    

    data.add_log("roof opening")
    rednet.send(6, "open", "ship-roof")
    id, msg = rednet.receive("ship-roof")

    moveY(200)

    data.add_log("roof closing")
    rednet.send(6, "close", "ship-roof")

    pos = ship.getWorldspacePosition()

    local diffX = goalX - pos.x
    local diffZ = goalZ - pos.z

    local diff = math.sqrt(diffX * diffX + diffZ * diffZ)

    local theta = math.acos(diffX / diff) / math.pi * 180
    if math.asin(diffZ / diff) < 0 then theta = theta * (-1) end
    
    rotate(theta)
    os.sleep(1)

    id, msg = rednet.receive("ship-roof")
    
    while math.abs(goalX - pos.x) > 1 or math.abs(goalZ - pos.z) > 1 do 
        

        data.add_log("start moving to x="..goalX..", z="..goalZ)
        
        move(goalX - pos.x, goalZ - pos.z)
        pos = ship.getWorldspacePosition()
        data.add_log("stop moving to x="..goalX..", z="..goalZ)

        local diffX = goalX - pos.x
        local diffZ = goalZ - pos.z

        local diff = math.sqrt(diffX * diffX + diffZ * diffZ)

        local theta = math.acos(diffX / diff) / math.pi * 180
        if math.asin(diffZ / diff) < 0 then theta = theta * (-1) end
        
        rotate(theta)
        os.sleep(1)
    end

    ship.teleport({["pos"]={["x"]=goalX, ["y"]=pos.y, ["z"]=goalZ}})

    moveY(goalY)
    ship.teleport({["pos"]={["x"]=goalX, ["y"]=goalY, ["z"]=goalZ}})
end

function base(goalX, goalY, goalZ)
    local pos

    moveY(200)

    pos = ship.getWorldspacePosition()
    
    while math.abs(goalX - pos.x) > 1 or math.abs(goalZ - pos.z) > 1 do 
        local diffX = goalX - pos.x
        local diffZ = goalZ - pos.z

        local diff = math.sqrt(diffX * diffX + diffZ * diffZ)
        
        local theta = math.acos(diffX / diff) / math.pi * 180
        if math.asin(diffZ / diff) < 0 then theta = theta * (-1) end
        
        rotate(theta)
        os.sleep(1)

        data.add_log("start moving to x="..goalX..", z="..goalZ)
        move(goalX - pos.x, goalZ - pos.z)
        pos = ship.getWorldspacePosition()
        data.add_log("stop moving to x="..goalX..", z="..goalZ)
    end
    
    data.add_log("roof opening")
    rednet.send(6, "open", "ship-roof")

    rotate(0)
    os.sleep(1)

    ship.teleport({["pos"]={["x"]=goalX, ["y"]=pos.y, ["z"]=goalZ}})

    id, msg = rednet.receive("ship-roof")

    moveY(goalY)
    ship.teleport({["pos"]={["x"]=goalX, ["y"]=goalY, ["z"]=goalZ}})

    data.add_log("roof closing")
    rednet.send(6, "close", "ship-roof")
    id, msg = rednet.receive("ship-roof")
end

if args[1] == "to" then
    moveTo(tonumber(args[2]), tonumber(args[3]), tonumber(args[4])) 
elseif args[1] == "base" then
    base(-6, -34.5, 200)
elseif args[1] == "rotate" then
    rotate(tonumber(args[2]))
elseif args[1] == "open" then
    data.add_log("roof opening")
    rednet.send(6, "open", "ship-roof")
    id, msg = rednet.receive("ship-roof")
elseif args[1] == "close" then
    data.add_log("roof closing")
    rednet.send(6, "close", "ship-roof")
    id, msg = rednet.receive("ship-roof")
elseif args[1] == "transform" then
    data.set_value("transformed", not data.get_value("transformed"))
    os.sleep(5)
else 
    exit(1)
end
