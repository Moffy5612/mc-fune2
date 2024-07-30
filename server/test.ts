import ws from "ws"

const CC_PORT = 56121

const cc_server=new ws.Server({port:CC_PORT})

let cc_socket:ws

cc_server.on('connection', (s)=>{
    cc_socket = s
    s.send(JSON.stringify({name:"avaritia:crystal_matrix_ingot",count:5}))
})