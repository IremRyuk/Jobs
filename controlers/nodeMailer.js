const nodemailer = require('nodemailer')
const nodemailers = async (gmail,link) => {
    const htmlBuild = `
    <h2>JobsList: Reset Your Forgotten Password</h2>
    <h3>Click Below To Navigate Password Change Page</h3>
    <button style="width: 25vw;border: 2px solid rgb(53, 117, 226);background-color: white;border-radius: 2.4mm;padding: 10px 20px;color: black;font-size: large;">
    <a href="${link}" style="text-decoration: none; color: black;">Reset Page</a>
    </button>
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