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
		<nav class='m-4 w-3/4 block gap-4 bg-zinc-50 rounded-lg'>
			<div class='inline-block p-4'><a href='#'>Home Page</a></div>
			<div class='inline-block p-4'><a href='#'>Games</a></div>
			<div class='inline-block relative rounded-md' onClick={toggleDropdown}>
				<button class='p-4'>Dropdown</button>
				<div class={`${showDropdown ? `block` : 'invisible'} absolute z-10 bg-zinc-200 w-full border border-gray-400 rounded-b-md`}>
					<a class='block p-2 hover:bg-sky-600' href='#'>park 1</a>
					<a class='block p-2 hover:bg-sky-600' href='#'>park 1</a>
					<a class='block p-2 hover:bg-sky-600' href='#'>park 1</a>
				</div>
			</div>
		</nav>
		</div>
	)
}
