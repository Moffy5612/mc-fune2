local infinity = "left"
local neutron = "back"
local crystal = "right"

local ti = 18
local tn = 1.5
local tc = 0.1

rednet.open("top")

while true do
 local _,msg = rednet.receive("ship-roof")
 
 if msg == "close" then
  print("close roof")
  redstone.setOutput(infinity, false)
  os.sleep(ti)
  redstone.setOutput(neutron, false)
  os.sleep(tc)
  redstone.setOutput(crystal, false)
  os.sleep(tn)
  rednet.send(1, "", "ship-roof")
 elseif msg == "open" then
  print("open roof")
  redstone.setOutput(crystal, true)
  os.sleep(tc)
  redstone.setOutput(neutron, true)
  os.sleep(tn)
  redstone.setOutput(infinity, true)
  os.sleep(ti)
  rednet.send(1, "", "ship-roof")
 end
end

