import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default async function Header({ heading }) {

	return (
		<div className="header grid grid-cols-4">
			<Link
				href="/admin"
				className="text-blue hover:underline col-span-1 text-left p-4">
				<FontAwesomeIcon icon={faArrowLeft} className="text-2xl" />
			</Link>
			<h1 className="text-2xl font-semibold my-4 col-span-2 text-center">{heading}</h1>
		</div>
	);
}
