'use client';
import React, { useState, useEffect, useRef } from 'react';

export default function Navbar() {
	const [isOpenmlb, setIsOpenmlb] = useState(false);
	const [isOpenst, setIsOpenst] = useState(false);
	const dropdownRefmlb = useRef(null)
	const dropdownRefst = useRef(null)
	const [jsonData, setJsonData] = useState(null);
	const [query, setQuery] = useState("");

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
		function handleClickOutsidemlb(event) {
			if (dropdownRefmlb.current && !dropdownRefmlb.current.contains(event.target)) {
				setIsOpenmlb(false);
			}
		}
		function handleClickOutsidest(event) {
			if (dropdownRefst.current && !dropdownRefst.current.contains(event.target)) {
				setIsOpenst(false);
			}
		}
		if (isOpenmlb) {
			document.addEventListener('click', handleClickOutsidemlb);
		}
		if (isOpenst) {
			document.addEventListener('click', handleClickOutsidest);
		}
		return () => {
			document.removeEventListener('click', handleClickOutsidemlb);
			document.removeEventListener('click', handleClickOutsidest);
		}
	}, [isOpenmlb, isOpenst]);


	return (
		<nav className='flex font-syne font-bold sticky top-0 z-20 mb-4 w-full block gap-4 bg-zinc-50 rounded-b-lg drop-shadow items-center'>
			<div className='inline-block p-4 font-youngSerif bg-cyan-300 text-xl'><a href='/'>Sharpe's Hit List</a></div>
			<div className='inline-block p-4'><a href='#'>Games</a></div>
			<div className='inline-block relative rounded-md align-middle' ref={dropdownRefmlb}>
				<input type='text' className='p-4 w-48 text-slate-950 bg-zinc-50' placeholder='MLB Park Reviews' onClick={() => setIsOpenmlb(!isOpenmlb)} onChange={event => setQuery(event.target.value)}></input>
				<div className={`${isOpenmlb ? `block` : 'invisible'} absolute bg-zinc-200 w-auto max-h-48 border border-gray-400 rounded-b-md overflow-scroll`}>
		{jsonData ? (
			<div>
			{
				jsonData.filter(venue => {
					if (!venue.springTraining) {
						if (query === "") {
							return venue;
						}
						else if (venue.curName.toLowerCase().includes(query.toLowerCase())) {
							return venue;
						}
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
			<div className='inline-block relative rounded-md align-middle' ref={dropdownRefst}>
				<input type='text' className='p-4 w-64 text-slate-950 bg-zinc-50' placeholder='Spring Training Park Reviews' onClick={() => setIsOpenst(!isOpenst)} onChange={event => setQuery(event.target.value)}></input>
				<div className={`${isOpenst ? `block` : 'invisible'} absolute bg-zinc-200 w-auto max-h-48 border border-gray-400 rounded-b-md overflow-scroll`}>
		{jsonData ? (
			<div>
			{
				jsonData.filter(venue => {
					if (venue.springTraining) {
						if (query === "") {
							return venue;
						}
						else if (venue.curName.toLowerCase().includes(query.toLowerCase())) {
							return venue;
						}
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
