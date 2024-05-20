import mongoose from 'mongoose';
import User from './user.js';

export default async function setupDatabase(bot: any) {

mongoose.connect(process.env.MONGODB_URI);

bot.schemas = {};
bot.schemas.user = User;

}