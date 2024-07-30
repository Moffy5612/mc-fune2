import { Marker, TileLayer, useMapEvents } from "react-leaflet"
import L from "leaflet"
import { JimpObject } from "../types/jimp"

import "jimp/browser/lib/jimp.js";
import { useEffect, useState } from "react";

declare const Jimp: JimpObject

const FuneMap = ({funeX, funeZ, degree, transformed, socket}:{funeX:number, funeZ:number, degree:number, transformed:boolean, socket:WebSocket | undefined}) => {

    const map = useMapEvents({
        click(event){
            const x = event.latlng.lat
            const y = event.latlng.lng
            const marker = L.marker(event.latlng).addTo(map)
            const popup = L.popup({
                content:`selected point<br>x : ${y * 2} z : ${-x * 2} <br> <button type="submit" id="mapAutoCruiseBtn" data-x=${y * 2} data-z=${-x * 2}>Auto-Cruise to here</button>`
            })
            map.addOneTimeEventListener("popupclose", ()=>{
                marker.removeFrom(map)
            })
            marker.bindPopup(popup).openPopup()
        }
    })

    useEffect(()=>{
        let mapAutoCruiseBtn = document.getElementById("mapAutoCruiseBtn")
        if(mapAutoCruiseBtn){
            mapAutoCruiseBtn.onclick = (event:MouseEvent) =>{
                const target = event.target as HTMLButtonElement
                const dataX = target.dataset.x
                const dataZ = target.dataset.z

                if(dataX && dataZ){
                    if(socket)socket.send(`to ${dataX} 150 ${dataZ}`)
                }
            }
        }
    })

    const[iconUrl, setIconUrl]=useState("./assets/fune_ico.png")

    useEffect(()=>{
        map.setView([-funeZ / 2, funeX / 2])
    },[funeX, funeZ])
    
    useEffect(()=>{
        (async()=>{
            let image = await Jimp.read(transformed ? "./assets/transformed_fune_ico.png" : "./assets/fune_ico.png")
            image = image.rotate(-degree - 90, false)
            setIconUrl(await image.getBase64Async(Jimp.MIME_PNG))
        })()
    },[transformed, degree])

    return(
        <>
            <TileLayer
                url={"http://"+location.hostname+":8080"+"/tiles/tile.png?x={x}&z={y}&zoom=0"}
            />
                
            <Marker
                position={[-funeZ / 2, funeX / 2]}
                icon={L.icon({iconUrl:iconUrl, iconSize:[64,64]})}
            />
        </>
    )
}

export default FuneMap;