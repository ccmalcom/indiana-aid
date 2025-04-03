import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    const { name, email, message } = await request.json();

    try {
        const data = await resend.emails.send({
            from: 'Your Nonprofit <contact@yournonprofit.org>', // Custom verified email
            to: ['your-personal-email@example.com'],
            subject: 'New Contact Form Submission',
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