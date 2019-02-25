// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import { isBoolean } from 'util';
import Title from '../title';

export default class Tide extends Component {

	constructor(props){
		super(props);
	}

	render() {
		return (
            <div class = { style.tide }>
                <Title text="Tide"/>
				<svg class={style.svg} viewBox="0 0 350 90">
					<path d="M"></path>
					<rect x="10" y="20" width="330" height="50" class={style.backdrop}></rect>
				</svg>
            </div>
		);
	}




}
