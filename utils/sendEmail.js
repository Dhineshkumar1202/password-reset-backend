const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (options) => {
  
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: "dhineshtrendy12@gmail.com",
      pass: "mlxlwpvowckviaue", 
    },
  });

  
  const mailOptions = {
    from: '"Dhinesh" dhineshtrendy12@gmail.com', 
    to: options.to,
    subject: options.subject,
    text: options.text, 
  };


  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
