import './globals.css';
import React from 'react';
import { Schibsted_Grotesk } from 'next/font/google';
import Navbar from './components/navbar.js';
import ImageHeader from './components/image-header.js';

const schibstedGrotesk = Schibsted_Grotesk({
	subsets: ['latin'],
	display: 'swap'
})

export default function RootLayout ({ children }) {
	return (
		<html lang="en" className={schibstedGrotesk.className}>
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
