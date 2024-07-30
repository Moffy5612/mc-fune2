rednet.open("top")

function pulse(side)
    redstone.setOutput(side, true)
    sleep(0.1)
    redstone.setOutput(side, false)
end

function expand()
    pulse("right")
    sleep(5)
end

function store()
    pulse("right")
    sleep(5)
end

while true do
    id, expanding = rednet.receive("ship-transform")
    print(expanding)
    if expanding == "true" then expand()
    elseif expanding == "false" then store() end
    rednet.send(1, "", "ship-transform")
    sleep(0.05)
end
