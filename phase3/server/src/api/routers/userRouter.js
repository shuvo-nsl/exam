const router = require("express").Router();
const {signIn, signUp, passwordChange, createUser, getAlluser, findAllMember, getSingleUser} = require("../controllers/userController");
const { Authorize } = require("../middleware/authorize");
const { isNslIdAlreadyUsed } = require("../middleware/userMiddleware");
const { signInBodyValidation, passwordBodycheck, newUserValidation  } = require("./../middleware/validation/commonValidator");

router.route("/signup").post(signUp);
router.route("/signin").post(signInBodyValidation, signIn);
router.route("/alluser").get(Authorize, getAlluser)
router.route("/allmember").get(Authorize, findAllMember);
router.route("/createuser").post(Authorize, isNslIdAlreadyUsed, newUserValidation,createUser);
router.route("/changepassword").put(Authorize, passwordChange);
router.route("/user/:id").get(Authorize, getSingleUser);

module.exports = router;