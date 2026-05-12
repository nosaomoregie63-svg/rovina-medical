const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide a first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide a last name"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number"],
    },
    department: {
      type: String,
      required: [true, "Please select a department"],
    },
    doctor: {
      type: mongoose.Schema.ObjectId,
      ref: "Doctor",
    },
    preferredDate: {
      type: Date,
      required: [true, "Please provide an appointment date"],
    },
    appointmentDate: {
      type: Date,
    },
    appointmentTime: {
      type: String,
    },
    message: {
      type: String,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "approved",
        "cancelled",
        "completed",
        "reschedule_requested",
      ],
      default: "pending",
    },
    rescheduleReason: {
      type: String,
    },
    rescheduleRequestedDate: {
      type: Date,
    },
    rescheduleRequestedTime: {
      type: String,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    reminderSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Appointment", appointmentSchema);
