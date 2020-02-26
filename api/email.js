const mailer = require('nodemailer')
require('dotenv').config({path: __dirname + '/.env'})

module.exports = app => {

    const transporter = mailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    const send = (req,res)=>{
        const user = {...req.body}
        if(req.params.id) user.id= req.params.id
        
        const mailOptions = {
            from: 'soniaaaguiar12@gmail.com',
            to: "maayconaguiar11@hotmail.com",
            subject: 'E-mail enviado usando Node!',
            text: 'Bem fácil, não? ;)'
        };

        transporter.sendMail(mailOptions, function(err, info){
            if (err) {
                return res.status(400).send("falhou")
            } else {
                return res.status(200).send("foi")
            }
        });
    };

    return {send}
}

 