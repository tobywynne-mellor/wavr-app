// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import { isBoolean } from 'util';

export default class swellBoxes extends Component {

	constructor(props) {
		super(props);
		this.printSecondaryMessage = this.printSecondaryMessage.bind(this);
	}

	printSecondaryMessage(){
		var text = "";
		if (this.props.swell.secondary.height[this.props.index] != null) {
			text = <p>SECONDARY<br/>{this.props.swell.secondary.height[this.props.index]}ft every {this.props.swell.secondary.period[this.props.index]}s</p>;
		} else {
			text = <p>SECONDARY<br/>No data</p>;
		}
		return text;
	}

	render() {
		return (
			<div>
				<div class = { style.box1 }>
					<p>PRIMARY<br/>{this.props.swell.primary.height[this.props.index]}ft every {this.props.swell.primary.period[this.props.index]}s</p>
				</div>
				<div class = { style.box2 }>
					{ this.printSecondaryMessage() }
				</div>


			</div>
		);
	}
}
