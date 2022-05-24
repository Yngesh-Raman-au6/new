import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
    },
    refreshId: {
        type: String,
        default: null
    },
    coins: {
        required: true,
        type: Number,
        default: 0
    },
    created: {
        type: String,
        required: true,
        default: new Date(),
    },
})

module.exports = mongoose.models.users || mongoose.model('users', usersSchema);