"use client";
import React, { useState, useEffect, useMemo } from 'react';

export default function MultiSelectDropdown({ fieldName, options, selectedValues, onSelectionChange }) {

	const [selectedOptions, setSelectedOptions] = useState(selectedValues);
	const handleChange = (option) => {
		setSelectedOptions((prevSelected) => {
			const isSelected = prevSelected.includes(option);

			if (isSelected) {
				return prevSelected.filter((selected) => selected !== option);
			}
			else {
				return [...prevSelected, option];
			}
		});
	};

	useEffect(() => {
		onSelectionChange(fieldName, selectedOptions);
	}, [fieldName, selectedOptions, onSelectionChange]);

	if (fieldName == "year" || fieldName == "month" || fieldName == "day" || fieldName == "homeTeamRuns" || fieldName == "roadTeamRuns") {
		options.sort(function(a,b){return a - b});
	}
	else {
		options.sort();
	}

	// console.log(options);
	return (
		<label className="p-2 cursor-pointer hover:bg-blue-100 transition-all rounded-md">
		<input type="checkbox" className="hidden peer" />
		{`Filter ${fieldName}`}

		<div className="p-1 left-0 absolute w-full bg-zinc-50 border cursor-pointer border-2 drop-shadow-lg rounded-md transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto">
		<ul>
			{options.map((option, _i) => {
				return (
					<li key={option}>
						<label className="overflow-scroll flex whitespace-nowrap cursor-pointer px-2 py-1 transition-colors hover:bg-blue-100 [&:has(input:checked)]:bg-blue-200 rounded-md">
							<input
							type="checkbox"
							value={option}
							className="cursor-pointer hidden"
							checked={selectedOptions.includes(option)}
							onChange={() => handleChange(option)}
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
