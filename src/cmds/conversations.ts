import {
    type ConversationFlavor,
    conversations,
    createConversation,
} from "@grammyjs/conversations";

import * as weather from './Main/weather.js';
import * as ask from './Neuro/ask.js';
import * as gemini from './Neuro/gemini.js';

export default async function setupConversations(bot: any) {

    bot.use(conversations());
    bot.use(createConversation(weather.execute, "weather"));
    bot.use(createConversation(ask.execute, "ask"));
    bot.use(createConversation(gemini.execute, "gemini"));

}