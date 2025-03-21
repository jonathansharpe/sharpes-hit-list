import Essentials from './components/essentials.jsx';
import ImageHeader from './components/image-header.jsx';
import Paragraph from './components/paragraph.jsx';
import SectionHeader from './components/park-review-header.jsx';
import MainTextDiv from './components/main-text-div.jsx';
// Use a reference to the image path directly instead of importing

export default function App(){
	return (
		<Essentials>
		<MainTextDiv>
		<ImageHeader imageLink={'/images/T-Mobile Park.jpg'} headerText={'Sharpe\'s Hit List'} />
		
				<SectionHeader>Intro</SectionHeader>

				<Paragraph>
					I've been a lifelong fan of baseball. I played some little league, but I found joy in watching, listening, and especially attending baseball games. I became more interested in the league as a whole in 2012, and began logging games I attended from that point forward. This site catalogues these games, along with the stadiums I've visited and my thoughts on them.
				</Paragraph>

				<SectionHeader>Games</SectionHeader>

				<Paragraph>
					For a long time, the data began in 2012 since I didn't have the exact dates of the games I'd been to before then. However, with some help from my dad, we tracked down the other games I'd been to, and now the database is complete!
				</Paragraph>

				<Paragraph>
					Each game features a log documenting interesting things that happened, particularly things you won't find in the boxscore. However, there is still a link to the boxscore on Baseball-Reference (for regular season and eventual postseason games).
				</Paragraph>

				<SectionHeader>Park Reviews</SectionHeader>

				<Paragraph>
					I've now attended 15 Major League Baseball stadiums (14 active) and 4 Spring Training parks. Included are reviews of each park. Eventually I want to rank them all as well.
				</Paragraph>

				<SectionHeader>Other Plans</SectionHeader>

				<Paragraph>
					As mentioned, a tier list of all the parks I've been to is on my to do list. I'll also improve the UX and UI over time.
				</Paragraph>

		</MainTextDiv>
		</Essentials>
	)
}
