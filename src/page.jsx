import React from 'react'
import ReactDOM from 'react-dom/client'
import Paragraph from './components/paragraph.jsx';
import ImageHeader from './components/image-header.jsx';
import PrimaryDiv from './components/primary-div.jsx';
import homeImg from './public/images/T-Mobile-Park.jpg'

export default function Page() {
	return (
		<PrimaryDiv>
			<div class='w-10/12 bg-zinc-50 block rounded-lg p-4'>
				<ImageHeader imageLink={homeImg.src} headerText={'Home Page'} />
				<h1 class='text-3xl font-bold my-4'>Website Overview</h1>
				<Paragraph>I grew up going to baseball games as a kid. We lived about an hour away from Seattle, so I would attend one Mariners game every year. As I got older, my interest in baseball increased dramatically. I started keeping track of what games I went to in 2012, and haven't stopped since</Paragraph>
				<Paragraph>However, I knew I wanted to go to more stadiums than just T-Mobile Park. I got to go to my first game outside of Seattle in 2014, when I attended a game at Wrigley Field for its 100th anniversary, and Guaranteed Rate Field (then-U.S. Cellular Field). My next trip occurred in 2016, when I visited Kansas City and Minneapolis for a game each. The subsequent trip in 2019 took me to the east coast for the first time, for a game at Fenway Park and Yankee Stadium. I toured all five California MLB parks in 2021 in the span of ten days with a friend. I made my first trip to spring training in Arizona in 2023, seeing four games in the span of just three days. My next trip will be to Texas, where I will get to double-dip in Houston, while seeing the Mariners on the road for the first time. To close out the trip, I will see a game in the newest ballpark in baseball, Globe Life Field.</Paragraph>
				<Paragraph>After my trip to the state of Texas, I will have managed to see 14 of the 30 active MLB stadiums. It's incredible to see how quickly that number has increased over the years, and I want to document my experiences and opinions for others to see. I have a list of all the games I've attended, separated by year, and some notes from each game. While I don't have pictures from every game, I will soon add a page that features the pictures I do have from the games I've attended.</Paragraph>
			</div>
		</PrimaryDiv>
	)
}
