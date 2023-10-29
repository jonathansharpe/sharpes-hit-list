'use client';
import React from 'react';

export default function BackgroundDiv({children}) {
	return (
		<div className='bg-zinc-200 text-slate-950 font-dmSans'>
		{children}
		</div>
	)
}
