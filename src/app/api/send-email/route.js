import { Resend } from 'resend';
import ContactEmailTemplate from '@/app/components/contact-email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    const { name, email, message } = await request.json();


    try {
        const data = await resend.emails.send({
            from: 'Website Contact Form <noreply@indianaaid.org>', // Custom verified email
            to: 'indianaaidcontact@gmail.com',
            // to: 'cmalcom2016@gmail.com',
            subject: `New Contact Form Submission - ${name}`,
            reply_to: email,
            react: ContactEmailTemplate({ name, email, message }),
        });

        return Response.json({ success: true, data });
    } catch (error) {
        console.error(error);
        return Response.json({ success: false, data });
    }
}