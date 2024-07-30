export type AppEffect={
    id: number,
    applyEffect: (ws:WebSocket, data:any)=>void 
}