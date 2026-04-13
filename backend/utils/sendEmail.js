import nodeMailer from 'nodemailer'

export const sendMail = async(option)=>{
    try {
        const fromName = process.env.SMTP_FROM_NAME || "TrendAura";

        const transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth:{
                user : process.env.SMTP_USER,
                pass : process.env.SMTP_PASSWORD,
            }
        })

        const mailOption = {
            from :`\"${fromName}\" <${process.env.SMTP_USER}>`,
            to : option.email,
            subject :option.subject,
            text: option.message,
            html: option.html
        }
        
        const info = await transporter.sendMail(mailOption);
        console.log("Email sent successfully:", info.response);
        return info;
    } catch (error) {
        console.error("Email send error:", error.message);
        throw error;
    }
}