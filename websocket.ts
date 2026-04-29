import ws, { WebSocketServer } from "ws"
import config from "./config.json" with { type: 'json' };
import { error } from "node:console"

export function init(): WebSocketServer {
    const server: WebSocketServer = new WebSocketServer(config.ws)

    server.on("connection", (socket, req) => {
        const tag: string = `${req.socket.remoteAddress?.replace("::1","localhost")}:${req.socket.remotePort}`
        console.log(`[WS] [connect] ${tag}`)

        socket.onclose = (e) => {
            console.log(`[WS] [close] ${tag}`)
        }

        socket.onmessage = (m) => {
            try {
                const data = JSON.parse(m.data as string)
                console.log(`[WS] [message] from: ${tag}; content: ${m.data}`)
            } catch(e) {
                throw new Error(`[WS] [message] [NOTJSON!] from: ${tag}; content: ${m.data}`)
            }
        }
    })
    return server
}