'use client';

import { useState } from 'react';
import Link from 'next/link';

const CollapsibleItem = ({ title, content }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	const isList = Array.isArray(content);
	const isObject = typeof content === 'object' && !isList;

	return (
		<div className="mb-2 border-b pb-2">
			<button
				onClick={toggle}
				className={`text-lg font-semibold w-full text-left flex justify-start items-center hover:underline decoration-yellow hover:decoration-2`}
			>
				<span>{isOpen ? '-' : '+'}</span>
				<span className='px-4'>{title}</span>
			</button>
			{isOpen && (
				<div className="pl-4 mt-2">
					{isList && (
						<ul className="list-disc pl-4">
							{content.map((item, idx) => (
								<li key={idx}>
									{item.url ? (
										<Link href={item.url} className="text-blue hover:underline decoration-yellow hover:decoration-2" target="_blank" rel="noopener noreferrer">
											{item.text}
										</Link>
									) : (
										item.text || item
									)}
								</li>
							))}
						</ul>
					)}
					{isObject &&
						Object.entries(content).map(([subTitle, subContent]) => (
							<CollapsibleItem
								key={subTitle}
								title={subTitle}
								content={subContent}
							/>
						))}
				</div>
			)}
		</div>
	);
};

export default function CollapsibleList({ resourceHeadings }) {
	return (
		<div>
			{Object.entries(resourceHeadings).map(([title, content]) => (
				<CollapsibleItem key={title} title={title} content={content} />
			))}
		</div>
	);
}