import nodemailer from 'nodemailer';
import UserModel from '../models/user.js';

export const otp = async (user) => {
  try {
    const userData = await UserModel.findOne({ email: user.email });
    if (!userData) {
      throw new Error('User not found');
    }

    const transporter = nodemailer.createTransport({
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.STORFLEET_SMPT_MAIL,
        pass: process.env.STORFLEET_SMPT_MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.STORFLEET_MAIL,
      to: user.email,
      subject: 'OTP',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
            <h1>${userData.tampOtp}</h1>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
