import { h, render, Component } from 'preact';
import style from './style.less';
import { isBoolean } from 'util';
import Stars from '../stars';
import SurfRating from '../surfrating';

export default class Slider extends Component {

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	//This sends the selected time to the rest of the app
	handleChange(event) {
		this.props.changeTime(event.target.value);
	}

	render() {
		return (
			<div class={style.slider}>
				<div class={style.info}>
					<div class={style.timeText}>SELECTED TIME<br />{this.props.timeText}</div>
					<SurfRating rating={this.props.rating} id="stars" />
				</div>
				<input type="range" min="0" max="21" value={this.props.time} step="3" id="slider" oninput={this.handleChange} />
			</div>
		);
	}
}
