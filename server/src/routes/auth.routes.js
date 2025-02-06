const { Router } = require("express");
const { registerUser, loginUser } = require("../controllers/auth.controller");

const router = Router();

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);

module.exports = router;
