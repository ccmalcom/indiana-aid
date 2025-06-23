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
                    {/* <h2 className="text-xl font-semibold mb-2">{category}</h2> */}
                    <ul className="list-disc pl-5 space-y-1">
                        {items.map((item, index) => (
                            <li key={index} className="text-gray-700">
                                {item}
                            </li>
                        ))}
                    </ul>
                </details>
                </div>
            ))}
        </div>
    );
}