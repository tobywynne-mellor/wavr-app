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

		let data = this.getData();

		return (
            <div class = { style.tide }>
                <Title text="Tide"/>
				<div class={style.svgWrapper}>
					
				</div>
            </div>
		);
	}

	getData() {
		return "M200 50 V200 100 H0 100 V0 50 Z";
	}



}
