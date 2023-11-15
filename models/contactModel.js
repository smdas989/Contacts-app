const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add the contact name"],
    },
    email: {
        type: String,
        required: [true, "Please add the email"],
    },
    phone: {
        type: String,
        required: [true, "Please add the phone no"],
        },
    },
    {
      timestamps: true,
    }
  );
  
// Validation for email already exists
contactSchema.statics.isEmailInUse = async function(email) {
  if (!email) throw new Error("Invalid email")
  try{
    const user = await this.findOne(({email}))
    if (user) return false
    return true

  } catch (error){
    console.log(error.message)
    return false
  }
}
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
