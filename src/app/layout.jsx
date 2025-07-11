import { Open_Sans } from 'next/font/google';
import './globals.css';
import Nav from './ui/Nav';
import Footer from './ui/Footer';
import { LanguageProvider } from './context/LanguageContext';
import { Analytics } from '@vercel/analytics/next';



import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-open-sans', display: 'swap' }); 
export const metadata = {
	title: 'Indiana AID',
	description: 'Providing Advocacy, Resources, and Direct Aid',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${openSans.variable} antialiased min-h-[100vh] flex flex-col`}>
			<LanguageProvider>
				<Nav />
				<main className="flex-grow">{children}</main>
				<Footer />
			</LanguageProvider>
			<Analytics />
			</body>
		</html>
	);
}
