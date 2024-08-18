import { mailtrapClient, sender } from "./mailtrap.config.js";
import { VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) =>{
    const recipient = [{email}];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Email OTP : Verify your email address',
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification",
        })
        console.log("Verification Email sent successfully.",response);
    } catch (error) {
        console.log("Error sending verification email to :", email);
        throw new Error(`Error sending verification email to : ${email}`);
    }

}

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }];
    try {
       const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Welcome aboard. We are excited to see you on our community',
            html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name),
            category: "Welcome Email",
        })
        console.log("Welcome Email sent successfully.",response);
    } catch (error) {
        console.log("Error sending welcome email :", error);
        throw new Error(`Error sending welcome email : ${error}`)
    }
}