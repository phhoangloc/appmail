

import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer';
export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.gmail_user,
        pass: process.env.gmail_pass
    },
});

const replymail = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    // res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    console.log(req.method)
    if (req.method === 'POST') {
        const result: {
            success: boolean,
            message?: string,
            result?: string,
        } = { success: false }

        const mainOptions = {
            from: 'KASIKA-SAUNA<no-reply>',
            to: req.body.email,
            subject: "【受付完了】お問い合わせいただきありがとうございます。| KASIKA 京都北山",
            html: req.body.content
        };
        await transporter.sendMail(mainOptions)
            .catch((error: Error) => {
                result.success = false
                result.message = error.message
                res.send(result)
                throw error.message
            }).then(() => {
                result.success = true
                result.message = "メールを送信された"
                res.json(result)
            })
    } else {
        res.json({
            success: false,
            message: "your request method is not supply"
        })
    }
}

export default replymail