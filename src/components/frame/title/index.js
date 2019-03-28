// import preact
import { h, render, Component } from 'preact';
// import style sheet
import style from './style';
import { isBoolean } from 'util';

export default class Title extends Component {

	constructor(props){
		super(props);
	}

	render() {
		//returns uppercase with title style
		return (
		<div class={style.title}>
			<div class={style.titleText}>{this.props.text.toUpperCase()}</div>
			<div class={style.icon} tooltip={this.props.tooltip} tooltip-position="right">
				<svg class={style.tipIcon} width="20" height="20" viewBox="0 0 100 100">
				<ellipse cx="50" cy="50" fill="none" id="circle" rx="40" ry="40" stroke="#f3f3f3" stroke-width="10"/>
				<text fill="#f3f3f3" font-family="sans-serif" font-weight="bold" font-size="72" id="text" stroke="#f3f3f3" stroke-width="0" text-anchor="middle" x="50" y="74">?</text>
				</svg>
			</div>
		</div>
		);
	}
}
