import React, { Component } from 'react';

class PageTitle extends Component {
	componentDidMount() {
		document.title = this.props.title;
	}
	render() {
		return null;
	}
}

export default PageTitle;
