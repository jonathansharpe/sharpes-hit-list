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
		<div class='flex justify-center'>
		<nav class='m-4 w-3/4 block gap-4 outline rounded'>
			<div class='inline-block p-4'><a href='#'>Home Page</a></div>
			<div class='inline-block p-4'><a href='#'>Games</a></div>
		<div class='inline-block p-4' onClick={toggleDropdown}>
		<button>Dropdown</button>
			<div class={`${showDropdown ? `block` : 'invisible'} absolute`}>
				<a class='block py-2' href='#'>park 1</a>
				<a class='block py-2' href='#'>park 1</a>
				<a class='block py-2' href='#'>park 1</a>
			</div>
		</div>
		</nav>
		</div>
	)
}
