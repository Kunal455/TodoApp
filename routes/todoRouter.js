const express = require("express")
const router = express.Router()
const { todoControl, getTodocontrol, DeleteTodoControl, updatedTodoControl } = require("../controllers/todoControllers")
const AuthMiddleware = require("../Middleware/AuthMiddleware")



router.post('/create', AuthMiddleware, todoControl)
router.post('/getAll/:userId', AuthMiddleware, getTodocontrol)
router.delete('/Delete/:id', AuthMiddleware, DeleteTodoControl)
router.patch('/Update/:id', AuthMiddleware, updatedTodoControl)
module.exports = router
