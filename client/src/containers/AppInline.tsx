import { useContext } from "react"
import { PageContext } from "../App"

const AppInline = ({children, style}:React.PropsWithChildren<{style?:React.CSSProperties}>) => {
    const context = useContext(PageContext)
    
    return (
        <div className={(context?.isMobile ? "" : " inline")} style={style}>{children}</div>
    )
}

export default AppInline