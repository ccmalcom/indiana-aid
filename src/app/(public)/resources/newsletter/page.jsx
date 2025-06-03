'use server';


import NewsletterSubscription from './NewsletterSubscription';
import NewsletterGrid from './NewsletterGrid';

export default async function Newsletter() {

	

	return (
		<div className="w-[80vw] h-full flex flex-col justify-center items-center px-4 md:px-12 my-12 mx-auto">

			<NewsletterSubscription />
			<NewsletterGrid />
		</div>
	);
}
