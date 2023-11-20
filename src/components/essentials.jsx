'use client';
import React from 'react';
import PrimaryDiv from './primary-div.jsx';
import Navbar from './navbar.jsx';
import BackgroundDiv from './background-div.jsx'

export default function Essentials({children}) {
	return (
		<BackgroundDiv>
		<Navbar />
		{children}
		</BackgroundDiv>
	)
}
