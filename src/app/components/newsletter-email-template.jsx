//subject: Indiana AID newsletter #<issue> & resources / Boletín informativo #<issue> y recursos
//greeting: Dear friends, [**español abajo**]
// <message>/<mensaje>: main newsletter content
// donation request


export default function NewsletterEmailTemplate({ message, mensaje }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
           
            <p className="text-gray-700 mb-4">
                Dear friends, [**español abajo**]
            </p>
            <div className="text-gray-700 mb-4">
                {message}
            </div>
            <p className="text-gray-700 mb-4">
                With the reality of what we are facing, I want to ask you to sincerely consider supporting our work by providing an ongoing or one-time donation via the QR code below or donation link: <a href="https://www.indianaaid.org/donate" className="text-blue-500 underline">https://www.indianaaid.org/donate</a>, or you can also send a check to Indiana AID via Shalom Mennonite Church (more details on the last page of the newsletter) - the check can be made out to Shalom Mennonite Church with "Indiana AID" in the memo line, and mailed to: 
            </p>
            <p className="text-gray-700 mb-4">
                Shalom Mennonite Church<br />
                6100 E 32nd Street, Indianapolis, IN 46226.
            </p>
            <p className="text-gray-700 mb-4">
                100% of donations go directly to supporting the individuals detained by ICE. We are sincerely grateful for your help.
            </p>
            <p className="text-gray-700 mb-4">
                Donate/Donar:<br />
                <img src="qr.png" alt="Indiana AID Donation QR Code" style={{ width: '150px', height: '150px' }} />
            </p>
            <p className="text-gray-700 mb-4">
                Along with our newsletter, we encourage you to check out our website: <a href="https://www.indianaaid.org/" className="text-blue-500 underline">https://www.indianaaid.org/</a>, and follow us on social media. We also have a variety of different opportunities available if you're interested in volunteering.<br />
                Facebook: <a href="https://www.facebook.com/IndianaAID1" className="text-blue-500 underline">https://www.facebook.com/IndianaAID1</a><br />
                Instagram: @IndianaAID - or - <a href="https://www.instagram.com/indianaaid/" className="text-blue-500 underline">https://www.instagram.com/indianaaid/</a>
            </p>
            <hr className="my-6" />
            <p className="text-gray-700 mb-4">
                Queridos amigos,
            </p>
            <div className="text-gray-700">
                {mensaje}
            </div>
            <p className="text-gray-700 mb-4">
                Con la realidad de lo que enfrentamos en los meses y años que vienen, quiero pedirle que considere sinceramente apoyarnos financieramente por donación, sea regularmente o de una vez, a través del código de QR que sale arriba o por el enlace de donación: <a href="https://www.indianaaid.org/donate" className="text-blue-500 underline">https://www.indianaaid.org/donate</a>. También se puede donar por enviar un cheque a la iglesia de Shalom Mennonite con “Indiana AID” escrito en la línea de memorando del cheque (más detalles en la última página del boletín):
            </p>
            <p className="text-gray-700 mb-4">
                Shalom Mennonite Church<br />
                6100 E 32nd Street, Indianapolis, IN 46226
            </p>
            <p className="text-gray-700 mb-4">
                100% de las donaciones van directamente a apoyar a personas detenidas por ICE. Estamos agradecidos sinceramente por su apoyo.
            </p>
            <p className="text-gray-700 mb-4">
                Junto con el boletín, les animamos a visitar nuestra página web: <a href="https://www.indianaaid.org/" className="text-blue-500 underline">https://www.indianaaid.org/</a> y seguirnos por las redes sociales. También tenemos varias oportunidades si usted quiere involucrarse como voluntario.<br />
                Facebook: <a href="https://www.facebook.com/IndianaAID1" className="text-blue-500 underline">https://www.facebook.com/IndianaAID1</a><br />
                Instagram: @IndianaAID - o - <a href="https://www.instagram.com/indianaaid/" className="text-blue-500 underline">https://www.instagram.com/indianaaid/</a>
            </p>
        </div>
    );
}