import React, { useState } from 'react';

export default function MultiSelectDropdown({ formFieldName, options }) {
	const [selectedOptions, setSelectedOptions] = useState([]);
	console.log(options);
	return (
		<label className="relative">
		<input type="checkbox" className="hidden peer" />
		{"Show the dropdown"}

		<div className="absolute bg-white border transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto">
		<ul>
			{options.map((option, _i) => {
				return (
					<li key={option}>
						<label className="flex whitespace-nowrap cursor-pointer px-2 py-1 transition-colors hover:bg-blue-100 [&:has(input:checked)]:bg-blue-200">
							<input
							type="checkbox"
							name={formFieldName}
							value={option}
							className="cursor-pointer"
							/>
							<span className="ml-1">{option}</span>
						</label>
					</li>
				);
			})}
		</ul>
		</div>
		</label>
	);
}
