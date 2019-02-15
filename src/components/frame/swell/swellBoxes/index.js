// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import { isBoolean } from 'util';

export default class swellBoxes extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<p>Swellboxes</p>
				<p>Height: {this.props.swell.primary.height[0]}</p>
				<p>period: {this.props.swell.primary.period[0]}</p>
				<p>direction: {this.props.swell.primary.direction[0]}</p>
			</div>
		);
	}
}