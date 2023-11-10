import nodemailer from 'nodemailer';
import {NextApiResponse} from 'next';
import {NextResponse} from 'next/server';



export async function POST(req: Request, res: NextApiResponse) {
    const resPars = await req.json()

    const transporter = nodemailer.createTransport({
        host: 'mail.infodebit.ro',
        port: 465,
        secure: true,
        auth: {
            user: 'info@infodebit.ro',
            pass: '8VD6C~c!Q(K3'
        }
    });

    const mailOptions = {
        from: resPars.email,
        to: "info@infodebit.ro",
        subject: resPars.subject,
        html: `
          <p>You got a new message from ${resPars.name}</p>
          <p>${resPars.message}</p>
          <p>Reply to ${resPars.email}</p>
        `
    };



    try {
        const mail = await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: "Success: email was sent" })

    } catch (e: any) {
        return NextResponse.json({},{ status: 404, statusText: "ERROR DONT SENT" } as any) ;
    }


}