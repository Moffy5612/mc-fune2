local data = require("data")
local completion = require("cc.completion")

rednet.open("top")

local cmds = {"to", "base", "rotate", "open", "close"}

multishell.launch({data=data; socket=socket},"/logger.lua")
multishell.launch({data=data; socket=socket},"/transform.lua")
multishell.launch({},"/system.lua")

redstone.setOutput("left", true)
os.sleep(0.2)
redstone.setOutput("left", false)

while true do
    id, msg = rednet.receive("master")
    data.add_log("sent cmd > " .. msg)
    local b = shell.run("./cruise.lua " .. msg)
    if b then data.add_log("request successfully finished.")
    else data.add_log("ERROR: some error has occurred.") end
end
