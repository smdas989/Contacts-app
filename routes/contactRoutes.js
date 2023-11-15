const express = require("express")
const { getContact, getAllContact, createContact, updateContact, deleteContact } = require("../controllers/contactControllers")

const router = express.Router()

router.route("/")
  .get(getAllContact)
  .post(createContact);

router.route("/:id")
  .get(getContact)
  .put(updateContact)
  .delete(deleteContact);


module.exports = router;