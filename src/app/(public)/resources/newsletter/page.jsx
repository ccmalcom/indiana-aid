'use server';

import { getNewsletters } from './actions';
import NewsletterSubscription from './NewsletterSubscription';
import NewsletterGrid from './NewsletterGrid';



export default async function Newsletter({  }) {
	// const language = searchParams?.language || 'en';
	// const currentPage =  parseInt( await searchParams?.page) || 1;

	const allNewsletters = await getNewsletters();

	return (
		<div className="w-[80vw] h-full flex flex-col justify-center items-center px-4 md:px-12 my-12 mx-auto">
			<NewsletterSubscription />
			<NewsletterGrid
				initialNewsletters={allNewsletters}
			/>
		</div>
	);
}

