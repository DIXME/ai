import express from "express"
import config from "./config.json" with { type: 'json' };
import {init} from "./websocket.ts"
import ollama from "ollama"
import bodyParser from 'body-parser';
import { txt2img, Txt2ImgPayload } from "./image_api.ts";
import { AbortableAsyncIterator, GenerateResponse } from "ollama";

const app = express()
const __dirname = import.meta.dirname;
const public_dir: string = __dirname+"/public";
function public_file(x: string): string{
    // console.log(`${public_dir}/${x}`)
    return `${public_dir}/${x}`
}

app.use(express.static(__dirname+"/public"))
app.use(bodyParser.json())

const requests = []

app.get("/", (req, res, next) => {
    res.sendFile(public_file("main.html"))
})

app.post("/api/prompt", async (req, res, next) => {
    console.log(req.body)
    
    res.setHeader('Content-Type', 'text/plain; charset=utf-8'); 
    
    const r = await ollama.generate({
        model: config.ollama.model,
        prompt: req.body["prompt"] || "why is the sky blue?",
        stream: true,
        ...config.ollama.settings
    });

    for await (const part of r) {
        res.write(part.response)
    }

    res.end("")
})

app.post("/api/chat", async (req, res, next) => {
    console.log(req.body)

    res.setHeader('Content-Type', 'text/plain; charset=utf-8'); 
    res.flushHeaders();
    
    const r = await ollama.chat({
        model: config.ollama.model,
        messages: req.body["messages"] || [{role:"user",content:"why is the sky blue?"}],
        stream: true,
        ...config.ollama.settings
    });
    
    for await (const part of r) {
        res.write(part.message.content)
    }
    res.end("")
})

app.post("/api/image", async (req, res, next) => {
    console.log(req.body)

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();
    
    const r = await txt2img(req.body);

    r
})

app.listen(config.server.port)
init()