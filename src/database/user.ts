import { Schema, model } from 'mongoose';

const user = new Schema({
	userID: Number
});

export default model('Users', user);