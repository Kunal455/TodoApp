//first initialise the function to send to router
const testingController = (req, res) => {
    res.status(200).send("<h1>Welcome to the to do app</h1>")
}


//remeber you are export in brackets so there in routes get const {}
module.exports = {testingController}