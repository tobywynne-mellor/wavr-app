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
		return <div class={style.title}><h3>{ this.props.text }</h3></div>;
	}
}
