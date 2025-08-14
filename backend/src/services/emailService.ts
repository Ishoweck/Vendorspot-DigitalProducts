import { Resend } from "resend";
import { config } from "@/config/config";
import { logger } from "@/utils/logger";

class EmailService {
  private resend: Resend | null = null;
  private isResendEnabled: boolean = false;

  constructor() {
    if (config.resendApiKey) {
      this.resend = new Resend(config.resendApiKey);
      this.isResendEnabled = true;
      logger.info("Resend email service initialized");
    } else {
      logger.warn(
        "Resend API key not provided. Email service will use fallback method."
      );
    }
  }

  async sendEmail(options: {
    to: string | string[];
    subject: string;
    html?: string;
    text?: string;
    from?: string;
  }) {
    try {
      if (this.isResendEnabled && this.resend) {
        const result = await this.resend.emails.send({
          from: options.from || config.emailFrom,
          to: Array.isArray(options.to) ? options.to : [options.to],
          subject: options.subject,
          html: options.html,
          text: options.text,
        });

        logger.info("Email sent successfully via Resend", {
          to: options.to,
          subject: options.subject,
          id: result.data?.id,
        });

        return { success: true, data: result.data };
      } else {
        // Fallback: Log email (for development/testing)
        logger.info("Email would be sent (Resend not configured)", {
          to: options.to,
          subject: options.subject,
          from: options.from || config.emailFrom,
          html: options.html?.substring(0, 100) + "...",
        });

        return { success: true, data: { id: "fallback-" + Date.now() } };
      }
    } catch (error) {
      logger.error("Failed to send email", {
        error: error instanceof Error ? error.message : "Unknown error",
        to: options.to,
        subject: options.subject,
      });

      throw new Error("Failed to send email");
    }
  }

  // Welcome email template
  async sendWelcomeEmail(to: string, firstName: string) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #D7195B;">Welcome to Vendorspot!</h1>
        <p>Hi ${firstName},</p>
        <p>Welcome to Nigeria's most trusted digital marketplace! We're excited to have you join our community.</p>
        <p>You can now:</p>
        <ul>
          <li>Browse thousands of digital products</li>
          <li>Purchase from verified vendors</li>
          <li>Enjoy instant digital delivery</li>
          <li>Shop with confidence and security</li>
        </ul>
        <p>If you have any questions, feel free to contact our support team.</p>
        <p>Happy shopping!</p>
        <p>The Vendorspot Team</p>
      </div>
    `;

    return this.sendEmail({
      to,
      subject: "Welcome to Vendorspot Digital Marketplace!",
      html,
    });
  }

  // Email verification template
  async sendVerificationEmail(
    to: string,
    firstName: string,
    verificationToken: string
  ) {
    const verificationUrl = `${config.frontendUrl}/verify-email?token=${verificationToken}`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #D7195B;">Verify Your Email</h1>
        <p>Hi ${firstName},</p>
        <p>Please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" 
             style="background-color: #D7195B; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Verify Email
          </a>
        </div>
        <p>If the button doesn't work, copy and paste this link into your browser:</p>
        <p style="word-break: break-all;">${verificationUrl}</p>
        <p>This link will expire in 24 hours.</p>
        <p>If you didn't create an account with us, please ignore this email.</p>
        <p>The Vendorspot Team</p>
      </div>
    `;

    return this.sendEmail({
      to,
      subject: "Verify Your Vendorspot Account",
      html,
    });
  }

  // Password reset template
  async sendPasswordResetEmail(
    to: string,
    firstName: string,
    resetToken: string
  ) {
    const resetUrl = `${config.frontendUrl}/reset-password?token=${resetToken}`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #D7195B;">Reset Your Password</h1>
        <p>Hi ${firstName},</p>
        <p>You requested to reset your password. Click the button below to create a new password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background-color: #D7195B; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p>If the button doesn't work, copy and paste this link into your browser:</p>
        <p style="word-break: break-all;">${resetUrl}</p>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this password reset, please ignore this email.</p>
        <p>The Vendorspot Team</p>
      </div>
    `;

    return this.sendEmail({
      to,
      subject: "Reset Your Vendorspot Password",
      html,
    });
  }

  // Order confirmation template
  async sendOrderConfirmationEmail(
    to: string,
    firstName: string,
    orderDetails: any
  ) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #D7195B;">Order Confirmation</h1>
        <p>Hi ${firstName},</p>
        <p>Thank you for your purchase! Your order has been confirmed.</p>
        <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 5px;">
          <h3>Order Details:</h3>
          <p><strong>Order Number:</strong> ${orderDetails.orderNumber}</p>
          <p><strong>Total:</strong> ₦${orderDetails.total.toLocaleString()}</p>
          <p><strong>Items:</strong> ${orderDetails.itemCount} item(s)</p>
        </div>
        <p>You can download your digital products from your account dashboard.</p>
        <p>Thank you for choosing Vendorspot!</p>
        <p>The Vendorspot Team</p>
      </div>
    `;

    return this.sendEmail({
      to,
      subject: `Order Confirmation - ${orderDetails.orderNumber}`,
      html,
    });
  }
}

export const emailService = new EmailService();
