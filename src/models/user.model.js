import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const collection = 'users';
const schema = new mongoose.Schema({
    name: { type: String, required: true },
    photo: { type: String, default: "https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg" },
    mail: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    age: { type: String },
    role: { type: Number, default: 0}
});

const Users = mongoose.model(collection, schema);

export default Users;