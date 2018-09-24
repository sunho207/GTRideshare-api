/*
* Interface for NodeMailer - Handles Sending Emails
* Version: 1.0
* Date: 9/12/2018
*/

'use strict';
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');



////////////////////////////////////////////////////////////////////////////////
////////////////////     email sending function     ////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////// sendEmail(to, subject, message)                                    //////
////// to : reciever email as string.                                     //////
////// subject : string title for the email.                              //////
////// message : html style contents of the email.                        //////
////// email sending from gmail                                           //////
////// ID : "gtrideshare.test@gmail.com",                                 //////
////// password : "rideshare1234"                                         //////
////////////////////////////////////////////////////////////////////////////////
const message = `
      <button type="button"> Verify </button>
  `;
var subject = 'Verification required';



function sendEmail(to, subject, message){
   nodemailer.createTestAccount((err, account) => {
       var transporter = nodemailer.createTransport(smtpTransport({
           host: 'smtp.gmail.com',
           port:465,
           auth: {
               user: 'gtrideshare.test@email.com',
               pass: 'gtrideshare1234'
           }
           }));
       let mailOptions = {
           from: '"GTRideshare" <gtrideshare.test@email.com>',
           to: to,
           subject: subject,
           html: html
       };

       transporter.sendMail(mailOptions, (error, info) => {
           if (error) {
               console.log('Error', error);
           }
           else{
               console.log('Success', info);
           }
       });
   });
}
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

//MailHandler.js Interface
exports.createTransporter = createTransporter;
exports.sendMail = sendMail;
exports.createMailTemplate = createMailTemplate;
