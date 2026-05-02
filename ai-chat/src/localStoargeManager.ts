import { AICharacter, AICharacterConversation, AIConversation } from "./plugin";

// I had the idea of the storage class, but lowkey i pasted this from CHATGPT
// I hate frontend dev, it pmo's tbh

export class Storage {
    characters: AICharacter[] = [];
    conversations: AIConversation[] = [];

    constructor() {
        this.load();
    }

    private load() {
        const data = localStorage.getItem("app_storage");

        if (!data) return; // nothing saved yet → keep defaults

        try {
        const parsed = JSON.parse(data);
        Object.assign(this, parsed);
        } catch (e) {
            console.error("[Storage] Failed to parse local storage!");
            const r = window.prompt("Reset storage? (y/n)");

            if (r === "y") {
                this.save(); // overwrite bad data with defaults
            } else {
                throw new Error("Storage corrupted");
            }
        }
    }

    save() {
        localStorage.setItem("app_storage", JSON.stringify({
        characters: this.characters,
        conversations: this.conversations
        }));
    }
}
