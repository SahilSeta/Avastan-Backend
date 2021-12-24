const nodemailer = require('nodemailer');
const moment = require('moment')

const {Mail_UserName,Mail_Password} = require('../config')

var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: 'Yes',
    auth: {
      user: Mail_UserName,
      pass: Mail_Password
    }
});

const mailsender = (mailOptions) =>{
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
}

const successMail = ({show,result}) =>{

var mailOptions = {
    from: 'mailsender.mohsin@gmail.com',
    to: result.userEmail,
    subject: `Your Ticket for - ${show.name} is Booked..!!!`,
    text: `Dear ${result.userName} 

            Thank You for your using our Ticket booking Service 

            Here is your booking Details 

            Show Name : ${show.name}
            Show Time : ${moment(show.showTime).format('MMMM Do YYYY, h:mm:ss a')}
            Seats: ${result.bookedSeats}
            Vanue: ${show.venue}
            Total Price:${result.bookingAmount}
        
    Thanks & Regards
    Ticket Booking    `
};

mailsender(mailOptions)
}

const cancelMail = ({show,updatedPost}) =>{
    var mailOptions = {
        from: 'mailsender.mohsin@gmail.com',
        to: updatedPost.userEmail,
        subject: `Your Ticket for - ${show.name} is Cancelled..!!!`,
        text: `Dear ${updatedPost.userName} 
    
                Thank You for your using our Ticket booking Service 
    
                Your Ticket of Bleow show is cancelled.. 
    
                Show Name : ${show.name}
                Show Time : ${moment(show.showTime).format('MMMM Do YYYY, h:mm:ss a')}
                Seats: ${updatedPost.bookedSeats}
                Vanue: ${show.venue}
                Total Price:${updatedPost.bookingAmount}
            
        Thanks & Regards
        Ticket Booking    `
    };
    mailsender(mailOptions)
}

module.exports = {successMail,cancelMail}