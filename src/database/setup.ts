import mongoose from 'mongoose';
import User from './user.js';

export default async function setupDatabase(bot: any) {

await mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => console.log('База данных подключена'));

bot.schemas = {};
bot.schemas.user = User;

}