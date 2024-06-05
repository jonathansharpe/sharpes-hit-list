import React, { useState, useEffect } from 'react';
import Essentials from './../components/essentials.jsx';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Paragraph from './../components/paragraph.jsx';
import SectionHeader from './../components/park-review-header.jsx';
import MainTextDiv from './../components/main-text-div.jsx';
import PageTitle from './../components/page-title.jsx';
import MultiSelectDropdown from './../components/multi-select-dropdown.jsx';

export default function App(){

	return (
		<>
		<PageTitle title={"Resume"} />
		<SectionHeader>Jonathan Sharpe</SectionHeader>
		<h2>Full-Stack Developer</h2>
		</>
	)
}
