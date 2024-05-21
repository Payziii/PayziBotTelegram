import mongoose from 'mongoose';
import User from './user.js';

// Подключение к базе данных и запись схемы в bot
export function setupDatabase(bot: any) {

    mongoose.connect(process.env.MONGODB_URI);
    mongoose.connection.on('connected', () => console.log('База данных подключена'));

    bot.schemas = {};
    bot.schemas.user = User;
}

// Создание нового юзера
export async function createUser(userID: number) {

    let user = new User({ userID });
    await user.save().then(() => console.log('Создан новый пользователь'));

    return user;
}

// Получение юзера
export async function getUser(userID: number) {

    let user = await User.findOne({ userID });
    if (!user) user = await createUser(userID);

    return user;
}