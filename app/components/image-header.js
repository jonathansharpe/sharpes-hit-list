'use client';
import React from 'react';

export default function ImageHeader({imageLink, headerText}) {
	console.log(imageLink);
	return (
		<div class='relative h-64 overflow-hidden rounded-md'>
			<img src={imageLink} alt='image not found'/>
			<div class='absolute p-4 left-0 bottom-0 text-black bg-zinc-50 rounded-tr-md font-bold text-6xl'>
				{headerText}
			</div>
		</div>
	)
}
