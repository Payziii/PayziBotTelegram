const key = process.env.RSN_CHAT_KEY;

import { RsnChat } from "rsnchat";
const rsnchat = new RsnChat(key);

export default async function ask(model: string, q: string) {
    let answer: any;

    // gpt3
    if(model.toLowerCase() === "gpt") {
        await rsnchat.gpt(q).then((response) => {
            answer = response.message;
          });
    }
    // gpt 4
    else if(model.toLowerCase() === "gpt4") {
        await rsnchat.gpt4(q).then((response) => {
            answer = response.message;
          });
    }
    // gemini
    else if(model.toLowerCase() === "gemini") {
        await rsnchat.gemini(q).then((response) => {
            answer = response.message;
          });
    }

    return answer;
}