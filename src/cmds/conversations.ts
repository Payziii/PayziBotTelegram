import {
    type ConversationFlavor,
    conversations,
    createConversation,
} from "@grammyjs/conversations";

import * as weather from './Main/weather.js';

export default async function setupConversations(bot: any) {

    bot.use(conversations());
    bot.use(createConversation(weather.execute, "weather"));

}