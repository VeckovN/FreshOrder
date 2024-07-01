import nodemailer from 'nodemailer';
import dotenv from 'dotenv'

dotenv.config();

export const sendEmail = (sendObj) =>{
    const {email, text} = sendObj;

    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.EMAIL_USERNAME,
            pass:process.env.EMAIL_PASSWORD
        }
    })

    const message = {
        from:process.env.EMAIL_USERNAME,
        to:email,
        subject:'Order from OrderApp',
        text:text
    }

    transporter.sendMail(message, (err,info)=>{
        if(err){
            console.error(err);
        }
        else{
            console.log(info);
        }
    })
}

export const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USERNAME,
        pass:process.env.EMAIL_PASSWORD
    }
})

