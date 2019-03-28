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
				{this.props.text.toUpperCase()}
			</div>
		);
	}
}
