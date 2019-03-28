// import preact
import { h, render, Component } from 'preact';
import style from './style';
import { isBoolean } from 'util';
import Stars from '../stars';
import { faDivide } from '@fortawesome/free-solid-svg-icons';

export default class SurfRating extends Component {

	constructor(props){
		super(props);
	}

	render() {
		return (
			<div class={style.cont} tooltip="Testing the tooltip" tooltip-position="left">
				SURF RATING
				<Stars stars = {this.props.rating}/>
			</div>
		);
	}
}
