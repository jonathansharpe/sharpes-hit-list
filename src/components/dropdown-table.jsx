import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ isOpen, setIsOpen, parks }) => {

	const numColumns = 5;
	const numParksRows = Math.ceil(parks.length / numColumns);

	const convertToUrl = (venueName) => {
		let retVal = venueName.replaceAll(" ", "-");
		retVal = retVal.toLowerCase();
		retVal = "/src/parks/" + retVal + "/index.html";
		return retVal;
	};

	const sortedParks = parks.slice().sort((a, b) => a.curName.localeCompare(b.curName));

	return (
		<div
			className={`absolute grid grid-cols-5 bg-zinc-50 rounded-b-md max-w-screen-lg transition-all duration-150 ease-out ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}`}
			style={{ transformOrigin: 'top' }}
		>
		{sortedParks.map((_curVenue, index) => {
			const curPark = sortedParks[index];
			return (
				<a
				key={index}
				className="relative z-30 text-sm p-2 hover:bg-zinc-200 rounded-md transition-all"
				href={curPark ? convertToUrl(curPark.curName) : '#'}
				>
				{curPark && curPark.curName}
				</a>
			);
		})}
		</div>
	);
}

export default Dropdown;
