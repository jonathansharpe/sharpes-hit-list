'use client';
import React from 'react';

export default function SectionHeader({children}) {
	return (
		<h1 className='text-3xl font-bold my-4 font-syne'>
			{children}
		</h1>
	)
}
