const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
//bcrypt 🔧 How it works (simplified):
// You give it a password: "mypassword"
// It adds a random salt
// Hashes it:
// → Output looks like:
// $2b$10$eImiTXuWVxfM37uY4JANjQ==...
const JWT = require('jsonwebtoken')
///JWT is for securely storing login information (like user ID) on the client side — usually in the browser — so the user doesn’t have to log in again every time.




const registerController = async (req, res) => {
   try{
    const {username, email, password} = req.body;

    if(!username || !email || !password){
        return res.status(500).send({
            success: false,
            message: "Please provide all the fields"

        });
    }
    const existeduser = await userModel.findOne({email});
    if(existeduser){
        return res.status(500).send({
            success: false,
            message: "User already exist"
        })
    }

   
    //encrypting the hashing in new user
    //A salt is a random string added to the password before hashing to make it more secure.
    const salt = await bcrypt.genSalt(10)
    //hash- Take the password, combine it with salt, and return the encrypted hash.
    const hashedpassword = await bcrypt.hash(password, salt)
     const newUser = new userModel({username, email, password:hashedpassword,})


    await newUser.save()

    res.status(201).send({
        success: true,
        message: "user register successfully"
    })
   }
   catch(err){
    console.log(err);
    res.status(500).send({
        success:false,
        message: "Register API",
        err,
    })
    
   }
}


const logincontroller = async (req, res)=> {
    try{
        const {email, password} = req.body;

        const user = await userModel.findOne({email})
        if(!user){
            return res.status(401).send({
                success:false,
                message: "user doesn't exist"
            })
            
        }

        //DEcrypting the data as hashed password can t be compare with the data user give so this compare decrypt and compare the passwords
        const ismatch = await bcrypt.compare(password, user.password)
        if (!ismatch) {
        return res.status(401).send({
        success: false,
        message: "Incorrect password",
      });
    }

        //JWT is for securely storing login information (like user ID) on the client side — usually in the browser — so the user doesn’t have to log in again every time.
        const token = JWT.sign({id: user._id}, process.env.SECRET, {expiresIn: "1d",})
    

        res.status(200).send({
            success: true,
            message: "Login Succesfully",
            token,
            user: {
                id:user._id,
                username: user.username,
                email: user.email
            },
        })
       
    }
    catch(err){
        res.status(500).send({
            success:false,
            message: "Login API",
            err
        })
    }
}

module.exports = {registerController, logincontroller}