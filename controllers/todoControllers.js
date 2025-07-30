const todomodel = require("../models/todoModel")

const todoControl = async (req, res) => {

    try {
        const { title, description, createdby } = req.body

        if (!title || !description || !createdby) {
            return res.status(400).send({
                success: false,
                message: "Please provide title and description"
            })
        }

        const newtodo = new todomodel({ title, description, createdby })
        const saved = await newtodo.save()
        res.status(201).send({
            success: true,
            message: "Your task has been created",
            result: saved,
        })


    }
    catch (err) {
        res.status(500).send({
            success: false,
            message: "error in creating todo",
            err
        })
    }
}

const getTodocontrol = async (req, res) => {
    try {
        const { userId } = req.params

        if (!userId) {
            return res.status(404).send({
                success: false,
                message: "No user ID found with this id"

            })
        }

        const todos = await todomodel.find({ createdby: userId })
        if (todos.length === 0) {
            return res.status(400).send({
                success: false,
                message: " No Todo list"
            })
        }

        res.status(200).send({
            success: true,
            message: "Your Todos",
            todos
        })
    }
    catch (err) {
        return res.status(500).send({
            success: false,
            message: "Problem in get TODO api",
            err
        })
    }



}


const DeleteTodoControl = async(req, res) => {
    const {id} = req.params

    try{
        if(!id){
            return res.status(404).send({
                success:false,
                message: "Todo ID REQUIRED",
            })
        }

        const deltodo = await todomodel.findByIdAndDelete(id)

        if(!deltodo){
            return res.status(404).send({
                success:false,
                message: "No todo list is present"
            })
        }

        res.status(200).send({
            success:true,
            message:"The todo list have ben deleted",
        })
    }
    catch(err){
        res.status(500).send({
            success: false,
            message: "Error in deleting todo API",
            err
        })
    }
}


const updatedTodoControl = async(req, res) => {
    const {id} = req.params
    try{
        if(!id){
            return res.status(404).send({
                success: false,
                message:"provind The todo ID"
            })
        }

        const data = req.body;

        const updatedtodo = await todomodel.findByIdAndUpdate(id, {$set:data}, {returnOriginal:false})
        res.status(200).send({
            success:true,
            message:"Your Task has been Updated",
            updatedtodo
        })


    }
    catch(err){
        res.status(500).send({
            success:false,
            message:"problem in Update API",
            err
        })
    }
}

module.exports = { todoControl, getTodocontrol, DeleteTodoControl, updatedTodoControl }