local data = require("data")

rednet.open("top")

multishell.launch({data = data}, "/logger.lua")
multishell.launch({data = data}, "/boiler.lua")
multishell.launch({data = data}, "/control.lua")
multishell.launch({},"/system.lua")

while true do
    id, msg = rednet.receive("master")
    data.add_log("sent cmd > " .. msg)
    local b = shell.run("./command.lua " .. msg)
    if b then data.add_log("request successfully finished.")
    else data.add_log("ERROR: some error has occurred.") end
end