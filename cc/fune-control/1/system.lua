while true do
    id, msg = rednet.receive("system")
    if msg == "reboot" then
        os.reboot()
    end
end