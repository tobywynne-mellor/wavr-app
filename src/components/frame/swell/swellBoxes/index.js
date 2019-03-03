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
				<p>Primary Height: {this.props.swell.primary.height[this.props.index]} period: {this.props.swell.primary.period[this.props.index]} direction: {this.props.swell.primary.direction[this.props.index]}</p>
				<p>Secondary Height: {this.props.swell.secondary.height[this.props.index]} period: {this.props.swell.secondary.period[this.props.index]} direction: {this.props.swell.secondary.direction[this.props.index]}</p>
			</div>
		);
	}
}