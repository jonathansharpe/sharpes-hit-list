import './index.css';
import React from 'react';
import Navbar from './components/navbar.js';
import ImageHeader from './components/image-header.js';

export default function RootLayout ({ children }) {
	return (
		<html lang="en">
			<body class='bg-zinc-200'>
				<Navbar />
				{children}
			</body>
		</html>
	)
}

export const metadata = {
	title: 'Home Page'
}

