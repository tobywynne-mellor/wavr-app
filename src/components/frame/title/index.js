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
<<<<<<< HEAD
		return(
		<div class={style.box}>
			<div class={style.title}>{this.props.text.toUpperCase()}</div>
				<svg class={style.tipIcon} width="20" height="20" viewBox="0 0 100 100">
			  	<ellipse cx="50" cy="50" fill="none" id="circle" rx="40" ry="40" stroke="#f3f3f3" stroke-width="10"/>
			  	<text fill="#f3f3f3" font-family="sans-serif" font-weight="bold" font-size="72" id="text" stroke="#f3f3f3" stroke-width="0" text-anchor="middle" x="50" y="74">?</text>
				</svg>
		</div>
=======
		return (
			<div class={style.title}>
				{this.props.text.toUpperCase()}
			</div>
>>>>>>> a02351434b90cc37daf0cf308f1e37e4218d38ac
		);
	}
}
