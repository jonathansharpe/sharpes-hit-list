'use client';
import React from 'react';

export default function MainTextDiv({children}) {
	return (
		<div className='w-10/12 bg-zinc-50 mx-auto rounded-lg p-4 m-4'>
			{children}
		</div>
	)
}
