import ws from "ws"
import webapp from "./webapp"

const CC_PORT = 56121
const PAGE_PORT = 56122

 
const cc_server=new ws.Server({port:CC_PORT})
const web_server=new ws.Server({port:PAGE_PORT})

let cc_socket:ws|undefined

cc_server.on('connection', (s)=>{
    cc_socket = s
    s.on('message', (data)=>{
        web_server.clients.forEach((client)=>{client.send(data.toString())})
    })
})

web_server.on("connection",(s)=>{
    s.on('message', (data)=>{
        console.log(data.toString())
        if(cc_socket)cc_socket.send(data.toString())
    })
})

webapp()