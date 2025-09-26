import { Resend } from "resend";
import NewsletterEmailTemplate from "@/app/components/newsletter-email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    const { issue, message, mensaje } = await req.json();
    // todo: add attachments (spanish pdf, english pdf from newsletters storage bucket)
    try {
        const email = await resend.emails.send({
            from: "Indiana AID <info@indianaaid.org>",
            to: "chasecmalcom@gmail.com",
            subject: `Indiana AID Newsletter #${issue} & Resources / Boletín Informativo #${issue} y Recursos`,
            react: NewsletterEmailTemplate({ issue, message, mensaje }),
        });

        return new Response(JSON.stringify(email), { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return new Response('Error sending email', { status: 500 });
    }
}
