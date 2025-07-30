//npm i express - to download express
const express = require("express")
//npm i dotenv - to download dotenv
const dotenv = require("dotenv")
//npm i colors
const colors = require("colors")
const MongoDB = require("./config/db")
const userRoutes = require("./routes/userRouter");
const cors = require('cors')

//dotenv.config(); is used in Node.js to load environment variables from a .env file into process.env.
dotenv.config()

MongoDB()


//rest object
const app = express()

//middleware 
app.use(express.json())  //Parses incoming requests with Content-Type: application/json


// CORS is a browser security feature that prevents requests to your backend from different origins (domain, port, or protocol).
// For example:
// Frontend: http://localhost:3000 (React app)
// Backend: http://localhost:5000 (Express API)
app.use(cors())





//route
// app.get('/test', (req, res)=>{
//     res.status(200).send("<h1>Welcome to TO DO APP</h1>")
// })
//instead we using router and controller
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use('/api/v1/test', require('./routes/testRouter'))
app.use('/api/v1/todo', require('./routes/todoRouter'))
app.use('/api/v1/user', userRoutes)




//port
// const PORT = 8080
const PORT = process.env.PORT || 8000

//Listen

app.listen(PORT, () => {
  console.log(`server is running for ${process.env.DEV} on ${PORT}`.bgMagenta)
})


app.use((req, res) => {
  res.status(404).json({ error: "Route Not Found" });
});


//npm i nodemon
//nodemon server.js