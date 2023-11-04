'use client';
import React from 'react';

export default function MainTextDiv({children}) {
	return (
		<div className='w-10/12 bg-zinc-50 block rounded-lg p-4 mb-4'>
			{children}
		</div>
	)
}
