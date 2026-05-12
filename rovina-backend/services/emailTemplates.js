const emailTemplates = {
  appointmentReminder: (appointmentData) => {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">⏰ Appointment Reminder</h1>
          <p style="color: #e8e8e8; margin: 10px 0 0 0; font-size: 16px;">Rovina Medical Diagnostic Services</p>
        </div>

        <div style="background: white; padding: 40px 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="width: 80px; height: 80px; background: #667eea; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <span style="font-size: 36px;">📅</span>
            </div>
          </div>

          <h2 style="color: #333; margin: 0 0 20px 0; text-align: center;">Hello ${appointmentData.firstName}!</h2>

          <p style="color: #666; line-height: 1.6; margin: 0 0 30px 0; text-align: center;">
            This is a friendly reminder about your upcoming appointment at Rovina Medical.
          </p>

          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #667eea;">
            <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">Appointment Details:</h3>

            <div style="margin-bottom: 15px;">
              <strong style="color: #333;">Appointment ID:</strong>
              <span style="color: #667eea; font-family: monospace;">${appointmentData.appointmentId}</span>
            </div>

            <div style="margin-bottom: 15px;">
              <strong style="color: #333;">Service:</strong>
              <span style="color: #666;">${appointmentData.department}</span>
            </div>

            <div style="margin-bottom: 15px;">
              <strong style="color: #333;">Date:</strong>
              <span style="color: #666;">${appointmentData.date}</span>
            </div>

            <div style="margin-bottom: 15px;">
              <strong style="color: #333;">Time:</strong>
              <span style="color: #666;">${appointmentData.time}</span>
            </div>

            <div style="margin-bottom: 0;">
              <strong style="color: #333;">Location:</strong>
              <span style="color: #666;">Roving House, 3 Mobil Road, Ile Epo Bus Stop, Satellite Town, Lagos</span>
            </div>
          </div>

          <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; border-radius: 8px; margin: 30px 0;">
            <h4 style="color: #856404; margin: 0 0 10px 0; font-size: 16px;">📋 What to Bring:</h4>
            <ul style="color: #856404; margin: 0; padding-left: 20px; line-height: 1.6;">
              <li>Valid government-issued ID</li>
              <li>Previous medical records (if available)</li>
              <li>List of current medications</li>
              <li>Insurance card (if applicable)</li>
            </ul>
          </div>

          <div style="text-align: center; margin: 40px 0;">
            <p style="color: #666; margin: 0 0 20px 0; line-height: 1.6;">
              Please arrive 15 minutes before your scheduled time. If you need to reschedule or have any questions, contact us immediately.
            </p>

            <div style="margin: 30px 0;">
              <a href="tel:07086986677" style="background: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 0 10px; display: inline-block;">📞 Call Us</a>
              <a href="https://wa.me/2347086986677" style="background: #25d366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 0 10px; display: inline-block;">💬 WhatsApp</a>
            </div>
          </div>

          <div style="border-top: 1px solid #e0e0e0; padding-top: 30px; margin-top: 40px; text-align: center;">
            <p style="color: #999; font-size: 14px; margin: 0;">
              Rovina Medical Diagnostic Services<br>
              Roving House, 3 Mobil Road, Ile Epo Bus Stop<br>
              Satellite Town, Lagos, Nigeria<br>
              Phone: 070 8698 6677 | 080 3359 0577
            </p>
          </div>
        </div>
      </div>
    `;
  },

  appointmentConfirmation: (appointmentData) => {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">📩 Appointment Request Received</h1>
        </div>

        <div style="background: white; padding: 40px 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="width: 80px; height: 80px; background: #28a745; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <span style="font-size: 36px;">✓</span>
            </div>
          </div>

          <h2 style="color: #333; margin: 0 0 20px 0; text-align: center;">Thank you, ${appointmentData.firstName}!</h2>

          <p style="color: #666; line-height: 1.6; margin: 0 0 30px 0; text-align: center;">
            Your appointment request has been received successfully and is now pending approval. Our team will review the details and send you a confirmation email once the booking is approved, usually within 24 hours.
          </p>

          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #28a745;">
            <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">Appointment Details:</h3>

            <div style="margin-bottom: 15px;">
              <strong style="color: #333;">Patient:</strong>
              <span style="color: #666;">${appointmentData.firstName} ${appointmentData.lastName || ""}</span>
            </div>

            <div style="margin-bottom: 15px;">
              <strong style="color: #333;">Email:</strong>
              <span style="color: #666;">${appointmentData.email || "Not provided"}</span>
            </div>

            <div style="margin-bottom: 15px;">
              <strong style="color: #333;">Appointment ID:</strong>
              <span style="color: #28a745; font-family: monospace;">${appointmentData.appointmentId}</span>
            </div>

            <div style="margin-bottom: 15px;">
              <strong style="color: #333;">Service:</strong>
              <span style="color: #666;">${appointmentData.department}</span>
            </div>

            <div style="margin-bottom: 15px;">
              <strong style="color: #333;">Date:</strong>
              <span style="color: #666;">${appointmentData.date}</span>
            </div>

            <div style="margin-bottom: 15px;">
              <strong style="color: #333;">Time:</strong>
              <span style="color: #666;">${appointmentData.time || "TBD"}</span>
            </div>

            <div style="margin-bottom: 0;">
              <strong style="color: #333;">Status:</strong>
              <span style="color: #ffc107; font-weight: bold;">PENDING APPROVAL</span>
            </div>
          </div>

          <div style="background: #d1ecf1; border: 1px solid #bee5eb; padding: 20px; border-radius: 8px; margin: 30px 0;">
            <h4 style="color: #0c5460; margin: 0 0 10px 0; font-size: 16px;">📞 Next Steps:</h4>
            <ol style="color: #0c5460; margin: 0; padding-left: 20px; line-height: 1.6;">
              <li>Our medical team will review your appointment within 24 hours</li>
              <li>You'll receive a confirmation call/email once approved</li>
              <li>We'll send a reminder 24 hours before your appointment</li>
              <li>Arrive 15 minutes early with required documents</li>
            </ol>
          </div>

          <div style="text-align: center; margin: 40px 0;">
            <p style="color: #666; margin: 0 0 20px 0; line-height: 1.6;">
              For any questions or to reschedule, please contact us.
            </p>

            <div style="margin: 30px 0;">
              <a href="tel:07086986677" style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 0 10px; display: inline-block;">📞 Call Us</a>
              <a href="https://wa.me/2347086986677" style="background: #25d366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 0 10px; display: inline-block;">💬 WhatsApp</a>
            </div>
          </div>

          <div style="border-top: 1px solid #e0e0e0; padding-top: 30px; margin-top: 40px; text-align: center;">
            <p style="color: #999; font-size: 14px; margin: 0;">
              Rovina Medical Diagnostic Services<br>
              Roving House, 3 Mobil Road, Ile Epo Bus Stop<br>
              Satellite Town, Lagos, Nigeria<br>
              Phone: 070 8698 6677 | 080 3359 0577
            </p>
          </div>
        </div>
      </div>
    `;
  },

  appointmentStatusUpdate: (appointmentData) => {
    const statusLabel =
      appointmentData.status === "approved" ? "approved" : "rejected";
    const headerColor =
      appointmentData.status === "approved" ? "#28a745" : "#dc3545";
    const message =
      appointmentData.status === "approved"
        ? "Your appointment has been approved. Please arrive 15 minutes before your scheduled time."
        : "Your appointment could not be scheduled at the requested time. Please contact us to reschedule or confirm available alternatives.";

    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, ${headerColor} 0%, #f8d7da 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">📩 Appointment ${statusLabel.toUpperCase()}</h1>
        </div>

        <div style="background: white; padding: 40px 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="width: 80px; height: 80px; background: ${headerColor}; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <span style="font-size: 36px;">${appointmentData.status === "approved" ? "✅" : "❌"}</span>
            </div>
          </div>

          <h2 style="color: #333; margin: 0 0 20px 0; text-align: center;">Hello ${appointmentData.firstName}!</h2>

          <p style="color: #666; line-height: 1.6; margin: 0 0 30px 0; text-align: center;">
            ${message}
          </p>

          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin: 30px 0; border-left: 4px solid ${headerColor};">
            <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">Appointment Details:</h3>

            <div style="margin-bottom: 15px;">
              <strong style="color: #333;">Appointment ID:</strong>
              <span style="color: ${headerColor}; font-family: monospace;">${appointmentData.appointmentId}</span>
            </div>

            <div style="margin-bottom: 15px;">
              <strong style="color: #333;">Service:</strong>
              <span style="color: #666;">${appointmentData.department}</span>
            </div>

            <div style="margin-bottom: 15px;">
              <strong style="color: #333;">Date:</strong>
              <span style="color: #666;">${appointmentData.date}</span>
            </div>

            <div style="margin-bottom: 15px;">
              <strong style="color: #333;">Time:</strong>
              <span style="color: #666;">${appointmentData.time || "TBD"}</span>
            </div>

            <div style="margin-bottom: 0;">
              <strong style="color: #333;">Status:</strong>
              <span style="color: ${headerColor}; font-weight: bold;">${statusLabel.toUpperCase()}</span>
            </div>
          </div>

          <div style="text-align: center; margin: 40px 0;">
            <p style="color: #666; margin: 0 0 20px 0; line-height: 1.6;">
              If you have questions, need to reschedule, or want to confirm your appointment details, please contact us right away.
            </p>
            <div style="margin: 30px 0;">
              <a href="tel:07086986677" style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 0 10px; display: inline-block;">📞 Call Us</a>
              <a href="https://wa.me/23470886677" style="background: #25d366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 0 10px; display: inline-block;">💬 WhatsApp</a>
            </div>
          </div>

          <div style="border-top: 1px solid #e0e0e0; padding-top: 30px; margin-top: 40px; text-align: center;">
            <p style="color: #999; font-size: 14px; margin: 0;">
              Rovina Medical Diagnostic Services<br>
              Roving House, 3 Mobil Road, Ile Epo Bus Stop<br>
              Satellite Town, Lagos, Nigeria<br>
              Phone: 070 8698 6677 | 080 3359 0577
            </p>
          </div>
        </div>
      </div>
    `;
  },
};

module.exports = emailTemplates;
