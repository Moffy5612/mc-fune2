function get_value(key)
    local input = io.input("/data.json")
    local tab = textutils.unserialiseJSON(input:read("*a"))
    io.close(input)
    return tab[key]
end

function set_value(key, val)
    local input = io.input("/data.json")
    local tab = textutils.unserialiseJSON(input:read("*a"))
    io.close(input)
    tab[key] = val
    local output = io.output("/data.json")
    output:write(textutils.serialiseJSON(tab))
    io.close(output)
end

function add_log(val)
    print(val)
    local logs = get_value("logs")
    if(#logs == 20) then table.remove(logs,1) end
    table.insert(logs,val)
    set_value("logs",logs)
end

function get_all()
    local input = io.input("/data.json")
    local tab = textutils.unserialiseJSON(input:read("*a"))
    io.close(input)

    return tab
end

return {get_value=get_value, set_value=set_value, add_log=add_log, get_all=get_all}