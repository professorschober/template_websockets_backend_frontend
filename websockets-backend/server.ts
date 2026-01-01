import http from "http";
import app from "./app.js";
import { WebSocketServer, WebSocket } from "ws";
// import {ChatTextMessage} from "./types/clientmessages";
// import {WelcomeMessage} from "./types/servermessages";

interface ClientWebSocket extends WebSocket {
    clientId: string;
    isMuted: boolean;
    isAlive?: boolean;
}

const port: number = process.env.PORT ? Number(process.env.PORT) : 3001;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`HTTP- und WebSocket-Server läuft auf Port ${port}`);
});

const wss = new WebSocketServer({ server });

let nextId = 1;
const clientsById = new Map<string, ClientWebSocket>()
const names = new Map<string, string>();

wss.on("close", () => {
        console.log("connection closed");
})

wss.on("error", (err) => {
    console.log("error");
    console.log(err.message);
})

wss.on("connection", (socket: ClientWebSocket) => {
    socket.clientId = `c${nextId++}`;
    console.log("connection established to", socket.clientId);

    socket.on("close", (code: number, reason ) => {
        console.log("socket close");
    })

    socket.on("message", (data: WebSocket.RawData) => {
        const text = String(data);
        console.log("message received", data);
    });
});