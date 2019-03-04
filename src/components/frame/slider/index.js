/* eslint-disable no-mixed-spaces-and-tabs */
// import preact
import { h, render, Component } from 'preact';
import style from './style.less';
import { isBoolean } from 'util';
import Stars from '../stars';
import SurfRating from '../surfrating';

export default class Slider extends Component {

	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.props.changeTime(event.target.value); //IMPORTANT: this sends the time selected to props
	}

	render() {
		return (
			<div class= { style.slider }>
				<div class={style.info}>
					<div class = {style.timeText}>TIME<br/>{this.props.timeText}</div>
					<SurfRating rating = {this.props.rating} id = "stars"/>
				</div>
        		<input type="range" min="0" max="21" value={this.props.time} step = "3" id="slider" oninput={this.handleChange}/>
   			</div>
		);
	}
}
