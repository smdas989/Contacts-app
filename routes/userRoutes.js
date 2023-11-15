const express = require("express")
const { getUser, getAllUser, registerUser, updateUser, deleteUser, loginUser, currentUser } = require("../controllers/userControllers");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router()
//Validate all routes
router.use(validateToken)
router.route("/").get(getAllUser)
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/current").get(currentUser);

router.route("/:id")
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);


module.exports = router;