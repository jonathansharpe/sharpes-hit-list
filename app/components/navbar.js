'use client';
import React from 'react';
import { useState } from 'react';

export default function Navbar() {
	const [showDropdown, setShowDropdown] = useState(true);

	function toggleDropdown() {
		setShowDropdown(!showDropdown);
		// console.log("test");
	}

	return (
		<div class='flex justify-center'>
		<nav class='m-4 w-3/4 block gap-4 outline rounded'>
			<div class='inline p-4'><a href='#'>Home Page</a></div>
			<div class='inline p-4'><a href='#'>Games</a></div>
		<button class='inline p-4' onClick={toggleDropdown}>Dropdown</button>
		{showDropdown && ( 
			<div>
				<ul class='dropdown-menu z-50 min-w-max items-centerlist-none bg-clip-padding'>
					<li><a class='dropdown-item block' href='#'>park 1</a></li>
					<li><a class='dropdown-item block' href='#'>park 2</a></li>
					<li><a class='dropdown-item block' href='#'>park 3</a></li>
				</ul>
			</div>
		)}
		</nav>
		</div>
	)
}
