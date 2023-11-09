'use client';
import React, { useState, useEffect, useRef } from 'react';

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null)
	const [jsonData, setJsonData] = useState(null);
	const [query, setQuery] = useState("");

	function toggleDropdown() {
		setShowDropdown(!showDropdown);
		// console.log("test");
	}

	function convertToUrl(venueName) {
		let retVal = venueName.replaceAll(" ","-");
		retVal = retVal.toLowerCase();
		retVal = "/parks/" + retVal + "/index.html";
		return retVal;
	}
	console.log(import.meta.env.VITE_API_BASEURL);

	useEffect(() => {
		fetch(import.meta.env.VITE_API_BASEURL + "/api/venues/getAllVenues")
			.then(response => response.json())
			.then(data => setJsonData(data))
			.catch(error => console.error('Error fetching data:', error));
		function handleClickOutside(event) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		}
		if (isOpen) {
			document.addEventListener('click', handleClickOutside);
		}
		return () => {
			document.removeEventListener('click', handleClickOutside);
		}
	}, [isOpen]);


	return (
		<nav className='flex font-syne font-bold sticky top-0 z-20 mb-4 w-full block gap-4 bg-zinc-50 rounded-b-lg drop-shadow items-center'>
			<div className='inline-block p-4 font-youngSerif bg-cyan-300 text-xl'><a href='/'>Sharpe's Hit List</a></div>
			<div className='inline-block p-4'><a href='/'>Home Page</a></div>
			<div className='inline-block p-4'><a href='#'>Games</a></div>
			<div className='inline-block relative rounded-md align-middle' ref={dropdownRef}>
				<input type='text' className='p-4 w-48 text-slate-950 bg-zinc-50' placeholder='Park Reviews' onClick={() => setIsOpen(!isOpen)} onChange={event => setQuery(event.target.value)}></input>
				<div className={`${isOpen ? `block` : 'invisible'} absolute bg-zinc-200 w-auto max-h-48 border border-gray-400 rounded-b-md overflow-scroll`}>
		{jsonData ? (
			<div>
			{
				jsonData.filter(venue => {
					if (query === "") {
						return venue;
					}
					else if (venue.curName.toLowerCase().includes(query.toLowerCase())) {
						return venue;
					}
				}).map((item, index) => (
					<a className='block p-2 hover:bg-zinc-600' href={convertToUrl(item.curName)}>
					{item.curName}
					</a>
				))}
			</div>
		) : (
			<p>Loading data...</p>
		)}
				</div>
			</div>
		</nav>
	);
}
