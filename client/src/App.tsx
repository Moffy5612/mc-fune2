import Fune from "./pages/Fune";
import Menu from "./pages/Menu"
import "./css/App.css"
import { createContext, useEffect, useState } from "react";
import { AppPage } from "./types/AppPage";
import { AppEffect } from "./types/AppEffect";
import Fission from "./pages/Fission";
import Inventory from "./pages/Inventory";

const PageContext = createContext<AppPage | undefined>(undefined);

const AppEffects: AppEffect[] = []
const addAppEffect = (effect:AppEffect) => {
  for(let e of AppEffects){
    if(e.id === effect.id) return
  }
  AppEffects.push(effect)
}

const App = () => {

  const [isMobile, setIsMobile] = useState(false)
  const [isDark, setIsDark] = useState(true);
  const [page, setPage] = useState(0)
  const [connection,setConnection]=useState(false)

  useEffect(()=>{
    let s =new WebSocket("ws://"+location.hostname+":56122")
    s.onopen=()=>{
        setConnection(true)
    }
    s.onclose=()=>{
        setConnection(false)
    }
    s.onmessage=(ev)=>{
      let data = JSON.parse(ev.data)  
      for(let effect of AppEffects){
          if(effect.id === data.id){
            effect.applyEffect(s, data.data)
          }
      }
    }
  },[])

  useEffect(()=>{
    setIsMobile(window.innerWidth < window.innerHeight)
    setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
  })

  useEffect(()=>{
    if(isDark) {
      document.documentElement.setAttribute("theme", "dark");
    } else {
      document.documentElement.setAttribute("theme", "light")
    }
  },[isDark])

  return (
    <>
      <PageContext.Provider value={{page, setPage, isMobile}}>
        <Menu id={0} connection={connection}></Menu>
        <Fune id={1}></Fune>
        <Fission id={2}></Fission>
        <Inventory id={3}></Inventory>
      </PageContext.Provider>
    </>
  )
}

export {PageContext, addAppEffect}
export default App
