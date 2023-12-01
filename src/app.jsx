import Essentials from './components/essentials.jsx';
import ImageHeader from './components/image-header.jsx';
import Paragraph from './components/paragraph.jsx';
import SectionHeader from './components/park-review-header.jsx';
import MainTextDiv from './components/main-text-div.jsx';
import homeImg from './images/T-Mobile Park.jpg';

export default function App(){
	return (
		<Essentials>
		<MainTextDiv>
		<ImageHeader imageLink={homeImg} headerText={'Sharpe\'s Hit List'} />
		<SectionHeader>Introduction</SectionHeader>
		<Paragraph>Baseball has been forever present in my life in one way or another. I played little league a few years when I was a kid, but most of all, I enjoyed attending Mariners games. At some point in 2012, a switch flipped and I became far more interested in baseball than before. I began watching every game and logging every game I went to. It all started with a spreadsheet, then evolved into a website, then back to a spreadsheet, and now back to a website again.</Paragraph>
		<SectionHeader>Games</SectionHeader>
		<Paragraph>The games page is more or less a list of all the games I've attended. It may be forever incomplete, as I only began tracking the games myself in 2012, and I have only one game from before then. Hopefully I can add the rest of the games I've seen, but there's no guarantee that will happen. I've also added filters, which is a first for the history of this website; it used to just be one long list. If you've come from an earlier version of my site, you'll notice this page looks a whole lot different than it did before (and hopefully a whole lot better too).</Paragraph>
		<Paragraph>Each game has some surface level information, along with a link to the boxscore on Baseball-Reference (for regular season and postseason games), and a log for each game, including details that may not show up in the boxscore. These logs start out pretty barebones, but become increasingly detailed over time. I used to include bits in here about the parks I was visiting, but those have almost entirely been moved into the ballpark review pages. I'm working to clean up any remaining bits that have more to do with the park than the game.</Paragraph>
		<SectionHeader>Park Reviews</SectionHeader>
		<Paragraph>Having been to 14 Major League Baseball stadiums and 4 Spring Training stadiums, I wanted to leave my thoughts and experiences for others to read. Since the Spring Training parks are way smaller in both capacity and size, and are frankly far less interesting than the regular season equivalents, I've put them in a separate menu from the major league parks. If you're coming from an earlier version of my website, you'll notice that all the reviews are <i>finally</i> done, the first time I've ever been completely up to date on them.</Paragraph>
		<SectionHeader>Other Plans</SectionHeader>
		<Paragraph>I would also like to rank all the ballparks I've been to. I have a list in my head and have made notes here an there about how one park is better or worse than another, but eventually I will compile them onto a page. I will also likely change the format of my ballpark reviews, since I feel like they don't give as much information on how my opinion was formed. Lastly, I will work on maintaining the website and improving it, as it's much easier to work with than before. Thanks for reading and I hope you enjoy your time here 🙂</Paragraph>
		</MainTextDiv>
		</Essentials>
	)
}
