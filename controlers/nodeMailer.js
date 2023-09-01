const nodemailer = require('nodemailer')
const nodemailers = async (gmail,link) => {
    const htmlBuild = `
    <h1>Reset Password</h1>
    <a href="${link}">Click Here To Reset Password</a>
    `
    const transporter = nodemailer.createTransport({
        pool: true,
        host:'smtp.gmail.com',
        port:465,
        secure:true,
        auth:{
            type:'login',
            user:process.env.LOGINGM,
            pass:process.env.PASSGM,
            clientId: process.env.CLIENTIDGM,
            clientSecret: process.env.CLIENTSECRETGM,
            refreshToken: process.env.ClientRefresh,
        },tls: {
          rejectUnauthorized: false,
        }
    })
    const info  = await transporter.sendMail({
        from :`JobsList <${process.env.LOGINGM}>`,
        to:gmail,
        subject:'Password Reset',
        html:htmlBuild
    })
    console.log('sent',info.messageId)
    console.log(info.accepted)
    console.log(info.rejected)
}
module.exports = nodemailers



















// Test Nodemailer

// const nodemailer = require('nodemailer');
// const { google } = require('googleapis');
// const SendMail = () => {
// // Set up OAuth2 client
// const oAuth2Client = new google.auth.OAuth2(
//     process.env.ClientIdGm,
//     process.env.ClientSecretGm,
//     process.env.ClientRedirect
//   );
  
//   // Set the access token
//   oAuth2Client.setCredentials({
//     access_token: process.env.ClientAcessToken,
//   });
  
//   // Create the transporter using OAuth2 authentication
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       type: 'OAuth2',
//       user: process.env.LOGINGM,
//       pass:process.env.PASSGM,
//       clientId: process.env.ClientIdGm,
//       clientSecret: process.env.ClientSecretGm,
//       refreshToken: process.env.ClientRefresh,
//       accessToken: oAuth2Client.getAccessToken(),
//     },
//   });
  
//   // Compose the email
//   const mailOptions = {
//     from: `JobsList <${process.env.LOGINGM}>`,
//     to: 'giorgiiremadze98@gmail.com',
//     subject: 'Reset Password',
//     text: 'This is a test email',
//   };
  
//   // Send the email
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Error sending email:', error);
//     } else {
//       console.log('Email sent:', info.response);
//     }
//   });
// }

// module.exports = SendMail




