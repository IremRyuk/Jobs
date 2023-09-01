const nodemailer = require('nodemailer')
const nodemailers = async (gmail,link) => {
    const htmlBuild = `
    <h1>Reset Password</h1>
    <a href="${link}">Click Here To Reset Password</a>
    `
    const transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:465,
        secure:true,
        auth:{
            user:process.env.LOGINGM,
            pass:process.env.PASSGM,
            clientId:process.env.ClientIdGm,
            clientSecret:process.env.ClientSecretGm
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