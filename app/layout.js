import './globals.css';
import React from 'react';
import { Schibsted_Grotesk } from 'next/font/google';
import Navbar from './components/navbar.js';

const schibstedGrotesk = Schibsted_Grotesk({
	subsets: ['latin'],
	display: 'swap'
})

export default function RootLayout ({ children }) {
	return (
		<html lang="en" className={schibstedGrotesk.className}>
			<body class='bg-zinc-200'>
				<Navbar />
				<div class='flex justify-center'>
					<div class='w-10/12 bg-zinc-50 block rounded-lg p-4'>
						{children}
					</div>
				</div>
			</body>
		</html>
	)
}

export const metadata = {
	title: 'Home Page'
}

