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
    googleAuth: {
        type: Boolean,
        default: false
    },
    photoUrl: {
        type: String,
        default: null
    },
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        default: null
    },
    contactId: {
        type: String,
        default: null
    },
    UpiAddress: {
        type: String,
        default: null
    },
    fundId: {
        type: String,
        default: null
    },
    confirmed: {
        type: Boolean,
        required: true,
        default: false,
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
        default: new Date().toLocaleDateString('pt-PT'),
    },
})

module.exports = mongoose.models.users || mongoose.model('users', usersSchema);