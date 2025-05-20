import localFont from 'next/font/local';
import { Inter, Urbanist, Open_Sans } from 'next/font/google';
import './globals.css';
import Nav from './ui/Nav';
import Footer from './ui/Footer';

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

//using urbanist for now
const urbanist = Urbanist({ subsets: ['latin'], variable: '--font-urbanist', display: 'swap' });

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
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
				<Nav />
				<main className="flex-grow">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
