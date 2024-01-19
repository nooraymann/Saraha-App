import nodemailer from 'nodemailer'
import { emailHtml } from './template.js';
import jwt from 'jsonwebtoken';
export async function sendEmail(name,email){
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
          user: "nour.ayman.essmat@gmail.com",
          pass: "jbhlkvdhjbwkxgos",
        },
      });
     
      const token=jwt.sign({email},"emailverification");
      const info = await transporter.sendMail({
        from: '"Nour Ayman" <nour.ayman.essmat@gmail.com>', // sender address
        to: email, // list of receivers
        subject: `${name}, verify your email `, // Subject line
        html: emailHtml(token,name), // html body
      });
    
      console.log("Message sent: %s", info.messageId);    
}