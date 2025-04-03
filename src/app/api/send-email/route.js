import { Resend } from 'resend';


const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    // console.log('test', process.env.RESEND_API_KEY);
    const { name, email, message } = await request.json();

    try {
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev', // Custom verified email
            to: 'chasecmalcom@gmail.com',
            subject: `New Contact Form Submission - ${name}`,
            reply_to: email,
            html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
        });

        return Response.json({ success: true, data });
    } catch (error) {
        console.error(error);
        return Response.json({ success: false, error });
    }
}