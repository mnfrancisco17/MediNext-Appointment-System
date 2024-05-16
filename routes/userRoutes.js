const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDoctorsController,
  bookAppointmentController,
  bookingAvailabilityController,
  userAppointmentsController,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

// Router Object
const router = express.Router();

// Routes
//Login || Post
router.post("/login", loginController);

// Register || Post
router.post("/register", registerController);

// Authentication || Post
router.post("/getUserData", authMiddleware, authController);

// Register Doctor|| Post
router.post("/apply-doctor", authMiddleware, applyDoctorController);

// Notification Doctor|| Post
router.post(
  "/get-all-notification",
  authMiddleware,
  getAllNotificationController
);

// Notification Doctor|| Post
router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);

router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

router.post("/book-appointment", authMiddleware, bookAppointmentController);

router.post(
  "/booking-availability",
  authMiddleware,
  bookingAvailabilityController
);

router.get("/user-appointments", authMiddleware, userAppointmentsController);

// Export Router
module.exports = router;
