import { Dispatch, SetStateAction } from "react"

export type AppPage = {
    page: number,
    setPage: Dispatch<SetStateActioneAction<number>>,
    isMobile: boolean
}