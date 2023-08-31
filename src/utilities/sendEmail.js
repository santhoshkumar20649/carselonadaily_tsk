const nodemailer = require('nodemailer');

// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use your email service provider
  auth: {
    user: 'santhoshkumar20649@gmail.com',
    pass: 'pggazukhdcyzxpgo'
  }
});



function sendEmailAccountCreation(data) {
    const mailOptions = {
        from: 'santhoshkumar20649@gmail.com',
        to: data.email,
        subject: 'Account Created Successfully',
        text: `Hi ${data.name} your account created successfully <br>
                Use below login credentails: <br>
                email:${data.email}<br>
                pass:${data.password}`
                
      };


      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
}

function sendEmailForServicebooking(data) {
    const mailOptions = {
        from: 'santhoshkumar20649@gmail.com',
        to: data.email,
        subject: 'New Booking Created',
        text: `Hi, New bookong has been created for your service Center.
                Booking Details:
                Booked by: ${data.name}.
                model: ${data.model}.
                brand: ${data.brand}.
                serviceDate: ${data.serviceDate}.
                timeSlot: ${data.timeSlot}`

                
      };


      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
}
 
module.exports = { sendEmailAccountCreation,sendEmailForServicebooking}