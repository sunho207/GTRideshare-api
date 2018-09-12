/*
* Interface for NodeMailer - Handles Sending Emails
* Version: 1.0
* Date: 9/12/2018
*/

'use strict';
const nodemailer = require('nodemailer');

/*
* Method that creates a transporter instance to handle email
* param: connection (object) - host details for mail smtp
* connection object should include the following:
* host: mail server host
* port: mail server port
* configurations: any configuration flags that are required
* param: credentials (object) - authentication details for sender email 
* authentication object should include the following: 
* username: email username
* password: email password
* return: transporter - handle to node mailer object
*/
var createTransporter = function(connection, credentials) {
    var transporter = null; //node mailer transporter object
    return transporter; //returns transporter instance
}

/*
* Method that handles the sending of emails
* param: transporter (object) - node mailer transporter object
* param: sender (string: email) - sender email
* param: recipient (string: email) - recipient email
* param: tag (string) - tag to identify the type of email (defined in application logic)
* param: subject (string) - subject of the email
* param: mailContent (object) - email content object
* email content object should include the following:
* text: static email text
* html: email html definition
* attachments: array of attachment objects
* attachment- attachment object should include the following:
* filename: (string) e.g. 'image.png'
* content: (base64)  
* e.g. 
* Buffer.from
* (
*     'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
*         '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
*         'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
*     'base64'
* )
* cid: (string) a unique string e.g. 'note@example.com' 
* return: responseObject - provides feedback on mail status
*/
var sendMail = function(transporter, sender, recipient, tag, subject, mailContent) {
    var responseObject =
    {
        isSucess: false,
        timeStamp: new Date().valueOf(),
        tag: tag,
        recipient: recipient
    }
    return responseObject;
}

/*
* Method that handles mail content mapping
* param: plainText (string) - basic String content for email
* param: mailBody (array of strings) - strings parameters to html mail template
* param: mailHtml (string: html) - string with markers that allows for insertion of text content into html mail template
* e.g. <html> <p> [\\**@TagMarker\\**] <\p> <\html>
* param: attachments is an array of attachment objects
* attachment - attachment object should include the following:
* filename: (string) e.g. 'image.png'
* content: (base64)  
* e.g. 
* Buffer.from
* (
*     'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
*         '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
*         'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
*     'base64'
* )
* cid: (string) a unique string e.g. 'note@example.com' 
* return: mailContent - formatted htmlContent 
*/
var createMailTemplate = function(plainText, mailBody, mailHtml, attachments) {
    var mailContent = 
    {
        text: plainText,
        html: null, //TODO: generated htmlContent
        attachments: attachments
    }
    return mailContent;
}

//MailHandler.js Interface
exports.createTransporter = createTransporter;
exports.sendMail = sendMail;
exports.createMailTemplate = createMailTemplate;