import { Dispatch, SetStateAction } from "react"

export type AppPage = {
    page: number,
    setPage: Dispatch<SetStateAction<number>>,
    isMobile: boolean
}