const mongoose = require('mongoose')
const { default: _default } = require('validator')

const Schema = mongoose.Schema

const transactionSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type:{
        type: String,
        required: true,
        enum: ["income", "expense"]
    },
    category:{
        type: String,
        required: true,
        enum: ["Food", "Rent", "Salary", "Transport", "Shoping", "Other"],
        default: "Other"
    },
    description: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, {timestamps: true})

module.exports = mongoose.model("Transaction", transactionSchema)