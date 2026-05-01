import express from "express"
import config from "./config.json" with { type: 'json' };
import {init} from "./websocket.ts"
import ollama from "ollama"
import bodyParser from 'body-parser';

const app = express()
const __dirname = import.meta.dirname;
const public_dir: string = __dirname+"/public";
function public_file(x: string): string{
    // console.log(`${public_dir}/${x}`)
    return `${public_dir}/${x}`
}

app.use(express.static(__dirname+"/public"))
app.use(bodyParser.json())

app.get("/", (req, res, next) => {
    res.sendFile(public_file("main.html"))
})

app.post("/api/prompt", async (req, res, next) => {
    const controller = new AbortController()
    const signal = controller.signal


    console.log(req.body)
    const response = await ollama.generate({
        model: config.ollama.model,
        prompt: req.body["prompt"] || "why is the sky blue?",
        stream: true
    });
    
    res.setHeader('Content-Type', 'text/plain; charset=utf-8'); 
    res.write("");
    
    for await (const part of response) {
        if(signal.aborted){response.abort();break}
        res.write(part.response)
    }
    res.end("")
})

app.post("/api/chat", async (req, res, next) => {
    const controller = new AbortController()
    const signal = controller.signal

    console.log(req.body)
    const response = await ollama.chat({
        model: config.ollama.model,
        messages: req.body["messages"] || [{role:"user",content:"why is the sky blue?"}],
        stream: true
    });
    

    res.setHeader('Content-Type', 'text/plain; charset=utf-8'); 
    res.write("");
    
    for await (const part of response) {
        if(signal.aborted){break}
        res.write(part.message.content)
    }
    res.end("")
})

app.listen(config.server.port)
init()