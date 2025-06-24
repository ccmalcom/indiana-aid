// example input:
// const resourceHeadings = {
// 	'Community Resources': [
// 		'Community Resources Search in Indiana',
// 		'Community Resources Search in Indianapolis',
// 		'Child Care / Child-focused Support Services',
// 		'Household / Clothing / Child / Baby Items',
// 		'Food Assistance',
// 		'Employment',
// 		'Medical',
// 		'Legal Services',
// 		'Cultural Organizations',
// 	],
// 	'Immigration Resources': [
// 		'Know Your Rights',
// 		'Legal & Court Resources',
// 		'General Resources',
// 		'Avoid Immigration Scams',
// 		'Asylum Information',
// 		'Detention & Deportation',
// 		'Family Preparedness',
// 		'Communities / Organizations / Rapid Response',
// 		'Immigration & School',
// 	],
// 	'Support Your Community': [
// 		'Donate',
// 		'Stay Informed',
// 		'Volunteer',
// 		'Advocate',
// 	],
// };

export default async function CollapsibleList({ resourceHeadings }) {
    return (
        <div className="w-full max-w-4xl mx-auto px-4">
            {Object.entries(resourceHeadings).map(([category, items]) => (
                <div key={category} className="mb-6">
                    <details>
                    <summary className="cursor-pointer text-lg font-semibold text-blue hover:text-yellow transition-colors mb-2">
                        {category}
                    </summary>
                    <ul className="list-disc pl-5 space-y-1">
                        {/* if item */}
                        {items.map((item, index) => (
                            // if item is a string, render it as a list item
                            // if array, should be collapsable heading with items
                            typeof item === 'string' ? (
                            <li key={index} className="text-gray-700">
                                {item}
                            </li>
                            ) : (
                                <li key={index} className="text-gray-700">
                                    <details>
                                        <summary className="cursor-pointer text-blue hover:text-yellow transition-colors">
                                            {item.heading}
                                        </summary>
                                        <ul className="list-disc pl-5 space-y-1">
                                            {item.items.map((subItem, subIndex) => (
                                                <li key={subIndex} className="text-gray-700">
                                                    {subItem}
                                                </li>
                                            ))}
                                        </ul>
                                    </details>
                                </li>
                            )
                        ))}
                    </ul>
                </details>
                </div>
            ))}
        </div>
    );
}