import { Open_Sans } from 'next/font/google';
import './globals.css';
import Nav from './ui/Nav';
import Footer from './ui/Footer';
import { LanguageProvider } from './context/LanguageContext';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { getNavLabels } from '@/app/actions';
import Feedback from './ui/Feedback';
import MaintenanceBanner from './ui/MaintenanceBanner';

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

const openSans = Open_Sans({
	subsets: ['latin'],
	variable: '--font-open-sans',
	display: 'swap',
});
export const metadata = {
	title: 'Indiana AID',
	description: 'Providing Advocacy, Resources, and Direct Aid',
};

export default async function RootLayout({ children }) {
	const navLabels = await getNavLabels();
	const MaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
	return (
		<html lang="en">
			<body
				className={`${openSans.variable} antialiased min-h-[100vh] flex flex-col`}>
				<LanguageProvider>
					<Nav navLabels={navLabels} />
					{MaintenanceMode && (
						<MaintenanceBanner 
							startTime={process.env.NEXT_PUBLIC_MAINTENANCE_START}
							endTime={process.env.NEXT_PUBLIC_MAINTENANCE_END}
						/>
					)}
					{/* <Feedback /> */}
					<main className="flex-grow">{children}</main>
					<Footer />
				</LanguageProvider>
				<SpeedInsights />
				{/* Analytics should be placed at the end of the body for performance */}
				<Analytics />
			</body>
		</html>
	);
}
