const express = require("express")
const router = express.Router()
const {registerController, logincontroller} = require('../controllers/userController')


router.get("/test", (req, res) => {
  res.send("✅ userRouter working");
});

router.post("/login", logincontroller);


router.post('/register', registerController)


module.exports = router