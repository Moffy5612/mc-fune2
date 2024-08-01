import express from "express"
import path from "path"

const WEB_PORT = 56120

const webapp=()=>{
    const web_app = express()

    web_app.use(express.static(path.resolve(__dirname,"../../dist")))

    web_app.get("/",(req, res)=>{
        console.log(path.resolve(__dirname, "../../dist/index.html"))
        res.sendFile(path.resolve(__dirname, "../../dist/index.html"))
    })

    const server = web_app.listen(WEB_PORT, ()=>{console.log("Server running on PORT: "+WEB_PORT)})

    process.on("SIGTERM", ()=>{
        server.close()
    })
}

export default webapp;