export default class MessageT {
    timestamp: string | Date
    username: string
    content: string
    pfp: string

    constructor(timestamp: string | Date, username: string, content: string, pfp: string){
        this.timestamp = timestamp;
        this.username=username;
        this.content=content;
        this.pfp=pfp;
    }
}