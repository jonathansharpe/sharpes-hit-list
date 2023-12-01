'use client';
import React, { useState, useEffect} from 'react';
import Paragraph from './paragraph.jsx';
import SectionHeader from './park-review-header.jsx';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

export default function GetReview({venueName}) {
	const [review, setReview] = useState('');

	useEffect(() => {
		const fetchReview = async () => {
			try {
				const response = await fetch('./review.md');
				const data = await response.text();
				setReview(data);
				// const response = await import('./review.md');
				// setReview(response.default);
			}
			catch (error) {
				console.error(`Error fetching Markdown content; ${error}`);
			}
		};

		fetchReview();
	}, []);

	const components = {
		h1: ({ children }) => <SectionHeader>{children}</SectionHeader>,
		p: ({ children }) => <Paragraph>{children}</Paragraph>,
	};

	return (
		<div>
		<ReactMarkdown components={components} rehypePlugins={[rehypeRaw]}>{review}</ReactMarkdown>
		</div>
	);
}
