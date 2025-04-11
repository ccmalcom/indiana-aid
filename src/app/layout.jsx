import localFont from 'next/font/local';
import './globals.css';
import Nav from './ui/Nav';
import Footer from './ui/Footer';

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

const franklinGothic = localFont({
	src: './fonts/FranklinGothic.ttf',
	subsets: ['latin'],
	variable: '--font-franklin-gothic',
	display: 'swap',
});

//light, book, medium, semibold, bold, black
const sentinel = localFont({
	src: [
		{
			path: './fonts/Sentinel/Sentinel-Light.otf',
			weight: '400',
			style: 'normal',
		},
		{
			path: './fonts/Sentinel/Sentinel-LightItal.otf',
			weight: '400',
			style: 'italic',
		},
		{
			path: './fonts/Sentinel/Sentinel-Book.otf',
			weight: '500',
			style: 'normal',
		},
		{
			path: './fonts/Sentinel/Sentinel-BookItal.otf',
			weight: '500',
			style: 'italic',
		},
		{
			path: './fonts/Sentinel/Sentinel-Medium.otf',
			weight: '600',
			style: 'normal',
		},
		{
			path: './fonts/Sentinel/Sentinel-MediumItal.otf',
			weight: '600',
			style: 'italic',
		},
		{
			path: './fonts/Sentinel/Sentinel-Semibold.otf',
			weight: '700',
			style: 'normal',
		},
		{
			path: './fonts/Sentinel/Sentinel-SemiboldItal.otf',
			weight: '700',
			style: 'italic',
		},
		{
			path: './fonts/Sentinel/Sentinel-Bold.otf',
			weight: '800',
			style: 'normal',
		},
		{
			path: './fonts/Sentinel/Sentinel-BoldItal.otf',
			weight: '800',
			style: 'italic',
		},
		{
			path: './fonts/Sentinel/Sentinel-Black.otf',
			weight: '900',
			style: 'normal',
		},
		{
			path: './fonts/Sentinel/Sentinel-BlackItal.otf',
			weight: '900',
			style: 'italic',
		},
	],
	subsets: ['latin'],
	variable: '--font-sentinel',
	display: 'swap',
});

export const metadata = {
	title: 'Indiana AID',
	description: 'Providing Advocacy, Resources, and Direct Aid',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${franklinGothic.variable} ${sentinel.variable} antialiased min-h-[100vh] flex flex-col`}>
				<Nav />
				<main className="flex-grow">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
