const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    },

    createdby: {
        ref: "user",
        type: mongoose.Schema.ObjectId
    }
},{timestamps:true})


const todomodel = mongoose.model("todolist", todoSchema)

module.exports = todomodel