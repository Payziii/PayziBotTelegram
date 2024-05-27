import {
    type ConversationFlavor,
    conversations,
    createConversation,
} from "@grammyjs/conversations";

import * as weather from './Main/weather.js';
import * as ask from './Neuro/ask.js';
import * as gpt4 from './Neuro/gpt4.js';

export default async function setupConversations(bot: any) {

    bot.use(conversations());
    bot.use(createConversation(weather.execute, "weather"));
    bot.use(createConversation(ask.execute, "ask"));
    bot.use(createConversation(gpt4.execute, "gpt4"));

}