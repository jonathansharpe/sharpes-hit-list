'use client';
import React from 'react';

export default function ImageHeader({imageLink, headerText}) {
	return (
		<div className='relative h-72 overflow-hidden rounded-md w-full bg-center bg-cover'>
			<img src={imageLink} alt='image not found' className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'/>
			<div className='absolute p-4 left-0 bottom-0 text-black bg-zinc-50 rounded-tr-md font-bold text-6xl font-youngSerif'>
				{headerText}
			</div>
		</div>
	)
}
