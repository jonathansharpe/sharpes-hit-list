"use client";
import React, { useState, useEffect } from 'react';

export default function MultiSelectDropdown({ fieldName, options, selectedValues, onSelectionChange, teamsArr }) {

	const [selectedOptions, setSelectedOptions] = useState(selectedValues);
	const handleChange = (option) => {
		const isSelected = selectedValues.includes(option);

		const updatedSelectedValues = isSelected
			? selectedValues.filter((selected) => selected !== option)
			: [...selectedValues, option];

		onSelectionChange(fieldName, updatedSelectedValues);
	};

	useEffect(() => {
		setSelectedOptions(selectedValues)
	}, [selectedValues]);

	if (fieldName == "year" || fieldName == "month" || fieldName == "day" || fieldName == "homeTeamRuns" || fieldName == "roadTeamRuns") {
		options.sort(function(a,b){return a - b});
	}
	else {
		options.sort();
	}

	function renderOptions(curFieldName, curOption) {
		if (curFieldName == 'homeTeam' || curFieldName == 'roadTeam') {
			const curIndex = teamsArr.findIndex(obj => obj['abbreviation'] === curOption);
			const curFullName = teamsArr[curIndex].fullName;
			return (
				curFullName
			)
		}
		else {
			return (
				curOption
			)
		}
	}

	// console.log(teamsArr);
	return (
		<label className="p-2 cursor-pointer hover:bg-blue-100 transition-all rounded-md">
		<input type="checkbox" className="hidden peer" />
		{`Filter ${fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase();})}`}

		<div className="p-1 left-0 absolute w-full h-48 overflow-scroll bg-zinc-50 border cursor-pointer border-2 drop-shadow-lg rounded-md transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto">
		<ul>
			{options.map((option, _i) => {
				return (
					<li key={option}>
						<label className="flex whitespace-nowrap cursor-pointer px-2 py-1 transition-colors hover:bg-blue-100 [&:has(input:checked)]:bg-blue-200 rounded-md">
							<input
							type="checkbox"
							value={option}
							className="cursor-pointer hidden"
							checked={selectedOptions.includes(option)}
							onChange={() => handleChange(option)}
							/>
							<span className="ml-1">
								{renderOptions(fieldName, option)}
							</span>
						</label>
					</li>
				);
			})}
		</ul>
		</div>
		</label>
	);
}
