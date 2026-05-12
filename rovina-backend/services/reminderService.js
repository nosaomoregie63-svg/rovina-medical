const cron = require("node-cron");
const Appointment = require("../models/Appointment");
const nodemailer = require("nodemailer");
// const { sendAppointmentReminder } = require('./smsService');
const emailTemplates = require("./emailTemplates");

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send reminder 24 hours before appointment
const send24HourReminders = async () => {
  try {
    console.log("🔔 Checking for appointments in the next 24 hours...");

    // Get appointments for tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const dayAfterTomorrow = new Date(tomorrow);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

    const appointments = await Appointment.find({
      appointmentDate: {
        $gte: tomorrow,
        $lt: dayAfterTomorrow,
      },
      status: "approved",
      reminderSent: { $ne: true },
    });

    console.log(
      `📋 Found ${appointments.length} appointments needing reminders`,
    );

    for (const appointment of appointments) {
      const appointmentData = {
        appointmentId: `APT-${appointment._id.toString().slice(-8).toUpperCase()}`,
        firstName: appointment.firstName,
        lastName: appointment.lastName,
        email: appointment.email,
        phone: appointment.phone,
        department: appointment.department,
        date: new Date(appointment.appointmentDate).toLocaleDateString(
          "en-US",
          {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          },
        ),
        time: appointment.appointmentTime,
      };

      // Send email reminder
      try {
        const transporter = createTransporter();
        await transporter.sendMail({
          from: `"Rovina Medical" <${process.env.EMAIL_FROM}>`,
          to: appointment.email,
          subject: "⏰ Appointment Reminder - Tomorrow",
          html: emailTemplates.appointmentReminder(appointmentData),
        });
        console.log(`✅ Email reminder sent to ${appointment.email}`);
      } catch (emailError) {
        console.error(
          `❌ Failed to send email to ${appointment.email}:`,
          emailError.message,
        );
      }

      // Send SMS reminder
      try {
        await sendAppointmentReminder(appointment.phone, appointmentData);
        console.log(`✅ SMS reminder sent to ${appointment.phone}`);
      } catch (smsError) {
        console.error(
          `❌ Failed to send SMS to ${appointment.phone}:`,
          smsError.message,
        );
      }

      // Mark reminder as sent
      appointment.reminderSent = true;
      await appointment.save();
    }

    console.log("✅ Reminder check completed");
  } catch (error) {
    console.error("❌ Error in reminder service:", error);
  }
};

// Schedule reminder job to run every day at 9 AM
const startReminderService = () => {
  // Run every day at 9:00 AM
  cron.schedule("0 9 * * *", () => {
    console.log("🕐 Running scheduled reminder service...");
    send24HourReminders();
  });

  console.log("✅ Reminder service started - will run daily at 9:00 AM");
};

module.exports = { startReminderService, send24HourReminders };
