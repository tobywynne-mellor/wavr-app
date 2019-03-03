// import preact
import { h, render, Component } from 'preact';
// import style sheet
import style from './style';
import { isBoolean } from 'util';

export default class Loader extends Component {

	constructor(props){
		super(props);
	}
    
	render() {
		return (
		<div>
			<svg viewBox="0 0 250 500" style = {style.svg}>
				<text x="87" y="50" style = {style.text}>Loading...</text>
				{this.state.path !== "undefined" ? <path d = {this.state.path} id="waveLoader" style = {style.path}></path>:null}
			</svg>
		</div>);
	}
}