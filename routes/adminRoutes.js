const express = require("express");
const {
  getAllUsersController,
  getAllDoctorsController,
  changeAccountStatusController,
} = require("../controllers/adminCtrl");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// GET Method || Users
router.get("/getAllUsers", authMiddleware, getAllUsersController);
// GET Method || Doctors
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

// POST Account Status
router.post(
  "/changeAccountStatus",
  authMiddleware,
  changeAccountStatusController
);

module.exports = router;
