const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const User = require("../models/userModal")
//@access public
const getUser = asyncHandler(async (req, res) => {
    const contact = await User.findById(req.params.id)
    if (!contact){
        res.status(404);
        throw new Error("User not found")
    }
    res.status(200).json(contact);
});
const getAllUser = asyncHandler(async (req, res) => {
    const contacts = await User.find()
    res.status(200).json(contacts);
})

const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})


const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body
    console.log("here", username, email, password);
    if (!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const userAvailable = await User.findOne({email})
    console.log(userAvailable, "userAvailable")
    if (userAvailable){
        res.status(400)
        throw new Error("User already exists")
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        username, email, password: hashedPassword
    });
    if (user){
        res.status(201).json({_id: user.id, email: user.email})
    }
    else{
        res.status(400);
        throw new Error("User Data was not valid")
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    if (!email || !password){
        res.status(400)
        throw new Error("All fields mandatory")
    }
    const user = await User.findOne({email})
    console.log(user, "user")
    // compare password and hashedpassword
    if (user &&(await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, 
        process.env.ACCESS_TOKEN, 
        { expiresIn: "1m"}
        );
        console.log(accessToken, "accessToken")
        res.status(200).json({accessToken})
    }
    else{
        res.status(401)
        throw new Error("Invalid username or password")
    }
})

const updateUser = asyncHandler(async (req, res) => {
    const contact = User.findById(req.params.id)
    if (!contact){
        res.status(404);
        throw new Error("COntact not found")
    }
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedUser);
})

const deleteUser = asyncHandler(async (req, res) => {
    const contact = User.findById(req.params.id)
    if (!contact){
        res.status(404);
        throw new Error("User not found")
    }
    // const deletedUser = await User.findByIdAndDelete(req.params.id);
    await contact.deleteOne()

    // if (!deletedUser) {
    //     res.status(500);
    //     throw new Error("Failed to delete contact");
    // }

    res.status(200).json({ message: `Deleted contact is ${req.params.id}` });
})

module.exports = {
    getUser, 
    getAllUser, 
    registerUser, 
    updateUser, 
    deleteUser,
    loginUser,
    currentUser
}