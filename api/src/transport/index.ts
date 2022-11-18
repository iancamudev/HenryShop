const nodemailer = require("nodemailer");

export const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: 'soyhenryshop@gmail.com',
    pass: process.env.GMAIL_PASSWORD
  }
});

export const mailOptionsRegister = (mail: string, token: string) => {
  return {
    from: `Remitente`,
    to: mail,
    subject: `Confirma tu email`,
    text: `Confirma tu email:  ${process.env.CLIENT_URL}/users/confirmation/${token}`
  }
}   