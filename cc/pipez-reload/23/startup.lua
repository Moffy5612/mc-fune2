rednet.open("right")

while true do
    id, msg = rednet.receive("system")
    if msg == "reboot" then
        os.sleep(0.1)
        turtle.place()
        turtle.dig()
    end
end

