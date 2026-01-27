import { Resend } from 'resend';
import FeedbackEmailTemplate from '@/app/components/feedback-email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    // if name is 'test', don't actually send the email
    const { message } = await request.json();
    // console.log('Received feedback message:', message);

    try {
        const data = await resend.emails.send({
            from: 'Website Contact Form <onboarding@resend.dev>', // Custom verified email
            to: 'chasecmalcom@gmail.com',
            subject: `New Feedback Form Submission`,
            reply_to: 'contactindianaaid@gmail.com',
            react: FeedbackEmailTemplate({ message }),
        });

        return Response.json({ success: true, data });
    } catch (error) {
        console.error(error);
        return Response.json({ success: false, error });
    }
}