// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import { isBoolean } from 'util';

export default class swellBoxes extends Component {

	constructor(props) {
		super(props);
		this.printSecondaryMessage = this.printSecondaryMessage.bind(this);
		this.isHovering = this.isHovering.bind(this);
		this.isNotHovering = this.isNotHovering.bind(this);
	}

	isHovering(){
		this.props.onHover(true);
	}

	isNotHovering(){
		this.props.onHover(false);
	}

	printSecondaryMessage(){
		let text = "";
		if (this.props.swell.secondary.height[this.props.index] !== null) {
			text = <div>SECONDARY<br/>{this.props.swell.secondary.height[this.props.index]}ft every {this.props.swell.secondary.period[this.props.index]}s</div>;
		} else {
			text = <div>SECONDARY<br/>No data</div>;
		}
		return text;
	}

	render() {
		return (
			<div class={style.cont}>
				<div class = { style.box1 }>
					<div>PRIMARY<br/>{this.props.swell.primary.height[this.props.index]}ft every {this.props.swell.primary.period[this.props.index]}s</div>
				</div>
				<div class = { style.box2 } onMouseOver={ this.isHovering } onMouseOut={ this.isNotHovering }>
					{ this.printSecondaryMessage() }
				</div>


			</div>
		);
	}
}
