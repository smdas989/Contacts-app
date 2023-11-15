const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")
//@access public
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    res.status(200).json(contact);
});
const getAllContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.find()
    res.status(200).json(contacts);
})

const createContact = asyncHandler(async (req, res) => {
    const {name, email, phone} = req.body
    const isNewUser = await Contact.isEmailInUse(email)
    if (!isNewUser)
        return res.json({
    success: false,
    message: 'email already in use'
    })
    console.log("here", name, email, phone);
    if (!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const contact = await Contact.create({
        name, email, phone
    });
    res.status(201).json({contact});
})

const updateContact = asyncHandler(async (req, res) => {
    const contact = Contact.findById(req.params.id)
    if (!contact){
        res.status(404);
        throw new Error("COntact not found")
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedContact);
})

const deleteContact = asyncHandler(async (req, res) => {
    const contact = Contact.findById(req.params.id)
    if (!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    // const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    await contact.deleteOne()

    // if (!deletedContact) {
    //     res.status(500);
    //     throw new Error("Failed to delete contact");
    // }

    res.status(200).json({ message: `Deleted contact is ${req.params.id}` });
})

module.exports = {
    getContact, 
    getAllContact, 
    createContact, 
    updateContact, 
    deleteContact
}