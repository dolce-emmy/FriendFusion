import nodemailer from "nodemailer";

// Generate a random password reset token
export const generateResetToken = () => {
    const length = 20;
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";
    for (let i = 0; i < length; i++) {
        token += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }
    return token;
};

// Example implementation using Nodemailer for sending emails
export const sendPasswordResetEmail = (email, token) => {
    // Configure the email transport
    const transporter = nodemailer.createTransport({
        service: "gmail",

        auth: {
            user: `${process.env.EMAIL}`,
            pass: `${process.env.PASSWORD}`,
        },
    });

    // Compose the email message
    const mailOptions = {
        from: `${process.env.EMAIL}`,
        to: email,
        subject: "Password Reset",
        text: `Please click the following link to reset your password: ${token}`,
        html: `<p>Please click the following link to reset your password: <a href="http://localhost:5173/reset-password?token=${token}">${token}</a></p>`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};
