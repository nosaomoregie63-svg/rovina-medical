const express = require("express");
const router = express.Router();
const {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getMyAppointments,
  rescheduleRequest,
  cancelAppointment,
  updateAppointmentStatus,
  trackAppointmentsByEmail,
} = require("../controllers/appointmentController");

// Import middleware (you may need to create these)
const { protect, authorize } = require("../middleware/auth");

router.route("/").get(getAppointments).post(createAppointment);

// Track appointments by email (must be before /:id route)
router.get("/track/:email", trackAppointmentsByEmail);

router
  .route("/:id")
  .get(getAppointment)
  .put(updateAppointment)
  .delete(deleteAppointment);

// Update appointment status (Admin only)
router.put(
  "/:id/status",
  protect,
  authorize("admin", "staff"),
  updateAppointmentStatus,
);

// Additional routes
router.get("/myappointments", protect, getMyAppointments);
router.put("/:id/reschedule", protect, rescheduleRequest);
router.put("/:id/cancel", protect, cancelAppointment);

module.exports = router;
