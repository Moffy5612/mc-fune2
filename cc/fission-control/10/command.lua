local args={...}
local fission = peripheral.wrap("back")
local data = require("data")

if args[1] == "auto" then
    local b = not data.get_value("autoControl")
    data.set_value("autoControl", b)
    if b then
        data.add_log("changed Auto-Control mode: ON")
    else
        data.add_log("changed Auto-Control mode: OFF")
    end
elseif args[1] == "activate" then
    fission.activate()
    data.add_log("fission reactor activated.")
elseif args[1] == "scram" then
    fission.scram()
    data.add_log("fission reactor was shut down manually.")
elseif args[1] == "rate" then
    fission.setBurnRate(tonumber(args[2]))
    data.add_log("burn rate changed: "..args[2])
else 
    exit(1)
end