const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  doctorAppointmentsController,
  updateStatusController,
} = require("../controllers/doctorCtrl");

//  Method
router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);

router.post("/updateProfile", authMiddleware, updateProfileController);

router.post("/getDoctorById", authMiddleware, getDoctorByIdController);

router.get(
  "/doctor-appointments",
  authMiddleware,
  doctorAppointmentsController
);

router.put("/update-status", authMiddleware, updateStatusController);
module.exports = router;
