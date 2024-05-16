const doctorModel = require("../models/doctorModels");
const appointmentModel = require("../models/appointmentModel");
const userModel = require("../models/userModels");

const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "Doctor Info",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const updateProfileController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      {
        userId: req.body.userId,
      },
      req.body
    );
    res.status(200).send({
      success: true,
      message: "Doctor Info Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getDoctorByIdController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    res.status(200).send({
      success: true,
      message: "Doctor Info",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const doctorAppointmentsController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({
      userId: req.body.userId,
    });
    if (!doctor) {
      return res.status(404).send({
        success: false,
        message: "Doctor not found",
      });
    }
    const appointments = await appointmentModel.find({ doctorId: doctor._id });
    res.status(200).send({
      success: true,
      message: "Doctor's appointments fetched successfully!",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in fetching doctor's appointments",
    });
  }
};
const updateStatusController = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    const appointment = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).send({
        success: false,
        message: "Appointment not found",
      });
    }

    const user = await userModel.findById(appointment.userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    user.notification.push({
      type: "status-updated",
      message: `Your appointment has been ${status}.`,
      onClickPath: "/doctor-appointments",
    });
    await user.save();

    res.status(200).send({
      success: true,
      message: "Appointment status has been updated!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Failed to update status!",
    });
  }
};

module.exports = {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  doctorAppointmentsController,
  updateStatusController,
};
