import nodemailer from 'nodemailer';
import dotenv from 'dotenv'

dotenv.config();

// export const sendEmail = (sendObj) =>{
//     const {email, text} = sendObj;
//     //https://stackoverflow.com/questions/45478293/username-and-password-not-accepted-when-using-nodemailer

//     // let transporter = nodemailer.createTransport({
//     //     host:"smtp.gmail.com",
//     //     port: 465,
//     //     secure:true,
//     //     auth:{
//     //         user: 'orderapp2023@gmail.com',
//     //         pass: 'OrderNowApp2023',
//     //     }
//     //     // },
//     //     // from: process.env.EMAIL_USERNAME
//     // })

//     //After Update(2022-05-02)

//     let transporter = nodemailer.createTransport({
//         service:'gmail',
//         auth:{
//             user:process.env.EMAIL_USERNAME,
//             pass:process.env.EMAIL_PASSWORD
//         }
//     })

//     const message = {
//         from:process.env.EMAIL_USERNAME,
//         to:email,
//         subject:'Order from OrderApp',
//         text:text
//     }

//     transporter.sendMail(message, (err,info)=>{
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log(info);
//         }
//     })
// }

export const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USERNAME,
        pass:process.env.EMAIL_PASSWORD
    }
})

