'use client';
import React from 'react';

export default function PrimaryDiv({children}) {
	return (
		<div className='flex justify-center drop-shadow'>
			{children}
		</div>
	)
}