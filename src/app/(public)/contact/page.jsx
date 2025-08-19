
import { getContactPageContent } from '@/app/actions';
import ContactFormClient from './ContactFormClient';

export default async function Contact() {
	const content = await getContactPageContent();
	const { contactHeader, formData } = content;
	// console.log('Contact Page Content:', JSON.stringify(content, null, 2));

	return (
		<div className="viewport min-h-[66vh]  py-8">
			<div className='w-[80%] lg:w-[50%] m-auto mt-4 text-center text-blue'>
				<h1 className="text-3xl font-bold text-center my-4">{contactHeader.value_json.headerText}</h1>
				<p>
					{contactHeader.value_json.headerDescription}
				</p>
				<br />
				<p className='text-sm italic'>
					{contactHeader.value_json.headerDisclaimer}{' '}
					<a
						href="https://www.immigrantjustice.org/"
						target="_blank"
						rel="noopener noreferrer"
						className="text-blue-700 underline ">
						National Immigrant Justice Center
						</a>
					</p>
			</div>
			{/* <ContactFormClient formData={formData}  /> */}
			<div className="contact-form flex flex-col items-center justify-center bg-blue text-white p-4 md:px-16 w-[90%] md:w-[70%] lg:w-[55%] xl:w-[40%] mx-auto mt-4 rounded-lg shadow-lg min-h-[50vh]">
				{/* contact form is down for maintenance, please email indianaaidcontact@gmail.com */}
				<p className="text-center">
					Contact form is down for maintenance, please email{' '}
					<a
						href="mailto:indianaaidcontact@gmail.com"
						className="text-yellow underline">
						indianaaidcontact@gmail.com
					</a>
				</p>
			</div>
		</div>
	);
}
