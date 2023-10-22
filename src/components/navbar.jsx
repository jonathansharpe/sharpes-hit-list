'use client';
import React from 'react';
import { useState } from 'react';

export default function Navbar() {
	const [showDropdown, setShowDropdown] = useState(false);

	function toggleDropdown() {
		setShowDropdown(!showDropdown);
		// console.log("test");
	}

	return (
		<div className='flex justify-center'>
		<nav className='z-20 m-4 w-3/4 block gap-4 bg-zinc-50 rounded-lg drop-shadow'>
			<div className='inline-block p-4'><a href='#'>Home Page</a></div>
			<div className='inline-block p-4'><a href='#'>Games</a></div>
			<div className='inline-block relative rounded-md' onClick={toggleDropdown}>
				<button className='p-4'>Dropdown</button>
				<div className={`${showDropdown ? `block` : 'invisible'} absolute z-10 bg-zinc-200 w-full border border-gray-400 rounded-b-md`}>
					<a className='block p-2 hover:bg-sky-600' href='#'>park 1</a>
					<a className='block p-2 hover:bg-sky-600' href='#'>park 1</a>
					<a className='block p-2 hover:bg-sky-600' href='#'>park 1</a>
				</div>
			</div>
		</nav>
		</div>
	)
}
