import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ isOpen, setIsOpen, parks }) => {

	const numColumns = 5;
	const numParksRows = Math.ceil(parks.length / numColumns);

	const convertToUrl = (venueName) => {
		let retVal = venueName.replaceAll(" ","-");
		retVal = retVal.toLowerCase();
		retVal = "/parks/" + retVal + "/index.html";
		return retVal;
	};

	const sortedParks = parks.slice().sort((a, b) => a.curName.localeCompare(b.curName));

	return (
		<div className={`absolute mt-4 bg-zinc-50 rounded-md mx-auto max-w-screen-xl left-0 right-0 w-full transform transition-all duration-150 ease-in-out ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}`} style={{ transformOrigin: 'top' }}>
		{Array.from({ length: numParksRows }).map((_, rowIndex) => (
			<div className="flex" key={rowIndex}>
			{Array.from({ length: numColumns }).map((_, colIndex) => {
				const index = rowIndex * numColumns + colIndex;
				const curPark = sortedParks[index];
				return (
					<a key={colIndex} className="text-sm p-2 flex-1 hover:bg-zinc-200 rounded-md transition-all" href={curPark ? convertToUrl(curPark.curName) : '#'}>
					{curPark && curPark.curName}
					</a>
				);
			})}
			</div>
		))}
		</div>
	);
}

export default Dropdown;
